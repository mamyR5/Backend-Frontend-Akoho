INSERT INTO Genre(libelle) VALUES 
('Lahy'),('Vavy');

INSERT INTO Race(Nom,PUSakafo,PrixVente,PUAchat,PrixAtody,TempsIncubation,PondaisonMax,PourcentageLamokany,PourcentageGenreFohy,idGenreFohy,PourcentageGenreMaty,idGenreMaty,AgeSemPondaison,PUVenteVavy,PUVenteLahy) VALUES
('Borbonèze',5.00,15.00,500,500.00,30,40,0,55,2,0,2,0,15,20);

INSERT INTO EtatAtody(libelle) VALUES
('Fohy'),
('Lamokany'),
('Lafo');


INSERT INTO Lot(DateCreation,AgeSemaine,NbAkoho,idRace) VALUES
('01-01-2026',1,500,1);

INSERT INTO DetailLot(idLot,NbAkoho,PourcentageLot,idGenre) VALUES 
(1,500,100,2);

INSERT INTO AkohoMaty(DateNahafatesana,NbMaty,idLot) VALUES ('01-02-2026',15,1);


INSERT INTO Variation(idRace,AgeSemaine,VariationPoids,SakafoParSem)
VALUES
(1,0,50,0),
(1,1,20,75),
(1,2,25,80),
(1,3,30,100),
(1,4,40,150),
(1,5,80,170),
(1,6,85,190),
(1,7,100,200),
(1,8,100,250),
(1,9,90,270),
(1,10,140,290),
(1,11,200,300),
(1,12,220,370),
(1,13,265,390),
(1,14,285,350),
(1,15,300,300),
(1,16,350,450),
(1,17,400,500),
(1,18,420,400),
(1,19,430,500),
(1,20,500,500),
(1,21,530,650),
(1,22,600,600),
(1,23,400,750),
(1,24,100,750),
(1,25,0,600);

--MM-DD-YYYY
--INSERT INTO RecensementAtody(DateRecensement,NbAtody,idLot) VALUES
--('02-02-2026',100,1);

--INSERT INTO RecensementAtody(DateRecensement,NbAtody,idLot) VALUES
--('02-15-2026',150,1);

