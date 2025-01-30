const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db.js');



const authRoutes = require('./routes/auth.routes.js');
const productsRoutes = require('./routes/products.routes.js');
const cartRoutes = require('./routes/cart.routes.js');
const serviceRoutes = require('./routes/service.routes.js');
const calendarRoutes = require('./routes/calendar.routes.js');
const linksRoutes = require('./routes/links.routes.js');
const productsCatColRoures = require('./routes/productsCatCol.routes.js');

const { whatsapp } = require('./libs/whatsapp.js');

const initializeApp = async () => {
  
  await whatsapp.initialize();

  app.use(express.static('public')); //per poder entrar en la carpeta de les imatges
  app.use(express.json()); //per poder llegir el body de les peticions
  app.use(express.urlencoded({ limit: "25mb" }));
  app.use(morgan('dev')); //anar imprimint els resultats
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(cors({
    origin: 'https://ce-fina.es', //frontend https://ce-fina.es  http://localhost:3000
    credentials: true,
  })); // Enable CORS for all routes
  app.use(cookieParser()); //per poder llegir les cookies

  app.use(express.static('public')) //per poder entrar en la carpeta de les imatges

  app.use('/api', authRoutes);
  app.use('/api', productsRoutes);
  app.use('/api', cartRoutes);
  app.use('/api', serviceRoutes);
  app.use('/api', calendarRoutes);
  app.use('/api', linksRoutes);
  app.use('/api', productsCatColRoures);

  connectDB();

  app.listen(5000, () => console.log("server started on port 5000"));
}


initializeApp();

