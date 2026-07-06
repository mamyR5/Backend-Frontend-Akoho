import AkohoMaty from "../model/AkohoMaty.js";
import AkohoMatyDAO from "../dao/AkohoMatyDAO.js";
import { sendSuccess,sendError } from "../utils/responseHandler.js";
import ApiError from "../utils/ApiError.js";
import AkohoMatyService from "../service/AkohoMatyService.js";

export const getAll = async (req,res)=>{
    try {
        const akohoMaty = await AkohoMatyDAO.getAll();
        sendSuccess(res,{count:akohoMaty.length ,list:akohoMaty});
    } catch (error) {
        sendError(error,res,500);
    }
};

export const create = async (req,res)=>{
    try {
        const nb = req.body.NbMaty;
        const dateNahafatesana = req.body.DateNahafatesana;
        const idLot = req.body.idLot;
        
        if(nb === null || dateNahafatesana===null || idLot ===null){
            throw new ApiError("Veuillez remplir les valeurs nulles.","INVALID_REQUEST");
        }
        
        if(nb<=0){
            throw new ApiError('Nombre de décès invalide.','INVALID_REQUEST');
        }

        const akohoMaty = new AkohoMaty(
            null,
            req.body.DateNahafatesana,
            parseInt(nb),
            parseInt(req.body.idLot)
        );

        //const dao = new AkohoMatyDAO();
        const result = await AkohoMatyService.checkCreateAkohoMaty(akohoMaty);
        sendSuccess(res,{ message : `${result} akoho maty crée(s) avec succès.`});
    } catch (error) {
        sendError(error,res,500);
    }
};