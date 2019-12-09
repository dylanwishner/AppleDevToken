const jwt = require('jsonwebtoken');

var kid = document.getElementById('kid');
var teamid = document.getElementById('teamID');
var secret = document.getElementById('secret');
var button = document.getElementById('generate');
var output = document.getElementById('token-out');

button.addEventListener('click', generateToken);

function generateToken() {
    const time = new Date();
    const seconds = Math.round(time.getTime() / 1000);

    var headers = {
        'alg' : 'ES256',
        'kid' : kid.value
    };

    var payload = {
        'iat' : seconds,
        'exp' : seconds + (12 * 60 * 60),
        'iss' : teamID.value
    }
    var token = jwt.sign(payload, secret.value, {
        algorithm: 'ES256',
        header: headers
    }, function(err, generatedToken) {
            console.log(err);
            console.log(generatedToken);
            output.value = generatedToken;
        }
    );
}



