import Genre from "../model/Genre.js";
import { getConnection } from "../database/db.js";
class GenreDAO{

    static async getAll(){
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Genre");
        const genres = [];

        for(const row of result.recordset){
            const genre = new Genre(row.id,row.libelle);
            genres.push(genre);
        }

        return genres;
    }
}

export default GenreDAO;