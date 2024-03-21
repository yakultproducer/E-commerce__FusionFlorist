const express = require("express")
const app = express()
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');
const port = process.env.PORT || 3000;



const pool = new Pool({
    connectionString: process.env.DB_connectionString
});



// Set up Express to use EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', async (req, res) => {
    // Connect to database
    const client = await pool.connect();
    try {
        
        // Query the PostgreSQL items table to retrieve item data
        const queryResult = await client.query('SELECT * FROM items');
        const items = queryResult.rows;

        console.log(items);
        // Render the index.ejs template with the items data
        res.render('index', { items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        client.release(); // Release the client back to the pool
        console.log('Connection closed');
    }
    
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });