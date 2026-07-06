import Lot from '../model/Lot.js'; 
import {sql,getConnection} from '../database/db.js';

class LotDAO{
    static async getAll(){
        const pool = await getConnection();
        const result =await pool.request().query("SELECT * FROM Lot");
        const lots = [];
        for(const row of result.recordset){
            const lot =  new Lot(row.id,row.DateCreation,row.AgeSemaine,row.NbAkoho,row.idRace);
            lots.push(lot);
        }
        return lots;
    }

    static async getById(id){
        const pool = await getConnection();
        const result = await pool.request().input('id',sql.Int,id).query("SELECT * FROM Lot WHERE id = @id");
        if (result.recordset.length === 0) {
            return null;
        }
        const row = result.recordset[0];
        return new Lot(row.id, row.DateCreation, row.AgeSemaine, row.NbAkoho, row.idRace);
    }

    async create(lot){
        const pool = await getConnection();
        console.log("lot.id ",lot.idRace);
        const result = await pool.request()
            .input('DateCreation', sql.Date, lot.dateCreation)
            .input('AgeSemaine', sql.Int, lot.ageSemaine)
            .input('NbAkoho', sql.Int, lot.nbAkoho)
            .input('idRace', sql.Int, lot.idRace)
            .query("INSERT INTO Lot (DateCreation, AgeSemaine, NbAkoho, idRace) VALUES (@DateCreation, @AgeSemaine, @NbAkoho, @idRace);SELECT SCOPE_IDENTITY() AS id;");

        return { 
            rowAffected:result.rowsAffected,
            idLotInsert:result.recordset[0].id
        };    
    }

    async getAgeSemaineByDateFiltre(idLot,datefiltre){
        const pool = await getConnection();

        const result = await pool.request()
        .input('DateFiltre',sql.Date,datefiltre)
        .input('id',sql.Int,idLot)
        .query('SELECT id AS idLot, DateCreation AS DateDebut, @DateFiltre AS DateFiltre, AgeSemaine AS AgeSemaineDebut, DATEDIFF(DAY,DateCreation,@DateFiltre) AS DifferenceJour , AgeSemaine+DATEDIFF(DAY,DateCreation,@DateFiltre)/7 AS AgeSemaineDateFiltre FROM Lot WHERE id=@id'
        );

        const row = result.recordset[0];
        console.log('Age semaine filtre ',row.AgeSemaineDateFiltre)

        return {
            idLot:row.idLot,
            DateCreationLot:row.DateDebut,
            DateFiltre:row.DateFiltre,
            AgeSemaineDebut:row.AgeSemaineDebut,
            DifferenceJour:row.DifferenceJour,
            AgeSemaineFiltre:row.AgeSemaineDateFiltre
        };
    }

    async getNbAkohoInitial(idLot){
        const pool = await getConnection();
        const result  = await pool.request()
        .input('id',sql.Int,idLot)
        .query('SELECT NbAkoho FROM Lot WHERE id = @id');
        return result.recordset[0].NbAkoho;
    }

    /*async getNbAkohoTotal(idLot,dateFiltre){
        /*const pool = await getConnection();
        const result = await pool.request()
        .input('idLot',sql.Int,idLot)
        .input('DateFiltre',sql.Date,dateFiltre)
        .query('SELECT l.NbAkoho-COALESCE(SUM(NbMaty),0) AS NbAkohoTotal, @DateFiltre AS DateFiltre FROM AkohoMaty am LEFT JOIN Lot l ON am.idLot=l.id WHERE am.idLot=@idLot AND DateNahafatesana<=@DateFiltre GROUP BY l.NbAkoho');

        


        //const row = result.recordset[0];
        let valiny = {
            NbAkohoTotal:0,
            DateFiltre:dateFiltre
        };

        if(result.recordset.length==0){
            valiny.NbAkohoTotal=0;
        }else{
            valiny.NbAkohoTotal = result.recordset[0].NbAkohoTotal;
        }

        console.log(' nbAkohoTotal',valiny,result.recordset.length);

        return valiny;

    }*/

    async getidRace(idLot){
        const pool = await getConnection();
        const result = await pool.request()
        .input('id',sql.Int,idLot)
        .query("SELECT idRace FROM Lot WHERE id = @id");


        return {
            idRace:result.recordset[0].idRace
        };
    }
}
export default LotDAO;