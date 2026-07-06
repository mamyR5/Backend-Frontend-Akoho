class Genre{
    #id;
    #libelle;

    constructor(id,libelle){
        this.#id = id;
        this.#libelle=libelle;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get libelle(){
        return this.#libelle; 
    }

    set libelle(lib){
        this.#libelle=lib;
    }

    toJSON(){
        return {
            id:this.#id,
            libelle:this.#libelle
        };
    }
}

export default Genre;