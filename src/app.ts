require('dotenv').config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';

/**
 * Cria o app
 */
export const app = express();

/**
 * Configuração dos middlewares
 */
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
