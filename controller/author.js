const Author = require('../models/author.model')


exports.getOneAuthor=(req,res,next)=>{
    Author.findOne({_id: req.params.id})
    .then(author=> res.status(200).json(author))
    .catch(error=>res.status(400).json({error}));
};

exports.getAllAuthor = (req, res, next)=>{
    Author.find()
    .then(authors => res.status(200).json(authors))
    .catch(error => res.status(400).json({error}));
};

exports.addAuthor = (req,res,next)=>{
    console.log(req.body);
    const author = new Author({...req.body});
    author.save()
    .then(()=> res.status(200).json({message: "livre ajouté avec succés "}))
    .catch(error=>res.status(401).json({error}));
};

exports.deleteAuthor = (req, res, next)=>{
    Author.deleteOne({_id:req.params.id})
        .then(()=> res.status(200).json({message: 'objet supprimé'}))
        .catch((erreur)=>res.status(400).json({erreur}))
};

exports.editAuthor = (req,res,next)=>{
    Author.updateOne({_id: req.params.id},{...req.body,_id:req.params.id})
    .then(()=> res.status(200).json({message: "objet modifié "}))
    .catch(error=>res.status(400).json({error}));
}

exports.addBookToAuthor = (authorId, book)=>{
    return Author.findByIdAndUpdate(
        authorId,
        {$push: {books: book._id}},
        {new : true, useFindAndModify:false}
    );
};