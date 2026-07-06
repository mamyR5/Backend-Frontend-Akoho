import express from 'express';
import LotRoute from './route/LotRoute.js';
import EtatAtodyRoute from './route/EtatAtodyRoute.js';
import RecensementAtodyRoute from './route/RecensementAtodyRoute.js';
import AkohoMatyRoute from './route/AkohoMatyRoute.js';
import IncubationRoute from './route/IncubationRoute.js';
import RaceRoute from './route/RaceRoute.js';
import VariationRoute from './route/VariationRoute.js';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import dotenv from 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
const swaggerSpec = yaml.load(fs.readFileSync('./swagger.yml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/lot',LotRoute);
app.use('/api/etatAtody',EtatAtodyRoute);
app.use('/api/recensementAtody',RecensementAtodyRoute);
app.use('/api/akohoMaty',AkohoMatyRoute);
app.use('/api/incubation',IncubationRoute);
app.use('/api/race',RaceRoute);
app.use('/api/variation',VariationRoute);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Serveur démarré au port ${PORT}.`);
    console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
});