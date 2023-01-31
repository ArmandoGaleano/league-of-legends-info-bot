require('dotenv').config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';

/**
 * Cria o app
 */
export const app = express();

var staticPath = path.join(__dirname, '/src');
console.log(path.join(__dirname, '/src'));

/**
 * Configuração dos middlewares
 */
app.use(express.static(staticPath));
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
