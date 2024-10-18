const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const CoinPayments = require('coinpayments');
const config = require('./config');

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: config.postgresUri,
});

// Configuración de CoinPayments
const client = new CoinPayments({
  key: config.coinPaymentsKey,
  secret: config.coinPaymentsSecret
});

app.get('/', (req, res) => {
  res.send(`Bienvenido a ${config.websiteName} de ${config.companyName}`);
});

app.post('/pago', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const transaction = await client.createTransaction({ currency1: 'USD', currency2: currency, amount, address: 'TU_DIRECCION_DE_CUENTA' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ejemplo de endpoint que usa PostgreSQL
app.get('/productos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});