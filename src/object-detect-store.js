var firebaseApp = require('./firebase-config');
var database = firebaseApp.database;
var ObjectDetected = database.ref('/Objects')


const updateObjects = (id, name) => {
    var postData = {
        id: id,
        name: name,
    }
    var updates = {};
    updates['Detected/' + 'id/' + id] = postData;
    return ObjectDetected.update(updates);
}

module.exports = {
    updateObjects
}