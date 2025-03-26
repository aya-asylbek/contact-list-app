import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import db from "./db.js";
config();

const app = express();
const PORT = process.env.PORT;

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
  

//Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



