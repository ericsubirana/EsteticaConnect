const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const {connectDB} = require('./db.js');
const authRoutes = require('./routes/auth.routes.js');

app.use(express.json()); //per poder llegir el body de les peticions
app.use(morgan('dev')); //anar imprimint els resultats
app.use(cors()); // Enable CORS for all routes

app.use('/api', authRoutes);

app.get("/api", (req, res) => {
    res.json({"users":["user1", "user2"]})
});

connectDB();

app.listen(5000, () => console.log("server started on port 5000"));

