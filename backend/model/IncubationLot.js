class IncubationLot{

    #idLotMere;
    #idLotFille;
    #dateChange;

    constructor(idMere,idFille,date){
        this.#idLotMere=idMere;
        this.#idLotFille=idFille;
        this.#dateChange=date;
    }

    get idLotMere(){
        return this.#idLotMere;
    }

    set idLotMere(id){
        this.idLotMere=id;
    }

    get idLotFille(){
        return this.#idLotFille;
    }

    set idLotFille(id){
        this.#idLotFille = id;
    }

    get dateChange()
    {
        return this.#dateChange;
    }

    set dateChange(date){
        this.#dateChange=date;
    }

    toJSON()
    {
        return {
            idLotMere:this.#idLotMere,
            idLotFille:this.#idLotFille,
            dateChange:this.dateChange
        };
    }
}

export default IncubationLot;