import express from 'express';
// import axios from 'axios';
import lyricsRoutes from './routes/lyricsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/lyrics', lyricsRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
    console.log('Running on local: http://localhost:', PORT);
});
