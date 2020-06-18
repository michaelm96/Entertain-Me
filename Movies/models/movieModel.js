const { getDatabase } = require("../configs/mongo")
const { ObjectId } = require("mongodb");
const db = getDatabase()
const Movie = db.collection("Movies")

class movieModel {
    static movieFindAll(){
        console.log("masuk sini");
        return Movie.find({}).toArray();
    }

    static findOneMovie(movieId){
        return Movie.findOne({_id: ObjectId(movieId)});
    }

    static addMovie(newMovie){
        return Movie.insertOne(newMovie);
    }

    static updateMovie(movieId, data){
        return Movie.updateOne({_id: ObjectId(movieId)}, { $set: data });
    }

    static deleteMovie(movieId){
        return Movie.deleteOne({_id: ObjectId(movieId)});
    }
}

module.exports = movieModel;