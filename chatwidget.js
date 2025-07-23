(function () {
  // Load external fonts
  const fontLink = document.createElement("link");
  fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  // Add CSS
  const style = document.createElement("style");
  style.textContent = ` body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
  }

.chatbot-container {
  width: 360px;
  max-width: 90%;
  height: 505px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  /* 🎯 Animation setup */
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 1.2, 0.5, 1);
  visibility: hidden;
  pointer-events: none;
}


 .chatbot-container.show {
  opacity: 1;
  transform: translateY(0px) scale(1);
  visibility: visible;
  pointer-events: auto;
  display: flex; /* keep flex layout */
}


  .company-header {
    position: relative;
    background: linear-gradient(135deg, #ff6e30, #d45113);
    color: white;
    text-align: center;
    padding: 16px;
    font-size: 18px;
    font-weight: 600;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .company-header .close-btn {
    position: absolute;
    top: 12px;
    right: 18px;
    font-size: 22px;
    cursor: pointer;
    color: white;
    font-weight: 300;
  }

  .screen {
    display: none;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }

  .screen.active {
    display: flex;
  }

  h2 {
    margin-top: 0;
    font-size: 22px;
    color: #333;
  }

  .btn {
    background: linear-gradient(to right, #ff6e30, #d45113);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 30px;
    font-size: 15px;
    cursor: pointer;
    margin-top: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  input[type="text"], input[type="email"] {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border-radius: 25px;
    border: 1px solid #ddd;
    font-size: 15px;
    box-sizing: border-box;
  }

  .chat-box {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
  }

  .message {
    margin: 6px 0;
    padding: 12px 18px;
    border-radius: 18px;
    font-size: 15px;
    max-width: 80%;
    word-wrap: break-word;
    line-height: 1.4;
    transition: all 0.2s ease;
  }

  .user-message {
    background: #ff6e30;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .bot-message {
    background: #e9e9ec;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  .typing-indicator {
    align-self: flex-start;
    margin: 6px 0;
    font-size: 14px;
    color: #777;
    font-style: italic;
  }

  .typing-indicator a {
    color: #ff6e30;
    text-decoration: none;
  }

  .input-area {
    display: flex;
    padding: 12px;
    border-top: 1px solid #ddd;
    background: #fff;
    align-items: center;
  }

  .input-area input {
    flex: 1;
    padding: 10px 14px;
    font-size: 14px;
    border-radius: 30px;
    border: 1px solid #ccc;
    outline: none;
  }

  .input-area .send-btn {
    width: 42px;
    height: 42px;
    margin-left: 10px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(to right, #ff6e30, #d45113);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
    flex-shrink: 0;
  }

  .input-area .send-btn:hover {
    transform: scale(1.1);
  }

  .input-area .send-btn svg {
    width: 20px;
    height: 20px;
    fill: white;
  }

  .powered-by {
  text-align: center;
  font-size: 12px;
  color: #444;
  padding: 10px;
  border-top: 1px solid #eee;
  background-color: #f7f7f7;
  font-weight: 500;
  letter-spacing: 0.3px;
}


  .floating-chat-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(to right, #ff6e30, #d45113);
    color: white;
    padding: 12px 20px;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.3s ease;
    z-index: 999;
    animation: popIn 0.6s ease 0.5s both;

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

  }

  .floating-chat-btn:hover {
    transform: scale(1.05);
  }`;
  document.head.appendChild(style);

  // Add HTML
  const wrapper = document.createElement("div");
  wrapper.innerHTML = ` <!-- Floating Chat Button -->
  <div class="floating-chat-btn" onclick="toggleChatbot()">Talk to Chattle</div>

  <div class="chatbot-container" id="chatbot-container">
    <div class="company-header">
      Metro AI HelpDesk
      <span class="close-btn" onclick="toggleChatbot()">×</span>
    </div>

    <!-- Welcome Screen -->
    <div class="screen active" id="welcome-screen">
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;">
        <h2>Welcome to Chattle 💜</h2>
        <p><strong>Hi! I'm Chattle your Metro AI ChatBot, trained to assist, amuse & occasionally make you smile!</strong></p>
        <button class="btn" onclick="switchScreen('welcome-screen','chat-screen')">Start Chatting</button>

        <p>Tap above and let’s chat 💬</p>
      </div>
    </div>

    <!-- Chat Screen -->
    <div class="screen" id="chat-screen">
      <div class="chat-box" id="chat-box"></div>
      <div class="input-area">
        <input type="text" id="user-input" placeholder="Type a message..." />
        <button class="send-btn" onclick="sendMessage()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>

    <div class="powered-by">Powered by <strong>TrueVibess</strong></div>
  </div>`;
  document.body.appendChild(wrapper);

  // function toggleChatbot() {
      const bot = document.getElementById('chatbot-container');
      if (!bot.classList.contains('show')) {
        bot.classList.add('show');
      } else {
        bot.classList.remove('show');
      }
    }

   function showWelcomeMessage() {
  appendBotMessage("Hi 👋 I'm Chattle, your Metro AI ChatBot, trained to assist, amuse, & occasionally make you smile. How may I assist you today ?");
}


    function switchScreen(hideId, showId) {
  document.getElementById(hideId).classList.remove('active');
  document.getElementById(showId).classList.add('active');

  if (showId === 'chat-screen') {
    // Show welcome message once
    if (!document.getElementById('chat-box').hasChildNodes()) {
      appendBotMessage("Hi There👋 I'm Chattle, your Metro AI ChatBot, trained to assist, amuse, & occasionally make you smile. How may I assist you today ?");
    }
  }
}

    function appendUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message user-message';
  msg.innerText = text;
  document.getElementById('chat-box').appendChild(msg);
  scrollToBottom();

  
}

function appendBotMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message bot-message';
  msg.innerText = text;
  document.getElementById('chat-box').appendChild(msg);
  scrollToBottom();

 
}

    function scrollToBottom() {
      const box = document.getElementById('chat-box'); box.scrollTop = box.scrollHeight;
    }
    function sendMessage() {
      const input = document.getElementById('user-input'); const text = input.value.trim();
      if (!text) return;
      appendUserMessage(text); input.value = '';
      const chatBox = document.getElementById('chat-box');
      const typing = document.createElement('div'); typing.className='typing-indicator'; typing.innerHTML='<a>Chattle is typing...</a>';
      chatBox.appendChild(typing); scrollToBottom();
      fetch('https://metrocs.app.n8n.cloud/webhook/720cdb84-2215-409d-97ae-abb45de60b99/chat',{ method:'POST', headers:{'Content-Type':'text/plain'}, body:text })
      .then(r=>r.json()).then(data=>{ typing.remove(); appendBotMessage(data.output||"I didn't understand that. Can you rephrase?"); })
      .catch(err=>{ console.error(err); typing.remove(); appendBotMessage("⚠️ Couldn’t connect to the server. Please try again later."); });
    }
    document.getElementById('user-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
    });
    
  // Either inline your functions here or call external resources
})();
