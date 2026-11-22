let currentUser = "";
const FAMILY_SECRET_CODE = "1234"; // رمز العائلة الموحد

function login() {
  const name = document.getElementById("username-input").value.trim();
  const code = document.getElementById("family-code-input").value.trim();
  const errorEl = document.getElementById("login-error");

  if (!name) {
    errorEl.textContent = "يرجى كتابة اسمك أولاً.";
    return;
  }

  if (code !== FAMILY_SECRET_CODE) {
    errorEl.textContent = "رمز العائلة غير صحيح (جرب 1234).";
    return;
  }

  currentUser = name;
  document.getElementById("current-user-label").textContent = `أهلاً بك يا ${currentUser}`;
  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("chat-screen").classList.add("active");

  addMessage("النظام", `انضم ${currentUser} إلى غرفة العائلة!`, "received");
}

function sendMessage() {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text) return;

  addMessage(currentUser, text, "sent");
  input.value = "";
}

function addMessage(sender, text, type) {
  const container = document.getElementById("messages-container");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${type}`;

  msgDiv.innerHTML = `
    <span class="sender-name">${sender}</span>
    <span>${text}</span>
  `;

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

let api = null;
function startCall(type) {
  const banner =document.getElementById("call-banner");
  const statusTeext = document.getElementById("call-status-text");
  banner.classList.remove("hidden");
  statusTeext.textContent = "(${type})";
  const videoContainer = document.getElementById("video-call-area");
  videoContainer.innerHTML = "";
  const domain = "meet.jit.si";
  const options = {
    roomName: "family_App_room_2026_sudan",
    width: "100%",
    height: 450,
    parentNode : videoContainer,
    lang: "ar",
    configOverwrite: {
      startWithVideoMuted: (type === "audio"),
    }
  };
  api = new JitsiMeetExternalAPI(domain, options);
}
function endCall() {
  document.getElementById("call-banner").classList.add("hidden");
  if (api) {
    api.dispose();
    api = null;
  }
  document.getElementById("video-call-area").innerHTML = "";
}
