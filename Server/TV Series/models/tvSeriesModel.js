const { getDatabase } = require("../configs/mongo")
const { ObjectId } = require("mongodb");

const db = getDatabase()
const TvSeries = db.collection("TV Series")

class tvSeriesModel {
    static findAll(){
        return TvSeries.find({}).toArray();
    }

    static findOneTvSeries(tvId){
        return TvSeries.findOne({_id: ObjectId(tvId)});
    }

    static addTvSeries(newTvSeries){
        return TvSeries.insertOne(newTvSeries);
    }

    static updateTvSeries(tvId, data){
        console.log(data,"ini model");
        return TvSeries.updateOne({_id: ObjectId(tvId)}, { $set: data });
    }

    static deleteTvSeries(tvId){
        return TvSeries.deleteOne({_id: ObjectId(tvId)});
    }
}

module.exports = tvSeriesModel;