import Race from "../model/Race.js";
import RaceDAO from "../dao/RaceDAO.js";
import { sendSuccess,sendError } from "../utils/responseHandler.js";
import ApiError from "../utils/ApiError.js";

export const getAll = async (req,res)=>{
    try {
        const races = await RaceDAO.getAll();
        sendSuccess(res,{count:races.length,list:races});
    } catch (error) {
        sendError(error,res,500);
    }
};

export const getById = async (req,res) => {
    try {
        const id = req.params.id;

        if(!id instanceof Number){
            throw new ApiError(`L'id de la race doit être un nombre`,'INVALID_REQUEST');
        }

        const race = await RaceDAO.getById(parseInt(id));
        
        if(race){
            sendSuccess(res,{count:1,list:[race]});
        }else{
            throw new ApiError(`Race avec id ${id} introuvable`,'RACE_NOT_FOUND');
        }
    } catch (error) {
        sendError(error,res,500);
    }
};

export const create = async (req,res) => {
    try {
        const puSakafo = parseFloat(req.body.PUSakafo);
        const prixVente = parseFloat(req.body.PrixVente);
        const puAchat = parseFloat(req.body.PUAchat);
        const tempsIncubation = parseInt(req.body.TempsIncubation);
        
        if(puSakafo<=0 || prixVente<=0 || tempsIncubation<=0 || puAchat<=0){
            throw new ApiError('Veuillez fournir des valeurs numériques valides pour la race.','INVALID_REQUEST');
        }

        const race = new Race(
            null,
            req.body.Nom,
            puSakafo,
            prixVente,
            puAchat,
            tempsIncubation
        );

        const dao = new RaceDAO();
        const result = await dao.create(race);

        sendSuccess(res,{message:`${result} race(s) insérée(s) avec succès.`});

    } catch (error) {
        sendError(error,res,500);
    }
};