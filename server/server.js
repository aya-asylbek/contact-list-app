import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());


app.get('/', (req, res) => {
    res.send('Contact list app');
});


//Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



