const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {connectDB} = require('./db.js');
const authRoutes = require('./routes/auth.routes.js');

app.use(express.json()); //per poder llegir el body de les peticions
app.use(morgan('dev')); //anar imprimint els resultats
app.use(cors({
    origin: 'http://localhost:3000', //frontend
    credentials: true,
})); // Enable CORS for all routes
app.use(cookieParser()); //per poder llegir les cookies

app.use('/api', authRoutes);

connectDB();

app.listen(5000, () => console.log("server started on port 5000"));

