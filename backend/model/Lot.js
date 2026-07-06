class Lot{
    #id;
    #dateCreation;
    #ageSemaine;
    #nbAkoho;
    #idRace;

    constructor(id,DateCreation,AgeSemaine,NbAkoho,idRace){
        this.#id=id;
        this.#dateCreation=DateCreation;
        this.#ageSemaine = AgeSemaine;
        this.#nbAkoho=NbAkoho;
        this.#idRace=idRace;
    }


    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get dateCreation(){
        return this.#dateCreation;
    }

    set dateCreation(dateCreation){
        this.#dateCreation = dateCreation;
    }

    get ageSemaine(){
        return this.#ageSemaine;
    }

    set ageSemaine(ageSemaine){
        this.#ageSemaine = ageSemaine;
    }

    get nbAkoho(){
        return this.#nbAkoho;
    }

    set nbAkoho(nb){
        this.#nbAkoho = nb;
    }


    get idRace(){
        return this.#idRace;
    }

    set idRace(id){
        this.#idRace=id;
    }

    toJSON() {
        return {
            id: this.#id,
            dateCreation: this.#dateCreation,
            ageSemaine: this.#ageSemaine,
            nbAkoho: this.#nbAkoho,
            idRace:this.#idRace
        };
    }
    
}

export default Lot;