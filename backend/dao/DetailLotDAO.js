import { sql , getConnection } from "../database/db.js";
import DetailLot from "../model/DetailLot.js";
import AkohoMatyDAO from "./AkohoMatyDAO.js";
import LotDAO from "./LotDAO.js";
import RaceDAO from "./RaceDAO.js";

class DetailLotDAO{

    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM DetailLot");
        const details = [];
        for(const row of result.recordset){
            const detail = new DetailLot(row.id,row.idLot,row.NbAkoho,row.idGenre);
            details.push(detail);
        }
        return details;
    }

    async create(detailLot){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,detailLot.idLot)
        .input('NbAkoho',sql.Int,detailLot.nbAkoho)
        .input('PourcentageLot',sql.Decimal(15,2),detailLot.pourcentageLot)
        .input('idGenre',sql.Int,detailLot.idGenre)
        .query("INSERT INTO DetailLot(idLot,NbAkoho,PourcentageLot,idGenre) VALUES (@idLot,@NbAkoho,@PourcentageLot,@idGenre)");

        const row = result.rowsAffected;
        return row;
    }

    async getById(id){
        const pool = await getConnection();
        const result = await pool.request()
        .input('id',sql.Int,id)
        .query("SELECT * FROM DetailLot WHERE id = @id");
        const row = result.recordset[0];
        const detail = new DetailLot(row.id,row.idLot,row.NbAkoho,row.pourcentageLot,row.idGenre);
        return detail;
    }

    static async getByIdLot(idLot){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .query('SELECT PourcentageLot,idGenre FROM DetailLot WHERE idLot = @idLot');
        const row = result.recordset[0];
        return {
            PourcentageLot:row.PourcentageLot,
            idGenre:row.idGenre
        };
    }

    static async getNbAkohoByIdLotAndIdGenre(idLot,idGenre){
        const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .input('idGenre',sql.Int,idGenre)
        .query('SELECT COALESCE(NbAkoho,0) AS NbAkoho FROM DetailLot WHERE idLot = @idLot AND idGenre = @idGenre');

        
        const row = result.recordset[0];
        /*let nbAkohoAkohoMatyByIdGenre = Math.round((NbAkohoMatyTotal*PourcentageGenreMaty)/100);

        if(row.PourcentageLot===100){
            nbAkohoAkohoMatyByIdGenre = NbAkohoMatyTotal;
        }*/

        


        //console.log(idLot,' idGenre ',idGenre,row.NbAkoho);
        if(result.recordset.length>0){
            return {
                NbAkoho:row.NbAkoho,
                idGenre:idGenre,
                idLot:idLot
            };
        }else{
            const lot = await LotDAO.getById(idLot);
            const nbAkohoTotal = lot.nbAkoho;
            const nbAkoho = nbAkohoTotal - (row.NbAkoho);
            return {
                NbAkoho:nbAkoho,
                idGenre:idGenre,
                idLot:idLot
            };
        }
    }

}

export default DetailLotDAO;