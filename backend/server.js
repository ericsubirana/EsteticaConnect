const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev')); //anar imprimint els resultats
app.use(cors()); // Enable CORS for all routes

app.get("/api", (req, res) => {
    res.json({"users":["user1", "user2"]})
});

app.listen(5000, () => console.log("server started on port 5000"));

