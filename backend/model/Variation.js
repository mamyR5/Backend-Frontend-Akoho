class Variation{

    #id;
    #ageSemaine;
    #variationPoids;    
    #idRace;
    #sakafoParSem;


    constructor(id,age,varp,idRace,skps){
        this.#id=id;
        this.#ageSemaine=age;
        this.#variationPoids=varp;
        this.#idRace=idRace;
        this.#sakafoParSem=skps;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id=id;
    }

    get ageSemaine(){
        return this.#ageSemaine;
    }

    set ageSemaine(age){
        this.#ageSemaine=age;
    }

    get variationPoids(){
        return this.#variationPoids;
    }

    set variationPoids(vp){
        this.#variationPoids=vp;
    }

    get idRace(){
        return this.#idRace;
    }

    set idRace(id){
        this.#idRace=id;
    }

    get sakafoParSem(){
        return this.#sakafoParSem;
    }

    set sakafoParSem(skps){
        this.#sakafoParSem=skps;
    }

    toJSON(){
        return {
            id:this.#id,
            ageSemaine:this.#ageSemaine,
            variationPoids:this.#variationPoids,
            idRace:this.#idRace,
            sakafoParSem:this.#sakafoParSem
        };
    }

}

export default Variation;