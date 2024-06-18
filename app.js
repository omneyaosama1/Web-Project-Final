const express = require('express');
const mongoose = require('mongoose');
const homePageRoute = require("./routes/index-route");
const aboutUsPageRoute = require('./routes/about-us-route');
const hiwRoute = require('./routes/how-it-works-route');
const ourPlansRoute = require('./routes/our-plans-route');
const sustainabilityRoute = require('./routes/sustainability-route');
const sourcingRoute = require('./routes/sourcing-route');
const menuRoute=require('./routes/menu-route');
const port = process.env.PORT ||3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));





app.set('view engine', 'ejs');

app.use('/', homePageRoute);
app.use('/about-us', aboutUsPageRoute)
app.use('/how-it-works', hiwRoute);
app.use('/our-plans', ourPlansRoute);
app.use('/sustainability', sustainabilityRoute);
app.use('/sourcing', sourcingRoute);
app.use('/menu',menuRoute);


// MongoDB Connection
// const dbURI = 'mongodb+srv://alaa:En7a9CT0Y6RZQQbB@freshbites.wagcbow.mongodb.net/?retryWrites=true&w=majority&appName=freshbites';
const dbURI ='mongodb+srv://alaawaledd:Aw827948@cluster0.vlovamp.mongodb.net/menu?retryWrites=true&w=majority&appName=cluster0';
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on ${port}/`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });