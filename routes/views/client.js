//console.log("dude2")


document.addEventListener('DOMContentLoaded', () => {
    console.log("Loaded successfully")
      const chatForm = document.getElementById('chat-form');
      const userInputField = document.getElementById('user-input');
      const chatHistoryContainer = document.getElementById('chat-history');
  
      console.log("before user-input is " + userInputField)
    
      // Initialize chat history
      let chatHistory = [];
    
      // Function to add a message to the chat history
      /*
      function addMessage(role, message) {
          console.log("appending")
        const messageElement = document.createElement('div');
        messageElement.classList.add(role);
        messageElement.textContent = message;
        chatHistoryContainer.appendChild(messageElement);
      }*/
  
      // Function to add a message to the chat history with typing animation
  function addMessage(role, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(role);
  
    // Create a typing effect
    const typingEffect = async () => {
      for (let i = 0; i <= message.length; i++) {
        messageElement.textContent = message.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, 20)); // Adjust typing speed
      }
    };
  
    // Append the message with typing animation
    chatHistoryContainer.appendChild(messageElement);
    typingEffect();
  }
    
      // Function to handle form submission
      chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        
    
        const userInput = userInputField.value.trim();
        console.log("after submit user-input is " + userInput)
  
        if (!userInput) return;
    
        // Add user's message to chat history
        addMessage('user', userInput);
        console.log("user message appended")
    
        // Send user input to the server
        try {
          console.log("passed to backend")
          const response = await fetch('/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput, chatHistory }),
          });
    
          if (!response.ok) {
            throw new Error('Request failed');
          }
    
          const data = await response.json();
    
          // Display the bot's response
          const botResponse = data.response;
          console.log("Bot's resposne is: " + botResponse)
  
  
          chatHistory = data.chatHistory;
          console.log("Chat History is: " + chatHistory)
  
          addMessage('bot', botResponse);
    
          // Clear the user input field
          userInputField.value = '';
  
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      });
    });