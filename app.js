require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
var mongoose = require("mongoose");
const Book = require("./models/book.model");

const {MongooseService}=require('./services/mongoose.service');

const app = express();
// Log requests to the console.
app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(__dirname + process.env.LOG_PATH+'backoffice.log', {flags: 'a'})
app.use(logger('combined',  {"stream": accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let corsOptions = {
  origin: '*'
};

if (process.env.ACTIVATE_CORS === 'true') {
  let whitelist = ['http://localhost:4200'];

  corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
}

app.use(cors(corsOptions));

//CONNEXION A LA BASE DE DONNES
MongooseService.connectToDB();

require('./routes')(app);

// app.get('*', (req, res) =>
//   res.status(200).send({
//     message: 'Genealogy created by ouz... :( :)',
//   }),
// );

app.post('/api/book',(req,res,next)=>{
  console.log(req.body);
  const book = new Book({...req.body});
  book.save()
    .then(()=> res.status(200).json({message: "livre ajouté avec succés "}))
    .catch(error=>res.status(401).json({error}));
});

app.get('/api/book',(req, res, next)=>{
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
});

app.get('/api/book/:id',(req,res,next)=>{
  Book.findOne({_id: req.params.id})
  .then(book=> res.status(200).json(book))
  .catch(error=>res.status(400).json({error}));
})

app.put('/api/book/:id',(req,res,next)=>{
  Book.updateOne({_id: req.params.id},{...req.body,_id:req.params.id})
  .then(()=> res.status(200).json({message: "objet modifié "}))
  .catch(error=>res.status(400).json({error}));
})

app.delete('/api/book/:id',(req, res, next)=>{
  Book.deleteOne({_id:req.params.id})
      .then(()=> res.status(200).json({message: 'objet supprimé'}))
      .catch((erreur)=>res.status(400).json({erreur}))
})



module.exports = app;
