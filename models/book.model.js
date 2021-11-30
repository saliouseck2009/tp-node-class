const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    isbn: {type: String, required: true },
    title:{type: String, required: true},
    subtitle:{type: String},
    author:{type: String, required: true},
    published:{type: Date},
    publisher:{type: String},
    pages:{type: Number},
    description:{type: String},
    website: {type:String},
    authors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
});

module.exports=mongoose.model("Book",bookSchema);