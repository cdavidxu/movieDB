const moviesDB = require("../models/moviesDB.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    moviesDB.create(new moviesDB(req.body), (err, data) => {
        if(err){
            res.status(500).send({
                message: "Error"
            });
        } else{
            res.send(data);
        }
    });
};

exports.searchTitle = (req, res) => {
    moviesDB.searchTitle(req.params.title, (err, data) => {
        if(err) {
            if(err.kind === "does_not_exist") {
                res.status(404).send({message: "No movies found with this title"});
            } else{
                res.status(500).send({message: "Error"});
            }
        } else{
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    moviesDB.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: "Error"
            });
        } else{
            res.send(data)
        }
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }
    moviesDB.update(req.params.id, new moviesDB(req.body), (err, data) => {
        if(err){
            if(err.kind === "does_not_exist") {
                res.status(404).send({
                    message: "No such movie exists"
                });
            } else {
                res.status(500).send({
                    message: "Error updating movie with id " + req.params.id
                });
            }
        } else{
            res.send(data);
        }
    });
};

exports.rateMovie = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }
    moviesDB.rateMovie(req.params.id, req.body.column, (err, data) => {
        if(err){
            if(err.kind === "does_not_exist") {
                res.status(404).send({
                    message: "No such movie exists"
                });
            } else {
                res.status(500).send({
                    message: "Error updating movie with id " + req.params.id
                });
            }
        } else{
            res.send(data);
        }
    });
};

exports.remove = (req, res) => {
    moviesDB.remove(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === "does_not_exist") {
                res.status(404).send({
                    message: `No movie found with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete movie with id " + req.params.id
                });
            }
        } else{
            res.send({
                message: "Deleted movie with id " + req.params.id
            });
        }
    });
};

exports.removeAll = (req, res) => {
    moviesDB.removeAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: "Could not remove all movies"
            });
        } else {
            res.send({
                message: "Successfully removed all movies"
            });
        }
    });
};