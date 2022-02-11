//importing controller
const AuthorController = require('../controllers/author.controllers');
// console.log(JokeController);

module.exports = app => {
    app.get('/api/hello', (request, response) => {
        response.json({message: "hello"})
    })
    app.get('/api/authors', AuthorController.findAllAuthors);
    app.get('/api/authors/:id', AuthorController.findOneSingleAuthor);
    app.put('/api/authors/update/:id', AuthorController.updateExistingAuthor);
    app.post('/api/authors/new', AuthorController.createNewAuthor);
    app.delete('/api/authors/delete/:id', AuthorController.deleteAnExistingAuthor);
}