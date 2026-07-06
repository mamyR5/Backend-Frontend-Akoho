import RecensementAtody from '../model/RecensementAtody.js'; 
import {sql,getConnection} from '../database/db.js';
import RaceDAO from './RaceDAO.js';
import LotDAO from './LotDAO.js';

class RecensementAtodyDAO{
    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM RecensementAtody");
        const recs = [];
            
        for(const row of result.recordset){
            const rec = new RecensementAtody(row.id,row.DateRecensement,row.NbAtody,row.idLot);
            recs.push(rec);
        }

        return recs;
    }

    async create(recensement){
        const pool = await getConnection();
        const result = await pool.request()
        .input('DateRecensement',sql.Date,recensement.dateRecensement)
        .input('NbAtody',sql.Int,recensement.nbAtody)
        .input('idLot',sql.Int,recensement.idLot)
        .query('INSERT INTO RecensementAtody(DateRecensement,NbAtody,idLot) VALUES (@DateRecensement,@NbAtody,@idLot)');

        return result.rowsAffected;
    }

    static async getNbAtodyRecense(idLot,dateFiltre){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .input('DateFiltre',sql.Date,dateFiltre)
        .query('SELECT COALESCE(SUM(NbAtody),0) AS NbAtodyRecense FROM RecensementAtody WHERE idLot=@idLot AND DateRecensement<=@DateFiltre');

        const row = result.recordset[0];
        console.log('NbAtodyRecense ato anaty base ',row.NbAtodyRecense);
        return {
            NbAtodyRecenseTotal:row.NbAtodyRecense,
            DateFiltre:dateFiltre
        };
    }

    static async getNbAtodyRecenseTotal(idLot){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .query('SELECT COALESCE(SUM(NbAtody),0) AS AtodyRecenseTotal FROM RecensementAtody WHERE idLot = @idLot');

        const row = result.recordset[0];

        return {
            NbAtodyRecenseTotal:row.AtodyRecenseTotal
        }
    }

    static async getDateEclosion(idLot,dateRecensement){
        const pool = await getConnection();
        const lot = await LotDAO.getById(idLot);
        const { TempsIncubation } = await RaceDAO.getTempsIncubationByIdRace(lot.idRace);
        const result = await pool.request()
        .input('TempsIncubation',sql.Int,TempsIncubation)
        .input('DateRecensement',sql.Date,dateRecensement)
        .query('SELECT DATEADD(DAY,@TempsIncubation,@DateRecensement) AS DateEclosion');

        const row = result.recordset[0];

        return {
            DateEclosion: row.DateEclosion,
            DateRecensementAtody:dateRecensement
        };
    }
}

export default RecensementAtodyDAO;