import VariationDAO from "../dao/VariationDAO.js";
import LotDAO from "../dao/LotDAO.js";
import ApiError from "../utils/ApiError.js";
import RaceDAO from "../dao/RaceDAO.js";
import AkohoMatyDAO from "../dao/AkohoMatyDAO.js";
import RecensementAtodyDAO from "../dao/RecensementAtodyDAO.js";
import IncubationDAO from "../dao/IncubationDAO.js";
import IncubationLotDAO from "../dao/IncubationLotDAO.js";
import Lot from "../model/Lot.js";
import DetailLotDAO from "../dao/DetailLotDAO.js";
import DetailLot from "../model/DetailLot.js";
import Race from "../model/Race.js";

class LotService {


    static async getAgeSemaine(idLot, dateFiltre) {
        const lotDAO = new LotDAO();
        const result = await lotDAO.getAgeSemaineByDateFiltre(parseInt(idLot), dateFiltre);


        let diffJour = result.DifferenceJour;
        //let diffJourEnSemaine = parseInt(diffJour / 7);// Avadika en semaine ilay différence jour

        /*if (diffJour > 1) {
            if(diffJour % 7 == 0 ){
                console.log('reste Jour === 0 ',diffJour % 7);
                result.AgeSemaineFiltre = result.AgeSemaineFiltre - 1;
            }
        }*/

        if (diffJour < 0) {//raha toa ka mbola latsaky ny semaine nampidirana azy
            /*diffJour = Math.abs(diffJour)+1;
            diffJourEnSemaine = parseInt(diffJour/7);
            
            
            let resteSemaineParRapportDateFiltre = 0;
            console.log('diffJourSemaine ',diffJourEnSemaine,' differenceJour ',diffJour, ' diffJour-diffJourEnSemaine*7 ', diffJour-diffJourEnSemaine*7);
            
            if(diffJour>1 && diffJour<7){ //raha toa ka ao anatin'ilay semaine 0 ilay jour
                diffJourEnSemaine = 1;
            }else if(diffJour>7 && diffJour-diffJourEnSemaine*7==1){ //raha toa ka nitotona tao amin'ny 7 * k + 1 jour (k entier naturel) ilay diffJour 
                resteSemaineParRapportDateFiltre = diffJour-diffJourEnSemaine*7; 
            }else if(diffJour>7 && diffJour-diffJourEnSemaine*7!=1){ //raha mihoatra kely
                resteSemaineParRapportDateFiltre = 1;
                //console.log('atooooooooooo ',' diffJour-diffJourEnSemaine*7 ', diffJour-diffJourEnSemaine*7);
            }else if(diffJour-diffJourEnSemaine*7==0){
                resteSemaineParRapportDateFiltre = 0;
            }
            
            const decalageAgeSemaineParRaportAgeSemaineDebut = result.AgeSemaineDebut - (diffJourEnSemaine + resteSemaineParRapportDateFiltre); 
            // Jerena hoe firy ny elanelana entre ilay AgeSemaineDebut sy ny [Isan'ny semaine + ResteAgeSemaine] 
            
            console.log(' décalage ', decalageAgeSemaineParRaportAgeSemaineDebut , ' diffJourSemaine ',diffJourEnSemaine, ' reste ',resteSemaineParRapportDateFiltre);
            
            if(decalageAgeSemaineParRaportAgeSemaineDebut<0){//raha ohatra latsaky ny semaine 0
                result.AgeSemaineFiltre=null;
            }else if(decalageAgeSemaineParRaportAgeSemaineDebut>=0){
                result.AgeSemaineFiltre=decalageAgeSemaineParRaportAgeSemaineDebut;
            }
            //result.DifferenceJour = diffJour;
            */
            result.AgeSemaineFiltre = null;
        }
        return result;
    }

    static async getPoidsMoyenUnitaireAndSakafoParSemUnitaire(idLot, dateFiltre) {
        const lotDAO = new LotDAO();

        const { idRace } = await lotDAO.getidRace(idLot);
        //console.log('idRace ',idRace);
        const { DifferenceJour, AgeSemaineFiltre, AgeSemaineDebut } = await LotService.getAgeSemaine(idLot, dateFiltre);

        let result = {
            PoidsMoyenUnitaire: 0,
            PoidsSakafoUnitaire: 0,
            AgeSemaineDateFiltre: null,
            AgeSemaineDebut: AgeSemaineDebut,
            DifferenceJour: DifferenceJour,
            Exist: true,
            idLot: idLot,
            DateFiltre: dateFiltre
        };

        const check = await VariationDAO.checkAgeSemaineIfExistInVariation(AgeSemaineFiltre);
        console.log('check ', check);
        if (check == false) {
            //throw new ApiError("L' âge en semaine ne possède pas de variation pris en compte.",'AGE_NOT_FOUND');
            result.PoidsMoyenUnitaire = 0;
            result.PoidsSakafoUnitaire = 0;
            result.Exist = false;
        } else {

            console.log(' DifferenceJour ', DifferenceJour, ' AgeSemaineFiltre ', AgeSemaineFiltre);

            const { VariationPoids, SakafoParSem } = await VariationDAO.getVariationPoidsAndSakafoParSemByIdRaceAndAgeSemaine(parseInt(idRace), parseInt(AgeSemaineFiltre));

            let diffJourEnSemaine = parseInt(DifferenceJour / 7);



            console.log('diffJourEnSem ', diffJourEnSemaine);
            let diffJour = DifferenceJour;
            //const elanelanaJourParRapportSemaineFiltre = parseInt(DifferenceJour) - 7 * AgeSemaineFiltre;
            //Ampifanalana ny différence ny jour sy ny age en semaine en jours
            //(Ahafatarana hoe aiza ho aiza ao amin'ilay semaine ilay jour hanaovana filtre par rapport amin'ilay semaine de départ)

            //console.log(' elanelanaJourParRapportSemaineFiltre ',elanelanaJourParRapportSemaineFiltre);
            const { PoidsMoyenLatsakaAgeSemaine, SakafoParSemLatsakaAgeSemaine } = await VariationDAO.getPoidsMoyenAndSakafoParSemLatsakaAgeSemaine(idRace, AgeSemaineFiltre);

            result = {
                PoidsMoyenUnitaire: PoidsMoyenLatsakaAgeSemaine,
                PoidsSakafoUnitaire: SakafoParSemLatsakaAgeSemaine,
                AgeSemaineDateFiltre: AgeSemaineFiltre,
                AgeSemaineDebut: AgeSemaineDebut,
                DifferenceJour: DifferenceJour,
                Exist: true,
                idLot: idLot,
                DateFiltre: dateFiltre
            };

            console.log(result);

            let reste = diffJour % 7;

            result.PoidsMoyenUnitaire = (result.PoidsMoyenUnitaire - VariationPoids) + (VariationPoids * reste) / 7;
            result.PoidsSakafoUnitaire = (result.PoidsSakafoUnitaire - SakafoParSem) + (SakafoParSem * reste / 7);

            /*let reste = diffJour - 7 * diffJourEnSemaine;
            console.log('reste ', reste);

            if (diffJour % 7 == 0) { //raha toa ka eo amin'ny farany ny semaine ilay jour filtre
                diffJourEnSemaine = 7;
            } else if (diffJour % 7 == 1) { //raha toa ka nihoatra kelin'ilay semaine , izany hoe fanombohana semaine hafa
                diffJourEnSemaine = 0;
            }/* else if (diffJour > 7 && diffJour % 7 != 1) {//raha toa ka ao anaty semaine ilay jour
                reste--;
            }*/

            /*if (reste == 0) {
                result.PoidsMoyenUnitaire = (result.PoidsMoyenUnitaire - VariationPoids) + (VariationPoids * diffJourEnSemaine) / 7;
                result.PoidsSakafoUnitaire = (result.PoidsSakafoUnitaire - SakafoParSem) + (SakafoParSem * diffJourEnSemaine / 7);
            } else if (reste != 0) {
                console.log('diffJourEnSemaine ', diffJourEnSemaine, ' poids moyen unitaire latsaka ', result.PoidsMoyenUnitaire, ' VariationPoids ', VariationPoids, ' reste ', reste);
                result.PoidsMoyenUnitaire = (result.PoidsMoyenUnitaire - VariationPoids) + (VariationPoids * (reste)) / 7;
                result.PoidsSakafoUnitaire = (result.PoidsSakafoUnitaire - SakafoParSem) + (SakafoParSem * (reste) / 7);
                //}
            }*/
        }

        /*const modulo7DifferenceJour = Math.abs(DifferenceJour)-7*parseInt(Math.abs(DifferenceJour)/7);
        console.log(' modulo 7 ',modulo7DifferenceJour);
        console.log('elanelanaJourParRapportSemaineFiltre = ',elanelanaJourParRapportSemaineFiltre,' poidsMoyen ',result.PoidsMoyenUnitaire, ' ageSemaineFiltre ',AgeSemaineFiltre);
        if(elanelanaJourParRapportSemaineFiltre<=0 && modulo7DifferenceJour==0){
        //(raha toa ka mitotona eo amin'ilay semaine tokoa ilay dateFiltre)
            console.log('ato izy no niditra');
            result.PoidsMoyenUnitaire = (result.PoidsMoyenUnitaire-VariationPoids) + VariationPoids/7;
            result.PoidsSakafoUnitaire = (result.PoidsSakafoUnitaire-SakafoParSem) + SakafoParSem/7;
            return result;
        }else if(elanelanaJourParRapportSemaineFiltre>0){
        //(raha tsy mitotontona fa mihoatra kely)
        console.log('ato izy no niditra 2');
            result.PoidsMoyenUnitaire = result.PoidsMoyenUnitaire-VariationPoids + VariationPoids * elanelanaJourParRapportSemaineFiltre / 7;
            result.PoidsSakafoUnitaire = result.PoidsSakafoUnitaire-SakafoParSem + SakafoParSem * elanelanaJourParRapportSemaineFiltre / 7;
            return result;
        }else if(elanelanaJourParRapportSemaineFiltre<0){
            console.log('ato izy no niditra 3');
        //(raha toa ka mbola latasaky ny Age semaine nidirana)
            if( AgeSemaineFiltre==0){//raha toa ka Age Semaine 0 no mitotona ilay age en semaine an'ilay filtre
                result.PoidsMoyenUnitaire = result.PoidsMoyenUnitaire* ((-1)*elanelanaJourParRapportSemaineFiltre)*VariationPoids/7;
                result.PoidsSakafoUnitaire = result.PoidsSakafoUnitaire * ((-1)*elanelanaJourParRapportSemaineFiltre)*SakafoParSem/7;
            }else if(AgeSemaineFiltre>0){ //raha toa ka mihoatran'ny age semaine 0 ilay date de création an'ilay lot
                let positionJourDansSemaine = 7*AgeSemaineDebut - Math.abs(DifferenceJour);
                result.PoidsMoyenUnitaire = result.PoidsMoyenUnitaire-VariationPoids+ (VariationPoids*(positionJourDansSemaine))/7;
                result.PoidsSakafoUnitaire = result.PoidsSakafoUnitaire-SakafoParSem+(SakafoParSem*(positionJourDansSemaine))/7;
                console.log('position du jour dans la semaine = ',positionJourDansSemaine,' poidsMoyen = ',result.PoidsMoyenUnitaire,' sakafo par semaine = ', result.PoidsSakafoUnitaire,' ageSemaineFiltre = ',AgeSemaineFiltre);
            }
            
        }
        */

        console.log(result);

        return result;
    }

    static async getNbAkohoActuel(idLot, dateFiltre) {
        const lotDAO = new LotDAO();
        const akohoMatyDAO = new AkohoMatyDAO();
        const lot = await LotDAO.getById(idLot);
        const dateATraiter = new Date(dateFiltre);
        const dateCreationLot = new Date(lot.dateCreation);
        const nbAkohoInitial = await lotDAO.getNbAkohoInitial(idLot);
        const { NbAkohoMatyTotal } = await akohoMatyDAO.getNbAkohoMaty(idLot, dateFiltre);
        console.log('nbAkohoInitial ', nbAkohoInitial, ' nbMatyReel ', NbAkohoMatyTotal, 'dateCreationLot ', dateCreationLot);

        if (dateATraiter < dateCreationLot) {
            return {
                NbAkohoReel: 0,
                DateFiltre: dateFiltre
            };
        } else {
            return {
                NbAkohoReel: nbAkohoInitial - NbAkohoMatyTotal,
                DateFiltre: dateFiltre
            };
        }
    }

    static async getNbAtodyActuel(idLot, dateFiltre) {
        const { NbAtodyRecenseTotal } = await RecensementAtodyDAO.getNbAtodyRecense(idLot, dateFiltre);
        const lot = await LotDAO.getById(idLot);
        const dateATraiter = new Date(dateFiltre);
        const dateCreationLot = new Date(lot.dateCreation);
        const nbAtodyLamokany = await IncubationDAO.getNbAtodyByIdEtatAtody(idLot, 2, dateFiltre);
        const nbAtodyLafo = await IncubationDAO.getNbAtodyByIdEtatAtody(idLot, 3, dateFiltre);
        const nbAtodyFohy = await IncubationDAO.getNbAtodyByIdEtatAtody(idLot, 1, dateFiltre);
        let result = NbAtodyRecenseTotal - (nbAtodyLamokany.NbAtodyTotal + nbAtodyLafo.NbAtodyTotal + nbAtodyFohy.NbAtodyTotal);
        console.log('result',result,'=',NbAtodyRecenseTotal,'-(',nbAtodyLamokany.NbAtodyTotal,'+',nbAtodyFohy.NbAtodyTotal,')');
        
        if(NbAtodyRecenseTotal==0){
            result = 0;
        }

        /*if(IncubationLotDAO.checkLotIfLotFille(idLot)){
            result = NbAtodyRecenseTotal;
        }*/

        console.log('NbAkohoActuel = ',NbAtodyRecenseTotal,'-(',nbAtodyLamokany.NbAtodyTotal,'+',nbAtodyLafo.NbAtodyTotal,') = ',result);
        
        let valiny = {
            NbAtodyTotal: 0,
            DateFiltre: dateFiltre
        };
        
        if (dateATraiter < dateCreationLot) {
            return valiny;
        } else {
            valiny.NbAtodyTotal = result;
            return valiny;
        }

    }

    static async getNbPondaisonMaxActuel(idLot, dateFiltre) {
        const lotDao = new LotDAO();
        const lot = await LotDAO.getById(idLot);
        const { idRace } = await lotDao.getidRace(idLot);
        const { NbPondaisonMax } = await RaceDAO.getNbPondaisonMax(idRace);
        const { NbAtodyRecenseTotal } = await RecensementAtodyDAO.getNbAtodyRecense(idLot, dateFiltre);
        const { NbAkoho } = await DetailLotDAO.getNbAkohoByIdLotAndIdGenre(idLot,2);
        const { NbAkohoMatyTotal } = await AkohoMatyDAO.getNbAkohoMatyByIdGenre(2,idLot,dateFiltre);
        console.log(' NbPondaisonMax = ', NbAkoho, '*', NbPondaisonMax, '-', NbAtodyRecenseTotal);
        const dateCreationLot = new Date(lot.dateCreation);
        const dateATraiter = new Date(dateFiltre);

        let result =  {
            NbPondaisonMaxReel: NbAkoho * NbPondaisonMax - NbAtodyRecenseTotal - NbAkohoMatyTotal * NbPondaisonMax,
            DateFiltre: dateFiltre
        };

        if(dateATraiter<dateCreationLot){
            result.NbPondaisonMaxReel = 0;
            return result;
        }else{
            return result;
        }
    }

    static async getPerteActuel(idLot,dateFiltre){
        const { NbAtodyTotal , EtatAtody } = await IncubationDAO.getNbAtodyByIdEtatAtody(idLot,2,dateFiltre);
        const lot = await LotDAO.getById(idLot);
        const { PrixUnitaireAtody } = await RaceDAO.getPUSakafo_PrixVente_PrixAtody_PUAchat_ById(lot.idRace);
        const dateCreationLot = new Date(lot.dateCreation);
        const dateATraiter = new Date(dateFiltre);

        let result = {
            PerteAtodyLamokany: PrixUnitaireAtody * NbAtodyTotal,
            NbAtodyLamokanyReel: NbAtodyTotal,
            DateFiltre:dateFiltre
        };

        console.log('Perte = ',PrixUnitaireAtody,'*',NbAtodyTotal);

        if(dateATraiter<dateCreationLot){
            result.PerteAtodyLamokany = 0;
            result.NbAtodyLamokanyReel = 0;
            return result;
        }else{
            return result;
        }
    }


    static async getSituation(idLot, dateFiltre) {
        const { PoidsMoyenUnitaire, PoidsSakafoUnitaire, Exist, AgeSemaineDateFiltre } = await LotService.getPoidsMoyenUnitaireAndSakafoParSemUnitaire(idLot, dateFiltre);
        if (Exist) {
            const lotDAO = new LotDAO();
            const akohoMatyDAO = new AkohoMatyDAO();
            const { NbAkohoReel } = await LotService.getNbAkohoActuel(idLot, dateFiltre);
            const { idRace } = await lotDAO.getidRace(idLot);
            const { PUSakafoParGramme, PrixVenteParGramme, PrixUnitaireAtody, PrixUnitaireAchat } = await RaceDAO.getPUSakafo_PrixVente_PrixAtody_PUAchat_ById(idRace);
            const checkLotFille = await IncubationLotDAO.checkLotIfLotFille(idLot);



            const prixSakafoTotal = PUSakafoParGramme * PoidsSakafoUnitaire * NbAkohoReel;

            const vavy = await RaceDAO.getPourcentageGenreByIdGenre(2);
            const lahy = await RaceDAO.getPourcentageGenreByIdGenre(1);
            const {PUVenteLahy,PUVenteVavy  } = await RaceDAO.getPUVente(idRace);

            const nbAkohoVavy =  Math.round(vavy.PourcentageGenreFohy*NbAkohoReel/100);

            const nbAkohoLahy = Math.round(lahy.PourcentageGenreFohy*NbAkohoReel/100);

            console.log('nbAkohoVavy ',nbAkohoVavy,' pourcentage Vavy =',vavy.PourcentageGenreFohy,' nbAkohoLahy ',nbAkohoLahy,' pourcentage =',lahy.PourcentageGenreFohy);

            let prixVenteTotalAkohoEstim = PoidsMoyenUnitaire * PrixVenteParGramme * NbAkohoReel;

            if(await IncubationLotDAO.checkLotIfLotFille(idLot)){
                prixVenteTotalAkohoEstim = PoidsMoyenUnitaire * nbAkohoVavy * PUVenteVavy + PoidsMoyenUnitaire * nbAkohoLahy * PUVenteLahy;
            }

            

            const nbAkohoInitial = await lotDAO.getNbAkohoInitial(idLot);

            const { NbAkohoMatyTotal } = await akohoMatyDAO.getNbAkohoMaty(idLot, dateFiltre);

            const { NbAtodyTotal } = await LotService.getNbAtodyActuel(idLot, dateFiltre);

            const nbAtodyLafo = await IncubationDAO.getNbAtodyByIdEtatAtody(idLot, 3, dateFiltre);
            const nbAtodyStockSynbAtodyLafo = NbAtodyTotal + nbAtodyLafo.NbAtodyTotal;
            console.log('NbTotal ',nbAtodyStockSynbAtodyLafo,' NbAtodyTotal =',NbAtodyTotal);
            //const prixVenteTotal = (NbAkohoReel * PrixVenteParGramme * PoidsMoyenUnitaire);
            console.log(' prix vente Total (', NbAkohoReel, '*', PrixVenteParGramme, '*', PoidsMoyenUnitaire, ')', '+(', NbAtodyTotal, '*', PrixUnitaireAtody, ')');
            const recetteTotal = NbAtodyTotal * PrixUnitaireAtody + prixVenteTotalAkohoEstim;
            console.log('recette total = ',nbAtodyStockSynbAtodyLafo,'*',PrixUnitaireAtody,'+',prixVenteTotalAkohoEstim);
            const { NbPondaisonMaxReel } = await LotService.getNbPondaisonMaxActuel(idLot,dateFiltre);
            const { PerteAtodyLamokany } = await LotService.getPerteActuel(idLot,dateFiltre);

            let prixAchat = PrixUnitaireAchat * nbAkohoInitial;
            if (checkLotFille) {
                prixAchat = 0;
            }

            const depenseTotal = prixAchat + prixSakafoTotal;

            console.log('depenseTotal = ',depenseTotal);

            //console.log('recette ',recetteTotal,' depense ',depenseTotal);
            return {
                idLot: idLot,
                NbAkohoTotal: NbAkohoReel,
                PrixAchat: prixAchat,
                PoidsSakafoUnitaire: PoidsSakafoUnitaire,
                PrixSakafoTotal: prixSakafoTotal,
                PoidsMoyenUnitaire: PoidsMoyenUnitaire,
                PoidsMoyenTotal: PoidsMoyenUnitaire * NbAkohoReel,
                NbAkohoMatyTotal: NbAkohoMatyTotal,
                NbPondaisonMax:NbPondaisonMaxReel,
                NbAtodyTotal: NbAtodyTotal,
                PerteAtody:PerteAtodyLamokany,
                PrixVenteTotal: prixVenteTotalAkohoEstim,
                PrixAtodyTotal: NbAtodyTotal * PrixUnitaireAtody,
                Recette:recetteTotal,
                Depense:depenseTotal,
                Benefice: recetteTotal - depenseTotal,
                AgeSemaineDateFiltre: AgeSemaineDateFiltre,
                Exist: Exist
            }
        } else {
            return {
                idLot: idLot,
                NbAkohoTotal: 0,
                NbAkohoMatyTotal:0,
                PrixAchat: 0,
                //PoidsSakafoUnitaire:PoidsSakafoUnitaire,
                PrixSakafoTotal: 0,
                //PoidsMoyenUnitaire:PoidsMoyenUnitaire,
                PoidsMoyenTotal: 0,
                NbAkohoMatyTotal: 0,
                NbPondaisonMax:0,
                NbAtodyTotal: 0,
                PerteAtody:0,
                PrixVenteTotal: 0,
                //PrixAtodyTotal:NbAtodyTotal*PrixUnitaireAtody,
                Benefice: 0,
                //AgeSemaineDateFiltre:AgeSemaineDateFiltre,
                Exist: Exist
            }
        }
    }

    static async getAllSituation(dateFiltre) {
        const lots = await LotDAO.getAll();
        const situations = [];
        for (const lot of lots) {
            const situation = await LotService.getSituation(lot.id, dateFiltre);
            if (situation.Exist) {
                situations.push(situation);
            }
        }
        return situations;
    }


    static async checkLotCreation(lot) {
        const lotDAO = new LotDAO();
        const detailLotDAO = new DetailLotDAO();
        const { idLotInsert, rowAffected } = await lotDAO.create(lot);
        const detailLot = new DetailLot(
            null,
            idLotInsert,
            lot.nbAkoho,
            100,
            2
        );
        const resultDetail = await detailLotDAO.create(detailLot);
        return resultDetail;
    }


    static async getPoidsUnitaireRace(idRace, DateDebut, DateFin) {
        const debut = new Date(DateDebut);
        const fin = new Date(DateFin);

        const diffMs = fin.getTime() - debut.getTime();
        const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const ageSemaine = Math.floor(diffJours / 7);

        console.log(`Âge calculé : ${diffJours} jours → ${ageSemaine} semaines`);

        const variation = await VariationDAO.getByRaceAndAge(idRace, ageSemaine);

        if (!variation) {
            throw new ApiError(
                `Aucune variation trouvée pour la race ${idRace} à ${ageSemaine} semaines`,
                'NOT_FOUND'
            );
        }

        return {
            ageSemaine,
            poids: variation.VariationPoids,
            sakafoParSem: variation.SakafoParSem
        };
    }


}

export default LotService;