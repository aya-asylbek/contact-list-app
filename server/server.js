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



// Get Single Contact with Details (Combined Data)
app.get('/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;

        if (!/^\d+$/.test(contactId)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // JOIN query combining both tables
        const query = `
            SELECT 
                c.id, c.name, c.email, c.phone, c.notes,
                cd.street, cd.city, cd.state, cd.zip_code, cd.profession
            FROM contacts c
            LEFT JOIN contact_details cd ON c.id = cd.contact_id
            WHERE c.id = $1
        `;

        const contact = await db.oneOrNone(query, [contactId]);

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
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


//adding  a new contact through form , make sure there should be no slash \after word contacts!
app.post('/contacts', async (req, res) => {
    const { 
      name, 
      email, 
      phone, 
      notes,
      street, 
      city, 
      state, 
      zip_code, 
      profession 
    } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
  
    try {
      // Use a transaction to ensure both inserts succeed or fail together
      const newContact = await db.tx(async t => {
        // 1. Insert into contacts
        const contact = await t.one(
          'INSERT INTO contacts (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING id',
          [name, email, phone, notes]
        );
  
        // 2. Insert into contact_details
        await t.none(
          `INSERT INTO contact_details 
            (contact_id, street, city, state, zip_code, profession) 
            VALUES ($1, $2, $3, $4, $5, $6)`,
          [contact.id, street, city, state, zip_code, profession]
        );
  
        return contact.id;
      });
  
      // Fetch the full contact with details to return 1 st table+2nd table
      const fullContact = await db.one(`
        SELECT c.*, cd.street, cd.city, cd.state, cd.zip_code, cd.profession 
        FROM contacts c
        LEFT JOIN contact_details cd ON c.id = cd.contact_id
        WHERE c.id = $1
      `, [newContact]);
  
      res.status(201).json(fullContact);
    } catch (err) {
      console.error('Error adding contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Update a contact (make changes)
app.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, notes, street, city, state, zip_code, profession } = req.body;
  
    try {
      // Обновление основной информации
      const updatedContact = await db.one(
        'UPDATE contacts SET name=$1, email=$2, phone=$3, notes=$4 WHERE id=$5 RETURNING *',
        [name, email, phone, notes, id]
      );
    //   console.log('Updated contact:', updatedContact);
      // Обновление деталей
      await db.none(
        `UPDATE contact_details 
         SET street=$1, city=$2, state=$3, zip_code=$4, profession=$5 
         WHERE contact_id=$6`,
        [street, city, state, zip_code, profession, id]
      );
      console.log('Updated contact details:', { street, city, state, zip_code, profession });//debug
      // Получение объединенных данных
      const fullContact = await db.one(`
        SELECT c.*, cd.street, cd.city, cd.state, cd.zip_code, cd.profession 
        FROM contacts c
        LEFT JOIN contact_details cd ON c.id = cd.contact_id
        WHERE c.id = $1
      `, [id]);
  
      res.json(fullContact);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });









// app.put('/contacts/:id', async (req, res) => {
//     const { name, email, phone, notes } = req.body;
//     try {
//         const updatedContact = await db.oneOrNone(
//             'UPDATE contacts SET name=$2, email=$3, phone=$4, notes=$5 WHERE id=$1 RETURNING *',
//             [req.params.id, name, email, phone, notes]
//         );
//         if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
//         res.json(updatedContact);
//     } catch (err) {
//         console.error('Error updating contact:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        const result = await db.result('DELETE FROM contacts WHERE id = $1', [req.params.id]);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Contact not found' });
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



