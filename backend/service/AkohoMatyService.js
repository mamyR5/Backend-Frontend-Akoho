import Lot from "../model/Lot.js";
import AkohoMatyDAO from "../dao/AkohoMatyDAO.js";
import LotDAO from "../dao/LotDAO.js";
import ApiError from "../utils/ApiError.js";
import RaceDAO from "../dao/RaceDAO.js";
import LotService from "./LotService.js";
class AkohoMatyService {

    static async checkCreateAkohoMaty(akohoMaty) {
        const dateATraiter = new Date(akohoMaty.dateNahafatesana);
        const lot = await LotDAO.getById(parseInt(akohoMaty.idLot));
        const dateCreationLot = new Date(lot.dateCreation);
        //console.log('Recensement Atody ',recensement);
        //console.log("Date de recensement:", recensement.DateRecensement, "Date de création du lot:", dateCreationLot,' test ', dateCreationLot>dateATraiter);
        if (dateCreationLot > dateATraiter) {
            throw new ApiError(
                "La date de mortalité ne peut pas être antérieure à la date de création du lot.",
                'INVALID_INPUT'
            );
        }

        //const { NbAkohoReel } = await LotService.getNbAkohoActuel(akohoMaty.idLot,akohoMaty.dateNahafatesana);


        const dao = new AkohoMatyDAO();
        const result = await dao.create(akohoMaty);
        return 0;
    }
}

export default AkohoMatyService;