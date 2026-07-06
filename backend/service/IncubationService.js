import IncubationDAO from "../dao/IncubationDAO.js";
import RecensementAtodyDAO from "../dao/RecensementAtodyDAO.js";
import ApiError from "../utils/ApiError.js";
import Lot from "../model/Lot.js";
import RaceDAO from "../dao/RaceDAO.js";
import IncubationLotDAO from "../dao/IncubationLotDAO.js";
import LotDAO from "../dao/LotDAO.js";
import IncubationLot from "../model/IncubationLot.js";

class IncubationService{
    
    static async checkCreateIncubation(incubation){
        const dateATraiter = new Date(incubation.dateIncubation);
        const lot = await LotDAO.getById(incubation.idLot);
        const dateCreationLot = new Date(lot.dateCreation);

        console.log("Date de incubation :", incubation.dateIncubation, "Date de création du lot:", dateCreationLot,' test ', dateCreationLot>dateATraiter);

        if (dateCreationLot > dateATraiter) {
            throw new ApiError(
                "La date d'incubation ne peut pas être antérieure à la date de création du lot.",
                'INVALID_INPUT'
            );
        }
        const { NbAtodyRecenseTotal } = await RecensementAtodyDAO.getNbAtodyRecense(incubation.idLot,dateATraiter);

        if(NbAtodyRecenseTotal==0){
            throw new ApiError("Il doit avoir d'oeufs avant l'incubation.",'INVALID_INPUT');
        }



        const dao = new IncubationDAO();
        const result = await dao.create(incubation);
        //const result = 0; 
        if(incubation.idEtatAtody==1){
            const lotDAO = new LotDAO();
            const { idRace } = await lotDAO.getidRace(incubation.idLot);
            const lot = new Lot(
                null,
                incubation.dateIncubation,
                0,
                incubation.nb,
                idRace
            );

            const { idLotInsert }  = await lotDAO.create(lot);

            const incLot = new IncubationLot(
                incubation.idLot,
                idLotInsert,
                incubation.dateIncubation
            );

            const incubationLotDAO = new IncubationLotDAO();
            const resultIncLot = await incubationLotDAO.create(incLot);
        }

        return result;
    }
}

export default IncubationService;