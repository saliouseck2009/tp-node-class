const mongoose = require("mongoose");

class MongooseService {
    static connectToDB(){
        mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+'/'+process.env.DB+'?retryWrites=true&w=majority',
       // mongoose.connect('mongodb+srv://tdsi:toor@tpclassdb.tynsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        { useNewUrlParser: true,
        useUnifiedTopology: true })
            .then(() => console.log('Connexion à MongoDB réussie !'))
            .catch(() => console.log('Connexion à MongoDB échouée !'));
};

}

module.exports={MongooseService};