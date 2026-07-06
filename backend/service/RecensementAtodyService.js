import Lot from "../model/Lot.js";
import RecensementAtodyDAO from "../dao/RecensementAtodyDAO.js";
import LotDAO from "../dao/LotDAO.js";
import ApiError from "../utils/ApiError.js";
import LotService from "./LotService.js";
import RaceDAO from "../dao/RaceDAO.js";
import IncubationDAO from "../dao/IncubationDAO.js";
import Incubation from "../model/Incubation.js";
import DetailLot from "../model/DetailLot.js";
import DetailLotDAO from "../dao/DetailLotDAO.js";
import IncubationLot from "../model/IncubationLot.js";
import IncubationLotDAO from "../dao/IncubationLotDAO.js";
class RecensementAtodyService {

    static async checkCreateRecensementAtody(recensement) {
        const dateATraiter = new Date(recensement.dateRecensement);
        const lotDAO = new LotDAO();
        const lot = await LotDAO.getById(parseInt(recensement.idLot));
        const dateCreationLot = new Date(lot.dateCreation);
        const { NbAkoho } = await DetailLotDAO.getNbAkohoByIdLotAndIdGenre(recensement.idLot,2);//Isan'ny akoho vavy satria idGenre = 2
        const { NbPondaisonMax } = await RaceDAO.getNbPondaisonMax(lot.idRace);
        const { NbAtodyRecenseTotal } = await RecensementAtodyDAO.getNbAtodyRecenseTotal(lot.id);
        
        const { AgeSemaineFiltre } = await LotService.getAgeSemaine(recensement.idLot,recensement.dateRecensement);
        const { AgeSemPondaison } = await RaceDAO.getAgeSemPondaison(lot.id);



        //console.log('Recensement Atody ',recensement);
        //console.log("Date de recensement:", recensement.DateRecensement, "Date de création du lot:", dateCreationLot,' test ', dateCreationLot>dateATraiter);
        if (dateCreationLot > dateATraiter) {
            throw new ApiError(
                "La date de recensement ne peut pas être antérieure à la date de création du lot.",
                'INVALID_INPUT'
            );
        }

        if( AgeSemaineFiltre < AgeSemPondaison){
            throw new ApiError(
                "L'âge du lot en question n'est pas encore capable de pondre à cette date.",
                'INVALID_INPUT'
            );
        }

        if(recensement.nbAtody + NbAtodyRecenseTotal > NbPondaisonMax * NbAkoho){
            throw new ApiError(
                "Le nombre d'oeuf insérée ne peut pas être supérieur à celui de la pondaison maximale du lot.",
                'INVALID_INPUT'
            );
        }

        const { DateEclosion } = await RecensementAtodyDAO.getDateEclosion(recensement.idLot,recensement.dateRecensement);
        const { PourcentageLamokany } = await RaceDAO.getPourcentageLamokanyByIdRace(lot.idRace);
        const NbAtodyLamokany = parseInt((recensement.nbAtody * PourcentageLamokany) / 100);
        const NbAkohoLotFille = recensement.nbAtody - NbAtodyLamokany;
        console.log('NbAkohoLotFille = ',recensement.nbAtody,'-',NbAtodyLamokany);
        
        const lotFille = new Lot(null,DateEclosion,0,NbAkohoLotFille,lot.idRace);
        
        const insertLotFille = await lotDAO.create(lotFille);

        const incubationDAO = new IncubationDAO();
        const incubationAutomatique = new Incubation(null,DateEclosion,NbAkohoLotFille,1,insertLotFille.idLotInsert);
        
        const insertIncubationLotFille = await incubationDAO.create(incubationAutomatique);
        
        console.log(incubationAutomatique.toJSON());
        const lamokany = new Incubation(null,DateEclosion,NbAtodyLamokany,2,insertLotFille.idLotInsert);
        
        const insertLamokany = await incubationDAO.create(lamokany);
        
        console.log(lamokany.toJSON());

        const detailLotDAO = new DetailLotDAO();
        const incubationLotDAO = new IncubationLotDAO();
        const { PourcentageGenreFohy } = await RaceDAO.getPourcentageGenreByIdGenre(2);
        const nbAkohoVavy = Math.round((PourcentageGenreFohy * NbAkohoLotFille)/100);
        
        const detailLotFille = new DetailLot(null,insertLotFille.idLotInsert,nbAkohoVavy,PourcentageGenreFohy,2);
        console.log('idLotFille ',insertLotFille.idLotInsert,' nbAkohoVavy ',nbAkohoVavy,' pourcentage ',PourcentageGenreFohy,' idGenre ',2);
        console.log('detail Lot Fille',detailLotFille.toJSON());
        
        const insertDetailFille = await detailLotDAO.create(detailLotFille);
        
        const incubationLot = new IncubationLot(lot.id,insertLotFille.idLotInsert,recensement.dateRecensement);
        console.log(incubationLot.toJSON());
        
        const insertIncubationLot = await incubationLotDAO.create(incubationLot);

        const incubationFohyLotMere = new Incubation(null,DateEclosion,recensement.nbAtody,1,recensement.idLot);
        //const incubationLamokanyLotMere = new Incubation(null,DateEclosion,NbAtodyLamokany,2,recensement.idLot);
        const result1 = await incubationDAO.create(incubationFohyLotMere);
        //const result2 = await incubationDAO.create(incubationLamokanyLotMere);

        const dao = new RecensementAtodyDAO();
        const result = await dao.create(recensement);
        return result;
    }
}

export default RecensementAtodyService;
