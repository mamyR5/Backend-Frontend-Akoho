import RecensementAtody from "../model/RecensementAtody.js";
import RecensementAtodyDAO from "../dao/RecensementAtodyDAO.js";
import {sendSuccess,sendError} from '../utils/responseHandler.js';
import RecensementAtodyService from "../service/RecensementAtodyService.js";

export const getAll = async (req,res) =>{
    try {
        const recensements = await RecensementAtodyDAO.getAll();
        sendSuccess(res,{count:recensements.length,list:recensements});
    } catch (error) {
        sendError(error,res, 500);
    }
};

export const create = async (req, res) => {
    console.log('req.body :', req.body);
    try {
        const { DateRecensement, NbAtody, idLot } = req.body;

        if (!DateRecensement || !NbAtody || !idLot) {
            return res.status(400).json({ 
                status: 'error',
                error: { message: 'Champs manquants', code: 'MISSING_FIELDS' }
            });
        }

        const recensement = new RecensementAtody(
            null,
            DateRecensement,
            parseInt(NbAtody),
            parseInt(idLot)
        );

        const rowsAffected = await RecensementAtodyService.checkCreateRecensementAtody(recensement);
        sendSuccess(res, { message: `${rowsAffected} recensement(s) atody créé(s) avec succès.` });

    } catch (error) {
        sendError(error, res, 500);
    }
};
