const Book = require('../models/book.model')

exports.getOneBook=(req,res,next)=>{
    Book.findOne({_id: req.params.id})
    .then(book=> res.status(200).json(book))
    .catch(error=>res.status(400).json({error}));
};

exports.getAllbook = (req, res, next)=>{
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
};

exports.addBook = (req,res,next)=>{
    console.log(req.body);
    const book = new Book({...req.body});
    book.save()
    .then(()=> res.status(200).json({message: "livre ajouté avec succés "}))
    .catch(error=>res.status(401).json({error}));
};

exports.deleteBook = (req, res, next)=>{
    Book.deleteOne({_id:req.params.id})
        .then(()=> res.status(200).json({message: 'objet supprimé'}))
        .catch((erreur)=>res.status(400).json({erreur}))
};

exports.editBook = (req,res,next)=>{
    Book.updateOne({_id: req.params.id},{...req.body,_id:req.params.id})
    .then(()=> res.status(200).json({message: "objet modifié "}))
    .catch(error=>res.status(400).json({error}));
}

exports.addAuthorToBook = (bookId, author)=>{
    return Book.findByIdAndUpdate(
        bookId,
        {$push: {authors: author._id}},
        {new : true, useFindAndModify:false}
    );
};