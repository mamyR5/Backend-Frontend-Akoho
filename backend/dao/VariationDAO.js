import Variation from "../model/Variation.js";
import { sql, getConnection } from '../database/db.js';
import RaceDAO from "./RaceDAO.js";

class VariationDAO {
    static async getAll() {
        const pool = await getConnection();

        const result = await pool.request().query('SELECT * FROM Variation');

        const variations = [];

        for (const row of result.recordset) {
            const variation = new Variation(row.id, row.AgeSemaine, row.VariationPoids, row.idRace, row.SakafoParSem);
            variations.push(variation);
        }

        return variations;
    }

    async create(variation) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('AgeSemaine', sql.Int, variation.ageSemaine)
            .input('VariationPoids', sql.Decimal(15, 2), variation.variationPoids)
            .input('idRace', sql.Int, variation.idRace)
            .input('SakafoParSem', sql.Decimal(15, 2), variation.sakafoParSem)
            .query('INSERT INTO Variation(AgeSemaine,VariationPoids,idRace,SakafoParSem) VALUES (@AgeSemaine,@VariationPoids,@idRace,@SakafoParSem)');
        return result.rowsAffected;
    }

    static async getPoidsMoyenAndSakafoParSemLatsakaAgeSemaine(idRace, ageSemaine) {
        const pool = await getConnection();
        //console.log('idRace ato anaty DAO = ',idRace);
        const result = await pool.request()
            .input('idRace', sql.Int, idRace)
            .input('AgeSemaine', sql.Int, ageSemaine)
            .query('SELECT SUM(VariationPoids) AS PoidsMoyen,SUM(SakafoParSem) AS Sakafo FROM Variation WHERE idRace = @idRace AND AgeSemaine <= @AgeSemaine');
        //console.log('valiny poids ',result.recordset[0].PoidsMoyen);
        return {
            PoidsMoyenLatsakaAgeSemaine: result.recordset[0].PoidsMoyen,
            SakafoParSemLatsakaAgeSemaine: result.recordset[0].Sakafo
        }
    }

    static async checkAgeSemaineIfExistInVariation(ageSemaine) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Age', sql.Int, ageSemaine)
            .query('SELECT COUNT(id) AS NbVariation FROM Variation WHERE AgeSemaine=@Age');

        const nbVariation = result.recordset[0].NbVariation;

        if (nbVariation >= 1) {
            return true;
        } else if (nbVariation == 0) {
            return false;
        }
    }

    static async getVariationPoidsAndSakafoParSemByIdRaceAndAgeSemaine(idRace, ageSemaine) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idRace', sql.Int, idRace)
            .input('AgeSemaine', sql.Int, ageSemaine)
            .query('SELECT VariationPoids,SakafoParSem FROM Variation WHERE idRace = @idRace AND AgeSemaine = @AgeSemaine');

        return {
            VariationPoids: result.recordset[0].VariationPoids,
            SakafoParSem: result.recordset[0].SakafoParSem,
            AgeSemaine: ageSemaine
        };
    }

    static async getByRaceAndAge(idRace, ageSemaine) {
        const query = `
        SELECT TOP 1 
            v.VariationPoids,
            v.SakafoParSem,
            v.AgeSemaine
        FROM Variation v
        WHERE v.idRace = @idRace
          AND v.AgeSemaine <= @ageSemaine
        ORDER BY v.AgeSemaine DESC
        -- TOP 1 + ORDER BY DESC → prend la valeur la plus proche
        -- si ageSemaine = 9 et qu'on a 8 et 10, prend 8
    `;

        const result = await db.query(query, {
            idRace,
            ageSemaine
        });

        return result[0] ?? null;
    }
}

export default VariationDAO;