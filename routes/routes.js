module.exports = app => {
    const moviesDB = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    router.post("/", moviesDB.create);

    router.get("/:title", moviesDB.searchTitle);

    router.get("/", moviesDB.getAll);

    router.put("/:id", moviesDB.update);

    router.post("/:id", moviesDB.rateMovie);

    router.delete("/:id", moviesDB.remove);

    router.delete("/", moviesDB.removeAll);

    app.use('/movies', router);
  };