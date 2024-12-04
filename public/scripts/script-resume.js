const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
let userText = null;
let c = -1;
let k = 0;
let questions = [];
const createElement = (html, className) => {
  // Create new div and apply chat, specified class and set html content of div
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv; // Return the created chat div
};

                                                                                                    
  
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

function cleanText(input) {
  // Remove ```html or similar code block indicators if present
  const cleaned = input.replace(/```html|```/g, "").trim();

  // Optional: Additional formatting cleanup (e.g., multiple spaces, newlines)
  return cleaned.replace(/\s+/g, " ").replace(/(?<=\w)\n/g, " ");
}

const evaluateAnswer = async (incomingChatDiv) => {
  console.log(`${questions[c]} : ${userText} : ${c}`);

  const pElement = document.createElement("div");
  const evaluationTemplate = `
    <div class="evaluation">
        <h3>Positive Remarks:</h3>
        <ul id="positive-remarks"></ul>
        <h3>Negative Remarks:</h3>
        <ul id="negative-remarks"></ul>
        <h3>Topics to Work On:</h3>
        <ul id="topics-to-work-on"></ul>
    </div>
`;

  // Prepare the prompt for the API request
  let prompt = `A candidate in an interview gave the answer for the question:\n ${questions[c]} \n.His answer was: ${userText}\n Be a Judge and evaluate the answer in the following way:\n positive remarks: \n\n negative remarks: (mention what was missing in the answer) \n\n topics to work on \n\n.If the answer is 'I don't know', list the topics the candidate needs to learn. Give short responses like this format \n\n. ${evaluationTemplate} `;

  const data = {
    contents: [
      {
        parts: [{ text: `${prompt}` }],
      },
    ],
  };

  try {
    // Send request to API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response is successful
    if (!response.ok) {
      console.error("Error:", response.statusText);
      return;
    }

    // Parse the response data
    const result = await response.json();

    // Extract the response text from the API response
    if (result.candidates && result.candidates.length > 0) {
      const responseText = result.candidates[0].content.parts[0].text;

      // Display the response text
      pElement.innerHTML = cleanText(responseText);
      incomingChatDiv.querySelector(".typing-animation").remove();
      incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
      generateQuestion();
    } else {
      console.log("No candidates in response.");
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};
const exitInterview = async () => {
  const html = `<div class="chat-content">
<div class="chat-details">
<img src="/assets/chatbot.png" alt="user-img">
<p>Thank you your interview is over</p>
</div>
</div>`;
  const outgoingChatDiv = await createElement(html, "incoming");
  chatContainer.appendChild(outgoingChatDiv);
};
const generateQuestion = async () => {
  // Check if we have exhausted all topics
  if (k == topics.length) {
    exitInterview();
    return;
  }

  let prompt = `From the given topic \n${topics[k]} \nask only one single question from this topic based on his resume content \n\n ${content} \n\n and do not answer, just ask.`;
  console.log(prompt);
  // Increment the index for the next topic
  k++;

  const data = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    // Send the API request to get the question
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response is successful
    if (!response.ok) {
      console.error("Error:", response.statusText);
      return;
    }

    // Parse the response
    const result = await response.json();

    // Extract the generated question from the response
    if (result.candidates && result.candidates.length > 0) {
      const responseText = result.candidates[0].content.parts[0].text;

      // Add the question to the questions array
      questions.push(responseText);
      c++;

      // Create HTML for the incoming chat
      const html = `
        <div class="chat-content">
          <div class="chat-details">
            <img src="/assets/chatbot.png" alt="user-img">
            <p>${responseText}</p>
          </div>
        </div>
      `;

      // Assuming createElement is a function that generates the chat HTML element
      const incomingChatDiv = createElement(html, "incoming");
      chatContainer.appendChild(incomingChatDiv);
    } else {
      console.log("No candidates in response.");
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};

const showTypingAnimation = () => {
  const html = `<div class="chat incoming">
        <div class="chat-content">
          <div class="chat-details">
            <img src="/assets/chatbot.png" alt="chatbot images" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
              <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>`;
  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  evaluateAnswer(incomingChatDiv);
};
const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
  const html = `<div class="chat-content">
<div class="chat-details">
<img src="/assets/user.png" alt="user-img">
<p>${userText}</p>
</div>
</div>`;
  const outgoingChatDiv = createElement(html, "outgoing");
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};
sendButton.addEventListener("click", handleOutgoingChat);
window.onload = () => {
  generateQuestion();
};
