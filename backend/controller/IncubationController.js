import Incubation from "../model/Incubation.js";
import IncubationDAO from '../dao/IncubationDAO.js';
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import ApiError from "../utils/ApiError.js";
import IncubationService from "../service/IncubationService.js";

export const getAll = async (req,res) =>{
    try {
        const incs = await IncubationDAO.getAll();
        sendSuccess(res,{count:incs.length,list:incs});
    } catch (error) {
        sendError(error,res,500);
    }
};

export const create = async (req,res) =>{
    try {
        const nb = req.body.Nb;
        const date = req.body.DateIncubation;
        const idEtatAtody = req.body.idEtatAtody;
        const idLot = req.body.idLot;


        if(date===null || idEtatAtody===null | idLot===null){
            throw new ApiError("Veuillez remplir les valeurs nulles.","INVALID_REQUEST");
        }
        
        if(parseInt(nb)<=0 || isNaN(nb) || nb===null){
            throw new ApiError("Nombre d'Atody invalide.","INVALID_REQUEST");
        }

        const inc = new Incubation(
            null,
            req.body.DateIncubation,
            nb,
            parseInt(req.body.idEtatAtody),
            parseInt(req.body.idLot)
        );

        //const dao = new IncubationDAO();
        const row = await IncubationService.checkCreateIncubation(inc);

        sendSuccess(res,{message:`${row} incubation(s) crée(s) avec succès.`});

    } catch (error) {
        sendError(error,res,500);
    }
};