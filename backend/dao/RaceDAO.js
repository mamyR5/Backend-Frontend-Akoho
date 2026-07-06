import { sql, getConnection } from '../database/db.js';
import Race from '../model/Race.js';
import LotService from '../service/LotService.js';
import LotDAO from './LotDAO.js';
class RaceDAO {

    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Race");
        const races = [];

        for (const row of result.recordset) {
            const race = new Race(row.id, row.Nom, row.PUSakafo, row.PrixVente, row.PrixAtody, row.PUAchat, row.TempsIncubation, row.PondaisonMax, row.PourcentageLamokany, row.PourcentageGenre, row.idGenre);
            races.push(race);
        }

        return races;

    }


    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query("SELECT * FROM Race WHERE id = @id");
        const row = result.recordset[0];
        const race = new Race(row.id, row.Nom, row.PUSakafo, row.PrixVente, row.PrixAtody, row.PUAchat, row.TempsIncubation, row.PondaisonMax, row.PourcentageLamokany, row.PourcentageGenre, row.idGenre);
        return race;
    }

    async create(race) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Nom', sql.Char(50), race.nom)
            .input('PUSakafo', sql.Decimal(15, 2), race.puSakafo)
            .input('PrixVente', sql.Decimal(15, 2), race.prixVente)
            .input('PrixAtody', sql.Decimal(15, 2), race.prixAtody)
            .input('PUAchat', sql.Decimal(15, 2), race.puAchat)
            .input('TempsIncubation', sql.Int, race.tempsIncubation)
            .input('PondaisonMax', sql.Int, race.PondaisonMax)
            .input('PourcentageLamokany', sql.Decimal(15, 2))
            .input('PourcentageGenre', sql.Decimal(15, 2), race.pourcentageLamokany)
            .input('idGenre', sql.Int, race.idGenre)
            .query('INSERT INTO Race(Nom,PUSakafo,PrixVente,PrixAtody,PUAchat,TempsIncubation,PondaisonMax,PourcentageLamokany,PourcentageGenre,idGenre) VALUES (@Nom,@PUSakafo,@PrixVente,@PUAchat,@TempsIncubation,@PondaisonMax,@PourcentageLamokany,@PourcentageGenre,@idGenre)');
        return result.rowsAffected;
    }

    async edit(race) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Nom', sql.Char(50), race.nom)
            .input('PUSakafo', sql.Decimal(15, 2), race.puSakafo)
            .input('PrixVente', sql.Decimal(15, 2), race.prixVente)
            .input('PrixAtody', sql.Decimal(15, 2), race.prixAtody)
            .input('PUAchat', sql.Decimal(15, 2), race.puAchat)
            .input('TempsIncubation', sql.Int, race.tempsIncubation)
            .input('PondaisonMax', sql.Int, race.PondaisonMax)
            .input('PourcentageLamokany', sql.Decimal(15, 2))
            .input('PourcentageGenre', sql.Decimal(15, 2), race.pourcentageLamokany)
            .input('idGenre', sql.Int, race.idGenre)
            .input('id', sql.Int, race.id)
            .query('UPDATE Race SET Nom=@Nom,PUSakafo=@PUSakafo,PrixVente=@PrixVente,PUAchat=@PUAchat,TempsIncubation=@TempsIncubation,PondaisonMax=@PondaisonMax,PourcentageLamokany=@PourcentageLamokany,PourcentageGenre=@PourcentageGenre WHERE id = @id');
        return result.rowsAffected;
    }

    static async getPUSakafo_PrixVente_PrixAtody_PUAchat_ById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT PUSakafo,PrixVente,PrixAtody,PUAchat FROM Race WHERE id = @id');
        return {
            PUSakafoParGramme: result.recordset[0].PUSakafo,
            PrixVenteParGramme: result.recordset[0].PrixVente,
            PrixUnitaireAtody: result.recordset[0].PrixAtody,
            PrixUnitaireAchat: result.recordset[0].PUAchat
        };
    }

    static async getPourcentageLamokanyByIdRace(idRace) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, idRace)
            .query('SELECT PourcentageLamokany FROM Race WHERE id=@id');

        const row = result.recordset[0];

        return {
            PourcentageLamokany: row.PourcentageLamokany,
        };
    }

    static async getTempsIncubationByIdRace(id){
        const pool = await getConnection();
        const result = await pool.request()
        .input('id',sql.Int,id)
        .query('SELECT TempsIncubation FROM Race WHERE id = @id');

        const row  = result.recordset[0];
        return {
            TempsIncubation : row.TempsIncubation,
            idRace:id
        };
    }

    static async getPourcentageAkohoMatyByIdGenre(idGenre) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idGenre', sql.Int, idGenre)
            .query('SELECT PourcentageGenreMaty,idGenreMaty FROM Race WHERE idGenreMaty=@idGenre');

        const row = result.recordset[0];
        console.log('idGenre ', idGenre);

        if (result.recordset.length > 0) {
            return {
                PourcentageGenreMaty: row.PourcentageGenreMaty,
                idGenre: idGenre
            };
        } else {
            const pool = await getConnection();
            const result = await pool.request()
            .input('idGenre', sql.Int, RaceDAO.getOppositeGenreByIdGenre(idGenre))
            .query('SELECT PourcentageGenreMaty,idGenreMaty FROM Race WHERE idGenreMaty=@idGenre');

            const pourcentage = 100 - result.recordset[0].PourcentageGenreMaty;
            return {
                PourcentageGenreMaty: pourcentage,
                idGenre: idGenre
            };
        }
    }

    static getOppositeGenreByIdGenre(idGenre) {
        if (idGenre == 1) {
            return 2;
        } else if (idGenre == 2) {
            return 1;
        }
    }

    static async getPourcentageGenreByIdGenre(idGenre) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idGenre', sql.Int, idGenre)
            .query('SELECT PourcentageGenreFohy,idGenreFohy FROM Race WHERE idGenreFohy=@idGenre');

        const row = result.recordset[0];
        console.log("ahalavan'ny valiny ", result.recordset.length);

        if (result.recordset.length > 0) {
            console.log("pourcentage ", row.PourcentageGenreFohy);
            return {
                PourcentageGenreFohy: row.PourcentageGenreFohy,
                idGenre: idGenre
            };
        } else {
            const pool = await getConnection();
            const result = await pool.request()
                .input('idGenre', sql.Int, RaceDAO.getOppositeGenreByIdGenre(idGenre))
                .query('SELECT PourcentageGenreFohy,idGenreFohy FROM Race WHERE idGenreFohy=@idGenre');
            const pourcentage = 100 - result.recordset[0].PourcentageGenreFohy;
            return {
                PourcentageGenreFohy: pourcentage,
                idGenre: idGenre
            };
        }
    }

    static async getNbPondaisonMax(idRace) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, idRace)
            .query("SELECT PondaisonMax FROM Race WHERE id = @id");

        const valiny = result.recordset[0];

        return {
            idRace: idRace,
            NbPondaisonMax: valiny.PondaisonMax
        }
    }

    static async getAgeSemPondaison(idLot){
        const lotDAO = new LotDAO();
        const { idRace } = await lotDAO.getidRace(idLot);
        const pool = await getConnection();
        const result = await pool.request()
        .input('id',sql.Int,idRace)
        .query('SELECT AgeSemPondaison FROM Race WHERE id = @id');

        const row = result.recordset[0];

        return {
            AgeSemPondaison:row.AgeSemPondaison,
            idLot:idLot,
            idRace:idRace
        };
    }

    static async getPUVente(idRace){
        const pool = await getConnection();
        const result = await pool.request().input('idRace',sql.Int,idRace)
        .query('SELECT PUVenteVavy,PUVenteLahy FROM Race WHERE id = @idRace');

        const row = result.recordset[0];

        return {
            PUVenteVavy:row.PUVenteVavy,
            PUVenteLahy:row.PUVenteLahy
        };
    }

}

export default RaceDAO;