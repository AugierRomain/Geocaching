
const express = require("express");
const app = express();
/*  utilisation de la bibliothèque crypto pour générer un */      
const crypto = require('crypto');
const cors = require('cors');

/*  utilisation de la bibliothèque jsonwebtoken  pour générer un token */ 
const jwt = require('jsonwebtoken');

/**  Fonction pour générer un clé sécrète pour               * */
function generateToken(length) {
  return crypto.randomBytes(length).toString('hex');
}


// Générer un token aléatoire
const randomToken = generateToken(16) ;

// Créer un token JWT
//const token = jwt.sign({ token: "ali"}, randomToken,{ expiresIn: '1h' });

//console.log(token); // Affiche le token généré

// vérification du token
/*jwt.verify(token, randomToken, (err, decoded) => {
  if (err) {
    // le token est invalide
    console.log('Token invalide');
  } else {
    // le token est valide
    console.log('Token valide');
    console.log("token",decoded.token); // { username: 'alice', iat: 1652274691, exp: 1652278291 }
  }
});*/

//////////

const bodyParser = require("body-parser");
// Content-type: application/json
app.use(bodyParser.json());
// Content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); // Active CORS pour toutes les routes

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const collection_inscription="inscription";
const database_pg209="db_pg209";

// création de la base d'inscription

const url = 'mongodb://0.0.0.0:27017';
MongoClient.connect(url).
    then(function(client) {
  //if (err) throw err;
 // if (err) console.log(err);
  //return client.db("db_PG209").collection("inscription");
  return client.db(database_pg209).collection(collection_inscription);
  //return client.db("products_manager").collection("products");
  //console.log(client);
  
}).
then(   (products) =>{
    //console.log(products);

   /* reception des information d'inscription*/
      app.post('/inscription', (req, res) => {
        const name = req.body.user_name;
        const email = req.body.user_email;
        // Faites quelque chose avec les données récupérées
       

        products.findOne({ email: email }).
        then((result)=>{
          console.log(result);
          if (result) {
            console.log('Le champ "email" existe déjà dans la collection "inscription".');
            res.send({message:`Vous avez saisi: ${name} et ${email}, mais ce mail existe déjà `});
          } else {
            //console.log('Le champ "email" n\'existe pas encore dans la collection "users".');
            res.send(`Vous avez saisi: ${name} et ${email}. `);
            products.insertOne({nom: name , email: email}).
            then((result) => {
              if(result) console.log(" values inserted in the db")
            })
          }
        })
         
        });

        /* reception des information de connexion*/

        app.post('/connexion', (req, res) => {
          const name = req.body.user_name;
          const email = req.body.user_email;
          // Faites quelque chose avec les données récupérées
         
  
          products.findOne({ email: email, nom: name }).
          then((result)=>{
            const token = jwt.sign({ token: {user_name,user_email}}, randomToken,{ expiresIn: '1h' });
            console.log(result);
            if (result) {
              console.log(' Vous avez reussi à vous connecter');
              res.send({message:`Vous avez reussi à vous connecter `});
            } else {
              //console.log('Le champ "email" n\'existe pas encore dans la collection "users".');
              res.send({message:`Un des champs saisis est incorrect `, token });
              //products.insertOne({nom: name , email: email}).
             
            }
          })
           
          });
  


      });



app.listen(3000, () => {
      console.log("En attente de requêtes...");
})