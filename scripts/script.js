window.onload = function() {
  document.getElementById("chat-button").onclick = function() { toggleHidden() };
  document.getElementById("chat-box").getElementsByTagName("input")[0].onkeypress = function(){ enterPressed(event) };
  var chatbox = document.getElementById("chat-box");
  chatbox.style.display = "none";

  function toggleHidden() {
    if (chatbox.style.display == "none") {
      chatbox.style.display = "block";
    }
    else {
      chatbox.style.display = "none";
    }
  }

  function enterPressed(event) {
    var chatbox = document.getElementById("chat-box");
    var textbox = chatbox.getElementsByTagName("input")[0];
    if (event.key === "Enter" && textbox.value != "") {
      var chatarea = document.getElementById("chat-area");
      var div = document.createElement("div");
      div.className = "text";
      div.textContent = "You: " + textbox.value;
      chatarea.appendChild(div);
      textbox.value = "";
    }
  }
}