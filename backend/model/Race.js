class Race{
    #id;
    #nom;
    #puSakafo;
    #prixVente;
    #prixAtody;
    #puAchat;
    #tempsIncubation;
    #pondaisonMax;
    #pourcentageLamokany;
    #pourcentageGenre;
    #idGenre;

    constructor(id,nom,pu,pv,prixAtody,puAchat,temps,pondaison,pourcentageLamokany,pourcentageGenre,idGenre){
        this.#id=id;
        this.#nom=nom;
        this.#puSakafo=pu;
        this.#prixVente=pv;
        this.#prixAtody=prixAtody;
        this.#puAchat = puAchat;
        this.#tempsIncubation=temps;
        this.#pondaisonMax = pondaison;
        this.#pourcentageLamokany = pourcentageLamokany;
        this.#pourcentageGenre = pourcentageGenre;
        this.#idGenre = idGenre;
    }


    get id(){
        return this.#id;
    }

    set id(id){
        this.#id=id;
    }

    get nom(){
        return this.#nom;
    }

    set nom(nom){
        this.#nom=nom;
    }

    get puSakafo(){
        return this.#puSakafo;
    }

    set puSakafo(pu){
        this.#puSakafo=pu;
    }

    get prixVente(){
        return this.#prixVente;
    }

    set prixVente(prix){
        this.#prixVente=prix;
    }

    get prixAtody(){
        return this.#prixAtody;
    }

    set prixAtody(prix){
        this.#prixAtody = prix;
    }

    get puAchat(){
        return this.#puAchat;
    }

    set puAchat(pu){
        this.#puAchat = pu;
    }

    get tempsIncubation(){
        return this.#tempsIncubation;
    }

    set tempsIncubation(temps){
        this.#tempsIncubation=temps;
    }

    get pondaisonMax(){
        return this.#pondaisonMax;
    }

    set pondaisonMax(pondaison){
        this.#pondaisonMax = pondaison;
    }

    get pourcentageLamokany(){
        return this.#pourcentageLamokany;
    }

    set pourcentageLamokany(pourcentage)
    {
        this.#pourcentageLamokany = pourcentage;
    }

    get pourcentageGenre(){
        return this.#pourcentageGenre;
    }

    set pourcentageGenre(pourcentage){
        this.#pourcentageGenre = pourcentage;
    }

    toJSON(){
        return {
            id:this.#id,
            nom:this.#nom.trim(),
            puSakafo:this.#puSakafo,
            prixVente:this.#prixVente,
            prixAtody:this.#prixAtody,
            puAchat:this.#puAchat,
            tempsIncubation:this.#tempsIncubation,
            pondaisonMax:this.#pondaisonMax,
            pourcentageLamokany:this.#pourcentageLamokany,
            pourcentageGenre:this.#pourcentageGenre,
            idGenre:this.#idGenre
        };
    }

}

export default Race;