import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import db from "./db.js";
config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(json());


app.get('/', (req, res) => {
    res.send('Server is working!');
});

//Getting all contacts 
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await db.any('SELECT * FROM contacts');
        //console.log("Contacts fetched successfully:", contacts);
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Get only bi id 
app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await db.oneOrNone('SELECT * FROM contacts WHERE id = $1', [req.params.id]);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//adding  a new contact through form
app.post('/contacts', async (req, res) => {
    const { name, email, phone, notes } = req.body;

    // Checkin for required fielsds - name and email 
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        // Insert the new contact into the database
        const newContact = await db.one(
            'INSERT INTO contacts (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, phone, notes]
        );
        res.status(201).json(newContact);
    } catch (err) {
        //error handling
        console.error('Error adding contact:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a contact (make changes)
app.put('/contacts/:id', async (req, res) => {
    const { name, email, phone, notes } = req.body;
    try {
        const updatedContact = await db.oneOrNone(
            'UPDATE contacts SET name=$2, email=$3, phone=$4, notes=$5 WHERE id=$1 RETURNING *',
            [req.params.id, name, email, phone, notes]
        );
        if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
        res.json(updatedContact);
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});











//Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



