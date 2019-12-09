function copyToClipboard() {
    var text = document.querySelector('#token-out');
    text.select();
    document.execCommand('copy');
}

document.querySelector('#copy').addEventListener("click", copyToClipboard);