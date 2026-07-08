function sendMessage() {

    let input = document.getElementById("message");
    let message = input.value.trim();

    if (message === "") return;

    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `
        <div class="user-message">${message}</div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    fetch("/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "message=" + encodeURIComponent(message)
    })
    .then(response => response.json())
    .then(data => {
    chatBox.innerHTML += `
<div class="bot-message" id="typing">
    Bot is typing...
</div>`;

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {

        document.getElementById("typing").remove();

        chatBox.innerHTML += `
<div class="bot-message">
    ${data.response}
</div>`;

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 800);

});

    input.value = "";
}
document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});