class AkohoMaty{

    #id;
    #dateNahafatesana;
    #nbMaty;
    #idLot;

    constructor(id,date,nb,idLot)
    {
        this.#id=id;
        this.#dateNahafatesana=date;
        this.#nbMaty=nb;
        this.#idLot=idLot;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }


    get dateNahafatesana()
    {
        return this.#dateNahafatesana;
    }

    set dateNahafatesana(date){
        this.#dateNahafatesana=date;
    }

    get nbMaty(){
        return this.#nbMaty;
    }

    set nbMaty(nb){
        this.#nbMaty=nb;
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
            dateNahafatesana:this.#dateNahafatesana,
            nbMaty:this.#nbMaty,
            idLot:this.#idLot
        };
    }
}

export default AkohoMaty;