
import { sql , getConnection } from '../database/db.js';
import IncubationLot from '../model/IncubationLot.js';
class IncubationLotDAO{

    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM IncubationLot');
        const incubationLots = [];
        for(const row of result.recordset){
            const incLot = new IncubationLot(row.idLotMere,row.idLotFille,row.DateChange);
            incubationLots.push(incLot);
        }

        return incubationLots;
    }

    async create(incLot)
    {
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLotMere',sql.Int,incLot.idLotMere)
        .input('idLotFille',sql.Int,incLot.idLotFille)
        .input('DateChange',sql.Date,incLot.dateChange)
        .query('INSERT INTO IncubationLot(idLotMere,idLotFille,DateChange) VALUES (@idLotMere,@idLotFille,@DateChange);');

        const row = result.rowsAffected;
        return row;
    }

    static async checkLotIfLotFille(idLot){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLotFille',sql.Int,idLot)
        .query('SELECT COUNT(idLotFille) AS NbHita FROM IncubationLot WHERE idLotFille = @idLotFille');


        const nbHita = result.recordset[0].NbHita;

        if(nbHita>0){
            return true;
        }else if(nbHita===0){
            return false;
        }
    }
}

export default IncubationLotDAO;