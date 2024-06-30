const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session');
require("dotenv").config();

const homePageRoute = require("./routes/index-route");
const aboutUsPageRoute = require('./routes/about-us-route');
const cookbookRoute = require('./routes/cookbook-route');
const hiwRoute = require('./routes/how-it-works-route');
const ourPlansRoute = require('./routes/our-plans-route');
const sustainabilityRoute = require('./routes/sustainability-route');
const sourcingRoute = require('./routes/sourcing-route');
const loginSignupRoute = require('./routes/login-signup-route');
const userRoute = require('./routes/user-route');
const dashboardRoute = require('./routes/dashboard-route');
const orderRoute = require("./routes/order-route");
const usersAdminRoute = require('./routes/usersAdmin-route');
const productsRoute = require('./routes/products-route');
const analyticsRoute = require('./routes/analytics-route');
const profileRoute = require('./routes/profile-route');
const menuRoute = require('./routes/menu-route');
const feedbackRoute = require('./routes/feedback-route');


const port = process.env.PORT || 8000;
const dbUserName = process.env.dbUserName;
const dbPassword = process.env.dbPassword;

const dbURL = `mongodb+srv://${dbUserName}:${dbPassword}@freshbites.wagcbow.mongodb.net/FreshBites-Test?retryWrites=true&w=majority&appName=freshbites`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3 * 60 * 60 * 1000 }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', homePageRoute);
app.use('/about-us', aboutUsPageRoute);
app.use('/how-it-works', hiwRoute);
app.use('/our-plans', ourPlansRoute);
app.use('/sustainability', sustainabilityRoute);
app.use('/sourcing', sourcingRoute);
app.use('/login-signup', loginSignupRoute);
app.use('/user', userRoute);
app.use('/dashboard', dashboardRoute);
app.use('/cookbook', cookbookRoute);
app.use('/menu',menuRoute);
app.use("/order", orderRoute);
app.use('/usersAdmin', usersAdminRoute);
app.use('/products', productsRoute);
app.use('/analytics',analyticsRoute);
app.use('/profile',profileRoute);
app.use('/feedback',feedbackRoute);

mongoose
    .connect(dbURL)
    .then(() => {
        console.log('Connected to database successfully!');
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch((error) => {
        console.log('Failed to connect to the database!');
        console.error(error);
    });