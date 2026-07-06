class Incubation{

    #id;
    #dateIncubation;
    #nb;
    #idEtatAtody;
    #idLot;

    constructor(id,date,nb,idEtat,idLot){
        this.#id=id;
        this.#dateIncubation=date;
        this.#nb=nb;
        this.#idEtatAtody=idEtat;
        this.#idLot=idLot;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id=id;
    }

    get dateIncubation(){
        return this.#dateIncubation;
    }

    set dateIncubation(date){
        this.#dateIncubation=date;
    }

    get nb(){
        return this.#nb;
    }

    set nb(nb){
        this.#nb=nb;
    }

    get idEtatAtody(){
        return this.#idEtatAtody;
    }

    set idEtatAtody(id){
        this.#idEtatAtody=id;
    }

    get idLot(){
        return this.#idLot;
    }

    set idLot(id){
        this.#idLot=id;
    }

    toJSON(){
        return {
            id:this.#id,
            dateIncubation:this.#dateIncubation,
            nb:this.#nb,
            idEtatAtody:this.#idEtatAtody,
            idLot:this.#idLot
        };
    }
}

export default Incubation;