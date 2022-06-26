const sql = require("./db.js");

const MoviesDB = function(movie){
    this.title = movie.title;
    this.description = movie.description;
    this.releaseYear = movie.releaseYear;
    this.duration = movie.duration;
    this.rating = 0;
    this.zeroStar = 0;
    this.oneStar = 0;
    this.twoStar = 0;
    this.threeStar = 0;
    this.fourStar = 0;
    this.fiveStar = 0;
};

//6. result is a function passed by the controller that takes in error and data objects
MoviesDB.create = (newMovie, result) => {
    sql.query("INSERT INTO Movies SET ?", newMovie, (err, res) => {
        if(err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        console.log("added movie: ", {id: res.insertId, ...newMovie });
        //refer to the controller for result method
        result(null, {id: res.insertId, ...newMovie });
    });
};

MoviesDB.searchTitle = (title, result) => {
    sql.query(`SELECT * FROM Movies WHERE title LIKE '%${title}%'`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else if(res.length){
            console.log("Found movie(s): ", res);
            result(null, res);
        } else{
            console.log("No movies found with this title");
            result({kind: "does_not_exist"}, null);
        }
    });
};

MoviesDB.getAll = result => {
    sql.query("SELECT * FROM Movies", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("All movies: ", res);
        result(null, res);
    });
};

MoviesDB.update = (id, newMovie, result) => {
    sql.query("UPDATE Movies SET title = ?, description = ?, releaseYear = ?, duration = ? WHERE idMovies = ?",
    [newMovie.title, 
     newMovie.description, 
     newMovie.releaseYear, 
     newMovie.duration, 
     id],
    (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else if(res.affectedRows == 0) {
            result({kind: "does_not_exist" }, null);
            return;
        } else {
            console.log("updated movie: ", { idMovies: id, title: newMovie.title, description: newMovie.description, releaseYear: newMovie.releaseYear, duration: newMovie.duration });
            result(null, { idMovies: id, title: newMovie.title, description: newMovie.description, releaseYear: newMovie.releaseYear, duration: newMovie.duration });
        }
    });
};

//SELECT zeroStar, oneStar, twoStar, threeStar, fourStar, fiveStar FROM ensembleSample.Movies WHERE idMovies = id

//rating object is 
//{
    //column: star column name
    //

MoviesDB.rateMovie = (id, starColumn, result) => {
    sql.query(`SELECT zeroStar, oneStar, twoStar, threeStar, fourStar, fiveStar FROM Movies WHERE idMovies = ${id}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else if(res.length){
            let ratings = Object.entries(res[0]);
            let sum = 0;
            let total = 0;
            for(let i = 0; i < ratings.length; i++){
                if(starColumn === ratings[i][0]){
                    sum += i;
                    total += 1;
                }
                sum += i * ratings[i][1];
                total += ratings[i][1];
            }
            let overallRating = Math.round(sum/total);
            sql.query(`UPDATE Movies SET rating = ${overallRating}, ${starColumn} = ${starColumn} + 1 WHERE idMovies = ${id}`,
            (err, res) => {
                if(err){
                    console.log("Error: ", err)
                    result(null, err)
                    return;
                }
                console.log("new Rating: ", {idMovies: id, rating: overallRating})
                result(null, {idMovies: id, rating: overallRating})
            });
            // console.log(ratings[0])
            // result(null, res);
        } else{
            console.log("No movies found");
            result({kind: "does_not_exist"}, null);
        }
    });
};

MoviesDB.remove = (id, result) => {
    sql.query(`DELETE FROM Movies WHERE idMovies = ${id}`, (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        } else if(res.affectedRows === 0){
            console.log("No movies found")
            result({ kind: "does_not_exist"}, null);
            return;
        } else{
            console.log("deleted movie entry with id: ", id);
            result(null, id);
        }
    });
};


module.exports = MoviesDB;