const jwt = require('jsonwebtoken');

const output = document.getElementById("token_out");
const generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", generateToken);

function generateToken() {
    const team_id = document.getElementById("team_id");
    const key_id = document.getElementById("key_id");
    const private_key = document.getElementById("private_key");
    const time = new Date();
    const seconds = Math.round(time.getTime() / 1000);

    const headers = {
        alg: "ES256",
        kid: key_id.value
    };

    const payload = {
        iss: team_id.value,
        iat: seconds,
        exp: seconds + 6 * 30 * 24 * 60 * 60 // Token expires after 6 months
    };

    jwt.sign(
        payload,
        private_key.value,
        {
            algorithm: "ES256",
            header: headers
        },
        function(err, generatedToken) {
            console.log(err);
            console.log(generatedToken);
            output.value = generatedToken;
        }
    );
}

document.querySelector("#copy").addEventListener("click", copyToClipboard);

function copyToClipboard() {
    const text = document.querySelector("#token_out");
    text.select();
    document.execCommand("copy");
}

const testButton = document.getElementById("test-button");
testButton.addEventListener("click", test_token);

function test_token() {
    const url = "https://api.music.apple.com/v1/catalog/us/songs/203709340";
    const token = output.value;
    const test_textarea = document.getElementById("test_textarea");
    const header = {
        Authorization: "Bearer " + token
    };

    const request = new XMLHttpRequest();
    // Return the status code of the API request and print it to the test text field area
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if(request.status == 200) {
                test_textarea.value = "Status code: 200, your token is good!";
            } else {
                test_textarea.value = "Status code: " + request.status + ", please make sure the info is correct.";
            }
        }
    }

    request.open("GET", url);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send();
    console.log(request.response);
}