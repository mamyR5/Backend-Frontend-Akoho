class DetailLot{
    #id;
    #idLot;
    #nbAkoho;
    #pourcentageLot;
    #idGenre;

    constructor(id,idLot,nbAkoho,pourcentageLot,idGenre){
        this.#id = id;
        this.#idLot = idLot;
        this.#nbAkoho = nbAkoho;
        this.#pourcentageLot = pourcentageLot;
        this.#idGenre = idGenre;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get idLot(){
        return this.#idLot;
    }

    set idLot(id){
        this.#idLot = id;
    }

    get nbAkoho(){
        return this.#nbAkoho;
    }

    set nbAkoho(nb){
        this.#nbAkoho = nb;
    }

    get pourcentageLot(){
        return this.#pourcentageLot;
    }

    set pourcentageLot(pourcentage){
        this.#pourcentageLot = pourcentage;
    }

    get idGenre(){
        return this.#idGenre;
    }

    set idGenre(id){
        this.#idGenre = id;
    }

    toJSON(){
        return {
            id:this.#id,
            idLot:this.#idLot,
            nbAkoho:this.#nbAkoho,
            pourcentageLot:this.#pourcentageLot,
            idGenre:this.#idGenre
        };
    }
}

export default DetailLot;