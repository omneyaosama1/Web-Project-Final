const express = require('express');
const mongoose = require('mongoose')

const homePageRoute = require("./routes/index-route");
const aboutUsPageRoute = require('./routes/about-us-route');
const cookbookRoute = require("./routes/cookbook-route");
const hiwRoute = require('./routes/how-it-works-route');
const ourPlansRoute = require('./routes/our-plans-route');
const sustainabilityRoute = require('./routes/sustainability-route');
const sourcingRoute = require('./routes/sourcing-route');
const loginSignupRoute = require('./routes/login-signup-route');
const userRoute = require('./routes/user-route');
const adminRoute = require('./routes/admin-route');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.set("view engine", "ejs");

app.use('/', homePageRoute);
app.use('/about-us', aboutUsPageRoute)
app.use('/how-it-works', hiwRoute);
app.use('/our-plans', ourPlansRoute);
app.use('/sustainability', sustainabilityRoute);
app.use('/sourcing', sourcingRoute);
app.use('/login-signup', loginSignupRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

mongoose
  .connect(
    "mongodb+srv://omneya:Sys7MEKG0CDnuSYB@cookbook.zf4ymqm.mongodb.net/WebProject?retryWrites=true&w=majority&appName=Cookbook"
  )
  .then(() => {
    console.log("Connected to database successfully!");
    app.listen(port, () => console.log(`Sever is running on port ${port}`));
  })
  .catch((error) => {
    console.log("Failed to connect to the database!");
    console.error(error);
  });

app.use("/", homePageRoute);
app.use("/about-us", aboutUsPageRoute);
app.use("/how-it-works", hiwRoute);
app.use("/our-plans", ourPlansRoute);
app.use("/sustainability", sustainabilityRoute);
app.use("/sourcing", sourcingRoute);
app.use("/cookbook", cookbookRoute);
