const express = require('express');
const sql = require('mssql');
const cors = require('cors')
const app = express();

app.use(cors)

// Middleware to parse JSON requests
app.use(express.json());

// Database configuration
const dbConfig = {
    user: 'ABELMWANGI\amg',
    password: 'AMG2021@',
    server: 'ABELMWANGI\SQLEXPRESS',
    database: 'Utibu',
    options: {
        encrypt: true // For Azure SQL Database
    }
};

app.get('/',(req,res) => {
    res.send('fda')
})

// Route to register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, firstName, lastName, phone, address } = req.body;

        // Validate user input (e.g., check if required fields are present)
        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: 'Please provide username, password, email, first name, and last name' });
        }

        // Check if the email is already registered
        const pool = await sql.connect(dbConfig);
        const existingUser = await pool
            .request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // Insert the new user into the database
        await pool
            .request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .input('email', sql.VarChar, email)
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('phone', sql.VarChar, phone || null) // Handle optional fields
            .input('address', sql.VarChar, address || null) // Handle optional fields
            .query('INSERT INTO Users (username, password, email, firstName, lastName, phone, address) VALUES (@username, @password, @email, @firstName, @lastName, @phone, @address)');
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Route to fetch users
app.get('/users', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch medication information
app.get('/medications', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Medications');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching medications:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to place an order
app.post('/orders', async (req, res) => {
    try {
        // Retrieve order details from request body
        const { userId, medicationId, quantity } = req.body;
        // Logic to process the order and insert into database
        res.json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch invoices
app.get('/invoices', async (req, res) => {
    try {
        // Logic to fetch invoices from database
        res.json({ message: 'Fetching invoices' });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle payments
app.post('/payments', async (req, res) => {
    try {
        // Retrieve payment details from request body
        const { invoiceId, amount } = req.body;
        // Logic to process payment and update invoice status
        res.json({ message: 'Payment successful' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
