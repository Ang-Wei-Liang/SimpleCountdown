//console.log("dude2")


document.addEventListener('DOMContentLoaded', () => {
    console.log("Loaded successfully")
      const chatForm = document.getElementById('chat-form');
      const userInputField = document.getElementById('user-input');
      const chatHistoryContainer = document.getElementById('chat-history');
  
      console.log("before user-input is " + userInputField)
    
      // Initialize chat history
      var chatHistoryMirror = [];

      var promptInput = "You are my mental abstract virtual mirror. You must give me CONCISE reflections in 45 words. To give me reflections, you have to get information from me. In the context of this information you will ask for further information. And so on."

      var assistantInput = "Certainly, I can act as your mental abstract virtual mirror. To get started, please provide me with some information or a topic you'd like to reflect upon, and I'll ask questions and engage in a conversation to help you explore that topic further. What's on your mind today, or is there a specific subject you'd like to discuss?"

      chatHistoryMirror.push(['system', promptInput]);
      chatHistoryMirror.push(['assistant', assistantInput]);

      
    
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
    messageElement.classList.add(role, 'text-center');
  
    // Create a typing effect
    const typingEffect = async () => {
      for (let i = 0; i <= message.length; i++) {
        messageElement.textContent = role + ": " + message.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, 20)); // Adjust typing speed
      }
    };
  
    // Append the message with typing animation
    chatHistoryContainer.appendChild(messageElement);
    typingEffect();

    // Add a line break after the message
    chatHistoryContainer.appendChild(document.createElement('br'));


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
            body: JSON.stringify({ userInput, chatHistoryMirror }),
          });
    
          if (!response.ok) {
            throw new Error('Request failed');
          }
    
          const data = await response.json();
    
          // Display the bot's response
          const botResponse = "ok";
          //const botResponse = data.response;
          console.log("Bot's resposne is: " + botResponse)
  
  
          var chatHistoryUnextracted = data.chatHistory;
          //var chatHistoryUnextracted = [["a", "1"], ["b", "2"], ["c", "3"], ["d", "4"], ["e", "5"], ["f", "6"], ["g", "7"], ["h", "8"], ["i", "9"]]


          //chatHistoryUnextracted = data.chatHistory;

          var latestSixElements = chatHistoryUnextracted;

          if (chatHistoryUnextracted.length > 6) {
            latestSixElements = chatHistoryUnextracted.slice(0, 2).concat(chatHistoryUnextracted.slice(-4));
          } else {
            //var latestSixElements = chatHistoryUnextracted;
          }

          chatHistoryMirror = latestSixElements



          console.log("Chat History is: " + chatHistoryMirror)
  
          addMessage('bot', botResponse);
    
          // Clear the user input field
          userInputField.value = '';
  
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      });
    });