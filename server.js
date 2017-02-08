const express = require("express");
const fs      = require("fs");

var hbs = require("hbs");
var app = express();


// Middleware to log activity on website
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + ` \n`, (error) => {
     if (error) {
       console.log("Unable to append to: server.log !");
     }
  });
  next();
});

// Middleware to lock website on MAINTENANCE PAGE
      // app.use((req, res,next) => {
      //   res.render("maintenance", {
      //     pageTitle: "Maintenance Page",
      //   welcomeMsg1: "We will be back SOON!!",
      //   welcomeMsg2: "This site is currently under development!!"
      //   });
      // });

// Middleware to serve STATIC files
app.use(express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear",() => {
  return new Date().getFullYear()
});



hbs.registerHelper("screamIt",(text) => {
  return text.toUpperCase()
})


app.get("/", (req , res) => {
   res.render("home", {
       pageTitle: "Home Page",
     welcomeMsg1: "Hola bienvenido a mi pagina",
     welcomeMsg2: "Aqui vas a encontrar lo que estoy aprendiendo ahora!!"
   })
});

app.get("/about",(req, res) => {
  res.render("about", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
       errorMessage: "Invalid request, please try again!!"
  });
});


app.listen(3000, () => {
  console.log("Server has staerted on port 3000!!");
});
