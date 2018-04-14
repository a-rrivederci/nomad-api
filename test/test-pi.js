var assert = require('assert');
var pi = require('./../src/pi');
var ref = pi.piMove;

describe('testing the nomad movements', function () {

    beforeEach(function () {
        pi.updateMovement('STAT');
    })

    it('should initalize movements', function () {
        const stat = {
            down: false,
            left: false,
            right: false,
            up: false
        };
        pi.updateMovement('STAT');
        ref.child('Movement').on('value', function (snapshot) {
            if (snapshot.val() === stat) {
                assert.deepEqual(snapshot.val(), stat);
            }
        });
    });

    it('should move forward', function () {
        pi.updateMovement('FWRD');
        const forward = {
            down: false,
            left: false,
            right: false,
            up: true
        };
        ref.child('Movement/').once('value').then(snapshot => {
            if (snapshot.val().up === forward.up) {
                assert.deepEqual(snapshot.val(), forward);
            }
        });
    });

    it('should move back', function () {
        pi.updateMovement('BACK');
        const back = {
            down: true,
            left: false,
            right: false,
            up: false
        };
        ref.child('Movement/').once('value').then(snapshot => {
            if (snapshot.val().down === back.down) {
                assert.deepEqual(snapshot.val(), back);
            }
        });
    });

    it('should move left', function () {
        pi.updateMovement('LEFT');
        const left = {
            down: false,
            left: true,
            right: false,
            up: false
        };
        ref.child('Movement/').once('value').then(snapshot => {
            if (snapshot.val().left === left.left) {
                assert.deepEqual(snapshot.val(), left);
            }
        });
    });

    it('should move right', function () {
        pi.updateMovement('RGHT');
        const right = {
            down: false,
            left: false,
            right: true,
            up: false
        };
        ref.child('Movement/').once('value').then(snapshot => {
            if (snapshot.val().right === right.right) {
                assert.deepEqual(snapshot.val(), right);
            }
        });
    });
});