
const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 8080;

// SQL Server configuration
const config = {
  user: 'Gordon99',
  password: 'TJ2nJKXb2asmw9k',
  server: 'gws-dev.database.windows.net', 
  database: 'GWS_Adunze',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};
// Connect to SQL Server
sql.connect(config)
  .then(() => {
    console.log('Connected to SQL Server');
  })
  .catch((err) => {
    console.error('Error connecting to SQL Server:', err);
  });
// Example route for getting data xxx
app.get('/api/data', async (req, res) => {
  try {
    const result = await sql.query('SELECT TOP (1000) * FROM [SalesLT].[CustomerAddress]');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Fries Error');
  }
});
app.use(express.json()); // Middleware to parse JSON requests
// Example route for adding data (POST)
app.post('/api/messages', async (req, res) => {
  try {
    const {Message} = req.body;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('Message', sql.NVarChar, Message)
      .query('INSERT INTO [dbo].[Vancouver] ( Messages) VALUES ( @Message)');
    res.json(result);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Burger Error');
  }
});
// Add routes for other CRUD operations
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
