import VariationDAO from "../dao/VariationDAO.js";
import Variation from "../model/Variation.js";
import { sendError,sendSuccess } from "../utils/responseHandler.js";

export const getAll = async (req,res) => {
    try {
        const variations = await VariationDAO.getAll();
        sendSuccess(res,{count:variations.length,list:variations}); 
    } catch (error) {
        sendError(error,res,500);
    }
};

export const create = async (req,res)=>{
    try {
        const ageSemaine = req.body.AgeSemaine;
        const variationPoids = req.body.VariationPoids;
        const sakafoParSem = req.body.SakafoParSem;

        if(parseInt(ageSemaine)<0 || parseInt(variationPoids)<=0 || parseInt(sakafoParSem) <0){
            throw new ApiError(`Les paramètres numériques sont invalides.`,'INVALID_REQUEST');
        }

        const variation = new Variation(
            null,
            parseInt(ageSemaine),
            parseFloat(variationPoids),
            req.body.idRace,
            parseFloat(sakafoParSem)
        );

        const dao = new VariationDAO();
        const result = await dao.create(variation);

        sendSuccess(res,{message:`${result} variation(s) insérée(s) avec succès.`})
    } catch (error) {
        sendError(error,res,500);
    }
};
