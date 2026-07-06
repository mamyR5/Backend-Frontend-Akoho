import {sql,getConnection} from '../database/db.js';
import EtatAtody from '../model/EtatAtody.js';

class EtatAtodyDAO{

    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM EtatAtody");
        const etats = [];
        for(const row of result.recordset){
            const etat = new EtatAtody(row.id,row.libelle);
            etats.push(etat);
        }

        return etats;
    }

    async create(etatAtody){
        const pool = await getConnection();
        const result = await pool.request()
        .input('libelle',sql.VarChar(50),etatAtody.libelle)
        .query('INSERT INTO EtatAtody(libelle) VALUES (@libelle)');
        return result.rowsAffected;
    }

    async edit(etatAtody){
        const pool = await getConnection();
        const result = await pool.request()
        .input('libelle',sql.VarChar(50),etatAtody.libelle)
        .input('idEtatAtody',sql.Int,etatAtody.id)
        .query('UPDATE EtatAtody SET libelle=@libelle WHERE id = @idEtatAtody');
        return result.rowsAffected;
    }

    static async getById(id){
        const pool = await getConnection();
        const result = await pool.request()
        .input('id',sql.Int,id)
        .query('SELECT * FROM EtatAtody WHERE id=@id');

        const row = result.recordset[0];
        const etat = new EtatAtody(row.id,row.libelle);

        return {
            EtatAtody:etat,
        }
    }


}

export default EtatAtodyDAO;