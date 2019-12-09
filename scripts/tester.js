const url = "https://api.music.apple.com/v1/catalog/us/songs/203709340";
var button = document.getElementById("test-button");
var token = document.getElementById("test-textarea").value;
var header = {
  Authorization: "Bearer " + token
};

button.addEventListener("click", function() {
  console.log("Testing token" + token);
});
