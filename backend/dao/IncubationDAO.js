import {sql,getConnection} from '../database/db.js';
import Incubation from '../model/Incubation.js';
import EtatAtodyDAO from './EtatAtodyDAO.js';

class IncubationDAO{
    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Incubation");
        const incubations = [];

        for(const row of result.recordset){
            const incubation = new Incubation(
                row.id,
                row.DateIncubation,
                row.Nb,
                row.idEtatAtody,
                row.idLot
            );

            incubations.push(incubation);
        }

        return incubations;
    }

    async create(incubation){
        const pool = await getConnection();
        const result = await pool.request()
        .input('DateIncubation',sql.Date,incubation.dateIncubation)
        .input('Nb',sql.Int,incubation.nb)
        .input('idEtat',sql.Int,incubation.idEtatAtody)
        .input('idLot',sql.Int,incubation.idLot)
        .query('INSERT INTO Incubation(DateIncubation,Nb,idEtatAtody,idLot) VALUES (@DateIncubation,@Nb,@idEtat,@idLot)');

        return result.rowsAffected;
    } 

    static async getNbAtodyByIdEtatAtody(idLot,idEtatAtody,dateFiltre){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .input('idEtatAtody',sql.Int,idEtatAtody)
        .input('DateFiltre',sql.Date,dateFiltre)
        .query('SELECT COALESCE(SUM(Nb),0) AS NbAtodyTotal,@DateFiltre AS DateFiltre FROM Incubation WHERE idLot=@idLot AND idEtatAtody=@idEtatAtody AND DateIncubation<=@DateFiltre');


        const row  = result.recordset[0];
        const { EtatAtody } = await EtatAtodyDAO.getById(idEtatAtody);

        return {
            NbAtodyTotal:row.NbAtodyTotal,
            EtatAtody:EtatAtody.libelle
        }
    }

    
}

export default IncubationDAO;