const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);

fs.appendFile('server.log', log + '\n', (err)=> {
  if(err){
    console.log("Unable to append server");
  }
});

next(); //must call to let express know async call is done
});
// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
//
// });

app.use (express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/',(req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name:"Pikachu",
  //   type:"Electric",
  //   moves: [
  //     'QuickAttack',
  //     'Thunderbolt',
  //     'Thunder'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: "Welcome to this website!",

  });
});
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/projects', (req,res) => {
  
  res.render('projects.hbs', {
    pageTitle: 'Project Page',

  });
});

app.get('/bad',(req,res)=> {
  res.send({
    error: "Unable to fulfill request"
  });
});
app.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
