module.exports = app => {
    const moviesDB = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    //methods that we need to support
    //basic CRUD
    //Create - post a new entry into the database
    //Read - search by movie title and return all matching movies
    //Update - update any or all entries and specific rating update 
    //Delete - delete by title

    //3. When a request matches the path with a REST request, we pass to the controller
    router.post("/", moviesDB.create);

    router.get("/:title", moviesDB.searchTitle);

    router.get("/", moviesDB.getAll);

    router.put("/:id", moviesDB.update);

    router.post("/:id", moviesDB.rateMovie);

    router.delete("/:id", moviesDB.remove);

    //app.use mounts the middleware for all routes on the express app object at the specified path
    //all the router.post or router.get etc calls are executed when the requested path matches the
    //specified path
    app.use('/movies', router);
  };