import sql from 'mssql';

const config = {
    user : 'Mamy',
    password : 'mamy',
    server : 'DESKTOP-I8UEE4O',
    database : 'Akoho',
    options: {
        encrypt: true, //amin'izay ireo données hifanakalozana amin'ny frontend dia 'illisible'
        //satria chiffrées 
        trustServerCertificate: true
        //Tsy manana certificat de sécurité officiel ny server ka noho izany dia
        //ny certificat auto-signé (fait maison) no ampiasaina , kanefa izy io dia tsy hinoan'ny NodeJS velively
        //noho izany dia trustServerCertificate = true , amin'izay considérer-na fa sécurisé ny connexion
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        //console.log("Mandeha tompoko ilay connection");
        return pool;
    } catch (err) {
        console.error('Erreur de connexion SQL', err);
        throw err;
    }
}

export { sql, getConnection };