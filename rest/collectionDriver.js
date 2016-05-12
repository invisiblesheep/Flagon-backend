var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function(db) {
    this.db = db;
};

CollectionDriver.prototype.getCollection = function(collectionName, callback){
    this.db.collection(collectionName, function(err, the_collection) {
        if (err) callback(err);
        else callback(null, the_collection);
    });
};

CollectionDriver.prototype.findAll = function(collectionName, callback){
    this.getCollection(collectionName, function(err, the_collection) {
        if(err) callback(err);
        else {
            the_collection.find().toArray(function(err, res){
                if(err) callback(err);
                else callback(null, res);
            });
        }
    });
};

CollectionDriver.prototype.get = function(collectionName, callback){
    this.getCollection(collectionName, function(err, the_collection){
        if(err) callback(err);
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if(!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id' :ObjectID(id)}, function(err, doc){
               if(err) callback(err);
               else callback(null, doc); 
            });
        }
    });
};

exports.CollectionDriver = CollectionDriver;