import LotDAO from "../dao/LotDAO.js";
import Lot from "../model/Lot.js";
import ApiError from "../utils/ApiError.js";
import LotService from "../service/LotService.js";
import {sendSuccess,sendError} from '../utils/responseHandler.js';

export const getAll = async (req,res) =>{
    try {
        const lots  = await LotDAO.getAll();
        sendSuccess(res,{count:lots.length,list:lots});
    } catch (error) {
        sendError(error,res, 500);
    }
}

export const getById = async (req,res) =>{
    const id = parseInt(req.params.id);
    try {
        const lot = await LotDAO.getById(id);
        if(lot){
            sendSuccess(res,lot);
        }else{
            throw new ApiError(`Lot avec id ${id} non trouvé.`,'LOT_NOT_FOUND');
        }
    } catch (error) {
        sendError(error,res, 500);
    }
};

export const create = async (req,res) =>{
    try {
        //console.log(req.body);
        const age = parseInt(req.body.AgeSemaine);
        const nbAkoho = parseInt(req.body.NbAkoho);
       
        if(age < 0 || nbAkoho <= 0){
            throw new ApiError('Veuillez fournir des valeurs numériques valides pour le lot.','INVALID_REQUEST');
        }
        const lot = new Lot(
            null,
            req.body.DateCreation,
            age,
            nbAkoho,
            parseInt(req.body.idRace)
        );
        const rowAffected = await LotService.checkLotCreation(lot);
        sendSuccess(res, { message: `${rowAffected} lot(s) créé(s) avec succès.` });
    } catch (error) {
        sendError(error,res, 500);
    }
};

export const getAgeSemaine = async (req,res)=>{
    try {
        const idLot = req.body.idLot;
        const dateFiltre  = req.body.DateFiltre;
        if(!idLot instanceof Number){
            throw new ApiError("L'id du lot doit être un nombre valide.","INVALID_REQUEST");
        }

        const result = await LotService.getAgeSemaine(idLot,dateFiltre);        

        sendSuccess(res,result);

    } catch (error) {
        sendError(error,res,500);
    }
};

export const getNbAkohoTotal = async (req,res)=>{
    try {
        const idLot = req.body.idLot;
        const dateFiltre  = req.body.DateFiltre;
        if(!idLot instanceof Number){
            throw new ApiError("L'id du lot doit être un nombre valide.","INVALID_REQUEST");
        }

        const dao = new LotDAO();
        const result = await dao.getNbAkohoTotal(parseInt(idLot),dateFiltre);

        sendSuccess(res,result);

    } catch (error) {
        sendError(error,res,500);
    }
};

export const getPoidsMoyenAndSakafoParSem = async (req,res) =>{

    try {
        const idLot = req.body.idLot;
        const dateFiltre = req.body.DateFiltre;

        const result = await LotService.getPoidsMoyenUnitaireAndSakafoParSemUnitaire(parseInt(idLot),dateFiltre);
        
        sendSuccess(res,result);

    } catch (error) {
        sendError(error,res,500);
    }
};

export const getNbPondaisonMax = async (req,res) =>{
    try {
        const idLot = req.body.idLot;
        const dateFiltre = req.body.DateFiltre;

        const result = await LotService.getNbPondaisonMaxActuel(idLot,dateFiltre);

        sendSuccess(res,result);
    } catch (error) {
        sendError(error,res,500);
    }
};

export const getPerteActuel = async (req,res) =>{
    try {
        const idLot = req.body.idLot;
        const dateFiltre = req.body.DateFiltre;

        const result = await LotService.getPerteActuel(idLot,dateFiltre);

        sendSuccess(res,result);
    } catch (error) {
        sendError(error,res,500);
    }
};

export const getSituationLot = async (req,res) =>{
    try {
        const idLot = req.body.idLot;
        const dateFiltre = req.body.DateFiltre;

        if(idLot===null || isNaN(idLot) || dateFiltre===null){
            throw new ApiError('Veuillez remplir des valeurs non nulles et valides.','INVALID_REQUEST');
        }
        const result = await LotService.getSituation(parseInt(idLot),dateFiltre);
        sendSuccess(res,result);
    } catch (error) {
        sendError(error,res,500);
    }
};

export const getAllSituationLot = async (req,res) =>{
    try{
        const dateFiltre = req.body.DateFiltre;
        
        if(dateFiltre==null){
            throw new ApiError('Veuillez insérer une date valide.','INVALID_INPUT');
        }

        const situations = await LotService.getAllSituation(dateFiltre);

        sendSuccess(res,{count:situations.length,list:situations});

    }catch(error){
        sendError(error,res,500);
    }
};


