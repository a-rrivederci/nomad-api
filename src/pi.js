const firebaseApp = require('./firebase-config')
const database = firebaseApp.database;
const piMove = database.ref('/PiMove');

// Data object
const postData = {
    up: false,
    down: false,
    left: false,
    right: false,
};
const updates = {};

// Movement consts
const movementRef = piMove.child('Movement/');

function initialSet() {
    return movementRef.update(postData);
}

function moveUp() {
    var postData = {
        down: false,
        left: false,
        right: false,
        up: true
    }
    return postData;
}

function moveDown() {
    var postData = {
        down: true,
        left: false,
        right: false,
        up: false
    }
    return postData;
}

function moveLeft() {
    var postData = {
        down: false,
        left: true,
        right: false,
        up: false
    }
    return postData;
}

function moveRight() {
    var postData = {
        down: false,
        left: false,
        right: true,
        up: false
    }
    return postData;
}



const updateMovement = function (state) {
    if (state == "STAT") {
        initialSet();
    } else if (state == "FWRD") {
        return movementRef.update(moveUp());
    } else if (state == "BACK") {
        return movementRef.update(moveDown())
    } else if (state == "LEFT") {
        return movementRef.update(moveLeft())
    } else if (state == "RGHT") {
        return movementRef.update(moveRight())
    } else {
        console.error('Command not found!');
        throw Error('Command ' + state + ' not found!');
    }
};

module.exports = {
    updateMovement,
    piMove
};