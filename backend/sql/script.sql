CREATE TABLE EtatAtody(
   id INT IDENTITY,
   libelle VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);


CREATE TABLE Genre(
   id INT IDENTITY,
   libelle VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);


CREATE TABLE Race(
   id INT IDENTITY,
   Nom VARCHAR(50)  NOT NULL,
   PUSakafo DECIMAL(15,2)    NOT NULL,
   PrixVente DECIMAL(15,2)   NOT NULL,
   PrixAtody DECIMAL(15,2)   NOT NULL,
   PUAchat DECIMAL(15,2)   NOT NULL,
   TempsIncubation INT NOT NULL,
   PondaisonMax INT NOT NULL,
   PourcentageLamokany DECIMAL(15,2) NOT NULL,
   PourcentageGenreFohy DECIMAL(15,2) NOT NULL,
   idGenreFohy INT NOT NULL,
   PourcentageGenreMaty DECIMAL(15,2) NOT NULL,
   idGenreMaty INT NOT NULL,
   AgeSemPondaison INT NOT NULL,
   PUVenteVavy DECIMAL(15,2)   NOT NULL,
   PUVenteLahy DECIMAL(15,2)   NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(idGenreFohy) REFERENCES Genre(id),
   FOREIGN KEY(idGenreMaty) REFERENCES Genre(id)
);

CREATE TABLE Lot(
   id INT IDENTITY,
   DateCreation DATE NOT NULL,
   AgeSemaine INT,
   NbAkoho INT NOT NULL,
   idRace INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(idRace) REFERENCES Race(id)
);

CREATE TABLE DetailLot(
   id INT IDENTITY,
   idLot INT NOT NULL,
   NbAkoho INT NOT NULL,
   PourcentageLot DECIMAL(15,2) NOT NULL, 
   idGenre INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(idGenre) REFERENCES Genre(id),
   FOREIGN KEY(idLot) REFERENCES Lot(id)
);

CREATE TABLE IncubationLot(
   idLotMere INT,
   idLotFille INT,
   DateChange DATE NOT NULL,
   PRIMARY KEY(idLotMere, idLotFille),
   FOREIGN KEY(idLotMere) REFERENCES Lot(id),
   FOREIGN KEY(idLotFille) REFERENCES Lot(id)
);


CREATE TABLE Variation(
   id INT IDENTITY,
   AgeSemaine INT NOT NULL,
   VariationPoids DECIMAL(15,2)   NOT NULL,
   idRace INT NOT NULL,
   SakafoParSem DECIMAL(15,2)   NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(idRace) REFERENCES Race(id)
);

CREATE TABLE RecensementAtody(
   id INT IDENTITY,
   DateRecensement DATE NOT NULL,
   NbAtody INT NOT NULL,
   idLot INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(idLot) REFERENCES Lot(id)
);



CREATE TABLE Incubation(
   id INT IDENTITY,
   DateIncubation DATE NOT NULL,
   Nb INT NOT NULL,
   idEtatAtody INT NOT NULL,
   idLot INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(idEtatAtody) REFERENCES EtatAtody(id),
   FOREIGN KEY(idLot) REFERENCES Lot(id)
);

CREATE TABLE AkohoMaty(
   id INT IDENTITY,
   DateNahafatesana DATE NOT NULL,
   NbMaty INT NOT NULL,
   idLot INT NOT NULL,
   FOREIGN KEY(idLot) REFERENCES Lot(id),
   PRIMARY KEY(id)
);