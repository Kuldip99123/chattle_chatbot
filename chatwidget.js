(function () {
  // 1. Inject Google Fonts
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // 2. Inject CSS
  const style = document.createElement('style');
  style.innerHTML = `/* your entire CSS inside <style> from original code */`;
  document.head.appendChild(style);

  // 3. Inject HTML structure
  const container = document.createElement('div');
  container.innerHTML = `
    <!-- Floating Chat Button -->
    <div class="floating-chat-btn" onclick="toggleChatbot()">Talk to Chattle</div>
    <div class="chatbot-container" id="chatbot-container">
      <div class="company-header">
        Metro AI HelpDesk
        <span class="close-btn" onclick="toggleChatbot()">×</span>
      </div>
      <div class="screen active" id="welcome-screen">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;">
          <h2>Welcome to Chattle 💜</h2>
          <p><strong>Hi! I'm Chattle your Metro AI ChatBot, trained to assist, amuse & occasionally make you smile!</strong></p>
          <button class="btn" onclick="switchScreen('welcome-screen','chat-screen')">Start Chatting</button>
          <p>Tap above and let’s chat 💬</p>
        </div>
      </div>
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
    </div>
  `;
  document.body.appendChild(container);

  // 4. Add functionality
  window.toggleChatbot = function () {
    const bot = document.getElementById('chatbot-container');
    bot.classList.toggle('show');
  };

  window.switchScreen = function (hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(showId).classList.add('active');
    if (showId === 'chat-screen') {
      const box = document.getElementById('chat-box');
      if (!box.hasChildNodes()) {
        appendBotMessage("Hi There👋 I'm Chattle, your Metro AI ChatBot, trained to assist, amuse, & occasionally make you smile. How may I assist you today ?");
      }
    }
  };

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
    const box = document.getElementById('chat-box');
    box.scrollTop = box.scrollHeight;
  }

  window.sendMessage = function () {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;
    appendUserMessage(text);
    input.value = '';
    const chatBox = document.getElementById('chat-box');
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<a>Chattle is typing...</a>';
    chatBox.appendChild(typing);
    scrollToBottom();
    fetch('https://metrocs.app.n8n.cloud/webhook/720cdb84-2215-409d-97ae-abb45de60b99/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: text
    })
      .then(r => r.json())
      .then(data => {
        typing.remove();
        appendBotMessage(data.output || "I didn't understand that. Can you rephrase?");
      })
      .catch(err => {
        console.error(err);
        typing.remove();
        appendBotMessage("⚠️ Couldn’t connect to the server. Please try again later.");
      });
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.sendMessage();
    }
  });
})();
