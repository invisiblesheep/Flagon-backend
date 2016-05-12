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
    console.log('findAll in CollectionDriver from collection ' + collectionName);
    this.getCollection(collectionName, function(err, the_collection) {
      console.log('this.getCollection in findAll');
        if(err) callback(err);
        else {
            the_collection.find().toArray(function(err, res){
                if(err) callback(err);
                else callback(null, res);
            });
        }
    });
};

CollectionDriver.prototype.get = function(collectionName, id, callback){
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

CollectionDriver.prototype.save = function(collectionName, obj, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
      if( error ) callback(error)
      else {
        obj.created_at = new Date();
        the_collection.insert(obj, function() {
          callback(null, obj);
        });
      }
    });
};

CollectionDriver.prototype.update = function(collectionName, obj, entityId, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            obj._id = ObjectID(entityId);
            obj.updated_at = new Date();
            the_collection.save(obj, function(error,doc) {
                if (error) callback(error);
                else callback(null, obj);
            });
        }
    });
};

CollectionDriver.prototype.delete = function(collectionName, entityId, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            the_collection.remove({'_id':ObjectID(entityId)}, function(error,doc) {
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

exports.CollectionDriver = CollectionDriver;
