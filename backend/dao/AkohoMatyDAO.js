import {sql,getConnection} from '../database/db.js';
import AkohoMaty from '../model/AkohoMaty.js';
import DetailLotDAO from './DetailLotDAO.js';
import RaceDAO from './RaceDAO.js';

class AkohoMatyDAO{
    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM AkohoMaty');
        const deces = [];
        for(const row of result.recordset){
            const maty = new AkohoMaty(row.id,row.DateNahafatesana,row.NbMaty,row.idLot);
            deces.push(maty);
        }
        return deces;
    }

    async create(akohoMaty){
        const pool = await getConnection();
        const result = await pool.request()
        .input('DateNahafatesana',sql.Date,akohoMaty.dateNahafatesana)
        .input('NbMaty',sql.Int,akohoMaty.nbMaty)
        .input('idLot',sql.Int,akohoMaty.idLot)
        .query('INSERT INTO AkohoMaty(DateNahafatesana,NbMaty,idLot) VALUES (@DateNahafatesana,@NbMaty,@idLot)');
        return result.rowsAffected;
    }

    async getNbAkohoMaty(idLot,dateFiltre){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .input('DateFiltre',sql.Date,dateFiltre)
        .query('SELECT COALESCE(SUM(NbMaty),0) AS NbAkohoMatyTotal,@DateFiltre AS DateFiltre FROM AkohoMaty am LEFT JOIN Lot l ON am.idLot=l.id WHERE am.idLot=@idLot AND DateNahafatesana<=@DateFiltre');
        const row = result.recordset[0];
        return {
            NbAkohoMatyTotal:row.NbAkohoMatyTotal,
            DateFiltre:dateFiltre
        };
    }

    static async getNbAkohoMatyByIdGenre(idGenre,idLot,dateFiltre){
        const akohoMatyDAO = new AkohoMatyDAO();
        const detailLot = await DetailLotDAO.getByIdLot(idLot);
        const { NbAkohoMatyTotal } = await akohoMatyDAO.getNbAkohoMaty(idLot,dateFiltre);
        const { PourcentageGenreMaty } = await RaceDAO.getPourcentageAkohoMatyByIdGenre(idGenre);
        let akohoMatyByIdGenre = Math.round((NbAkohoMatyTotal * PourcentageGenreMaty)/ 100);
        
        if(detailLot.idGenre===idGenre && detailLot.PourcentageLot==100){
            console.log('100% ny genre ',idGenre,' sady mitovy ny ao anaty base ny idGenre');
            akohoMatyByIdGenre = NbAkohoMatyTotal;
        }else if(detailLot.idGenre!=idGenre){
            console.log('tsy mitovy ny idGenre ato anaty base sy ny ao anaty fonction idGenre ato anaty fonction = ',idGenre);
            let pourcentage = 100 - detailLot.PourcentageLot;
            akohoMatyByIdGenre = Math.round((NbAkohoMatyTotal*pourcentage)/100);            
        }
        
        return {
            NbAkohoMatyTotal:akohoMatyByIdGenre,
            idGenre:idGenre
        };
    }
}

export default AkohoMatyDAO;