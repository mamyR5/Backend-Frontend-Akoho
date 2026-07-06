class RecensementAtody{

    #id;
    #dateRecensement;
    #nbAtody;
    #idLot;

    constructor(id,date,nb,idLot){
        this.#id=id;
        this.#dateRecensement = date;
        this.#nbAtody=nb;
        this.#idLot=idLot;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id=id;
    }

    get dateRecensement(){
        return this.#dateRecensement;
    }

    set dateRecensement(date){
        this.#dateRecensement=date;
    }

    get nbAtody(){
        return this.#nbAtody;
    }

    set nbAtody(nb){
        this.#nbAtody=nb;
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
            dateRecensement:this.#dateRecensement,
            nbAtody:this.#nbAtody,
            idLot:this.#idLot
        };
    }
}

export default RecensementAtody;