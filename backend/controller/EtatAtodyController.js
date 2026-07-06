import EtatAtodyDAO from "../dao/EtatAtodyDAO.js";
import EtatAtody from "../model/EtatAtody.js";
import {sendSuccess,sendError} from '../utils/responseHandler.js';
import ApiError from "../utils/ApiError.js";
export const getAll = async (req,res) =>{
    try {
        const etats = await EtatAtodyDAO.getAll();
        sendSuccess(res,{count:etats.length,list:etats});
    } catch (error) {
        sendError(error,res, 500);
    }
};

export const create = async (req,res)=>{
    try {
        const etat = new EtatAtody(
            null,
            req.body.libelle
        );

        const etatAtodyDAO = new EtatAtodyDAO();
        const row = await etatAtodyDAO.create(etat);
        sendSuccess(res,{ message: `${row} état(s) atody crée(s) avec succès.` })
    } catch (error) {
        sendError(error,res,500);
    }
};

export const edit = async (req,res)=>{
    try {
        const id = req.params.id;
        
        if(isNaN(id) || parseInt(id) <= 0){
            throw new ApiError('id état atody invalide.','INCORRECT_REQUEST')
        }

        const etat = new EtatAtody(
            parseInt(id),
            req.body.libelle
        ) ;
        const etatAtodyDAO = new EtatAtodyDAO();
        const rowsAffected = await etatAtodyDAO.edit(etat);
        sendSuccess(res,{message:`${rowsAffected} état(s) atody modifié(s) avec succès.`});
    } catch (error) {
        sendError(error,res,500);
    }
};