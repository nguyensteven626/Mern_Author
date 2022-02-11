//CRUD

//our controller is importing the Model
const Author = require('../models/author.models');


module.exports = {
    //READ ALL
    findAllAuthors: (request, response) => {
        Author.find() //these are promises which gets resolve either by .then or .catch
            //IMPORTANT what we return here is what we receive in REACT!
            // .then(allDaProducts => response.json(allDaProducts)) 
            .then(allDaAuthors => response.json({ authors: allDaAuthors, message: "success" })) //putting it in an object
            .catch(error => response.json({ message: 'Something went wrong', error: error }));
    },
    //READ ONE
    findOneSingleAuthor: (request, response) => {
        // Joke.findOne({ _id: request.params.id })
        //or
        Author.findById(request.params.id)
            // .then(oneSingleProduct => response.json(oneSingleProduct))
            .then(oneSingleAuthor => response.json({ author: oneSingleAuthor }))
            .catch(error => response.json({ message: 'Something went wrong', error: error }));
    },
    //CREATE
    createNewAuthor: (request, response) => {
        console.log(request.body) //check what objects are in the body
        const { setup } = request.body;
        Author.create(request.body)//data from the form
            //or
            // Joke.create({setup: setup, punchline: request.body.punchline})
            .then(newlyCreatedAuthor => response.json({ author: newlyCreatedAuthor }))
            .catch(error => {
                console.log("SERVER ERROORRR")
                response.status(400).json({ message: 'Something went wrong', error: error })
            });
    },
    //UPDATE
    updateExistingAuthor: (request, response) => {
        // /api/jokes/:id
        Author.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true, runValidators: true }
        )
            .then(updatedAuthor => response.json({ author: updatedAuthor }))
            // .catch(error => response.json({ message: 'Something went wrong', error: error }));
            .catch(error => {
                console.log("SERVER ERROORRR")
                response.status(400).json({ message: 'Something went wrong', error: error })
            });

        //or

        // Joke.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        //     .then(updatedJoke => response.json({ user: updatedJoke }))
        //     .catch(err => response.json({ message: 'Something went wrong', error: err }));
    },
    //DELETE
    deleteAnExistingAuthor: (request, response) => {
        // /api/jokes/:id
        const {id} = request.params
        Author.deleteOne({ _id: request.params.id })
            .then(result => response.json({ result: result }))
            .catch(err => response.json({ message: 'Something went wrong', error: err }));
        //or

        // Joke.findByIdAndDelete(request.params.id)
        //     .then(result => response.json({ result: result }))
        //     .catch(err => response.json({ message: 'Something went wrong', error: err }));
    }
}