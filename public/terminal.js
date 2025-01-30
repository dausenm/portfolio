console.log("JavaScript loaded successfully");

let terminalOpened = false; // Flag to track if the terminal has been opened

// Toggle terminal visibility when tilde key or tilde button is pressed
function toggleTerminal() {
  const terminal = document.getElementById('terminal');

  clearTerminal();

  if (!terminal.classList.contains('hidden')) {
    clearTerminal(); // Clear terminal before closing it
    terminalOpened = false; // Reset flag so prompt is added again next time
  }

  terminal.classList.toggle('hidden');

  if (!terminal.classList.contains('hidden')) {
    document.getElementById('terminal-input').focus(); // Focus on input when terminal is opened
  }

  printToTerminal(welcomeAscii); // Print welcome message to the terminal
}

// Draggable terminal window
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = function(e) {
    e = e || window.event;
    e.preventDefault();
    // Get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Apply dragging functionality to terminal and resume
document.addEventListener("DOMContentLoaded", function () {
  dragElement(document.getElementById("terminal"));
  dragElement(document.getElementById("resume-window"));
});

// Close terminal when 'X' button is clicked
document.getElementById('close-button').addEventListener('click', function () {
  document.getElementById('terminal').classList.add('hidden');
});

// Clear terminal content
function clearTerminal() {
  const terminalOutput = document.getElementById('terminal-output');
  terminalOutput.innerHTML = ''; // Clear the terminal output
  document.getElementById('terminal-input').value = ''; // Clear input field
}

// Terminal icon on the desktop opens terminal
document.getElementById('terminal-icon').addEventListener('click', function () {
  toggleTerminal();
});

// Terminal icon on the taskbar opens terminal
document.getElementById("taskbar-terminal").addEventListener("click", toggleTerminal);

// Handle terminal input
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Add a new user prompt
function addUserPrompt() {
  const promptContainer = document.createElement('div'); // Create a div container for prompt and input
  promptContainer.style.display = 'inline'; // Ensure the prompt stays inline with input

  const prompt = document.createElement('span');
  prompt.textContent = 'user> ';
  promptContainer.appendChild(prompt);

  // Append the promptContainer to the terminal output
  const terminalOutput = document.getElementById('terminal-output');
  terminalOutput.appendChild(promptContainer);
  
  // Focus the input for typing
  terminalInput.focus();
}


// Focus the input field when clicking anywhere inside the terminal
document.getElementById('terminal').addEventListener('click', function () {
  terminalInput.focus(); // Just focus the input field for typing, no new prompt or command
});

// Listen for the 'Enter' key press to handle input commands
terminalInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addUserPrompt();
    event.preventDefault(); // Prevent default behavior
    const inputValue = terminalInput.value.trim();

    if (inputValue.toLowerCase() === 'stop') {
      clearTerminal(); // Clear the terminal output
      toggleTerminal(); // Close terminal after clearing it
      terminalOpened = false; // Reset flag so prompt is added again next time
    } 
    else if (inputValue.toLowerCase() === 'help') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      
      terminalInput.value = ''; // Clear input field
      
      const helpMessage = "list of available commands:\n\t- help: displays a lit of available commands\n\t- stop: closes the terminal\n\t- clear: clears the terminal contents\n\t- resume: prints my resume to the terminal.\n";
      printToTerminal(helpMessage);
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'clear') {
      clearTerminal(); // Clear the terminal output
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'dausen') {
      // Step 1: Append the user's input 'help' to the terminal
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      
      // Step 2: Clear the input field after appending the user's input
      terminalInput.value = ''; // Clear input field
      
      // Step 3: Append the help message to the terminal
      const helpMessage = "\tyeah. that's me\n";
      printToTerminal(helpMessage);
    
      // Step 4: Add a new user prompt after displaying the help message
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'resume') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue;
      lastPromptContainer.appendChild(userInput);
    
      // Clear the input field
      terminalInput.value = '';

      printToTerminal(asciiResume); // Print the ASCII resume to the terminal
    
      // Toggle the resume window to show the embedded PDF
    }
    else if (inputValue) {
      // Check if there's a last prompt container before appending
      const lastPromptContainer = terminalOutput.lastChild;
      if (lastPromptContainer) {
        const userInput = document.createElement('span');
        userInput.textContent = inputValue;
        lastPromptContainer.appendChild(userInput); // Add input to same container as prompt
      } else {
        console.error('No last prompt container found!');
      }

      terminalInput.value = ''; // Clear input field after submitting

      // Add a line break (create a new prompt on the next line)
      terminalOutput.appendChild(document.createElement('br'));      
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
  }
});

function printToTerminal(message) {
  const outputMessage = document.createElement('div');
  outputMessage.textContent = message;
  terminalOutput.appendChild(outputMessage); // Add message to terminal output
}

// ASCII version of the resume
const asciiResume = `
----------------------------------------------
            DAUSEN MASON 
   Aspiring Software Developer | Bartender
----------------------------------------------
PROFILE
  Recent Computer Science graduate with a passion for
  software development and a background in service
  industry. Seeking opportunities to grow and develop
  my skills in the tech industry, as well as apply
  skills developed in management and customer service.
  Big fan of coffee, limp bizkit, video games,
  and lays salt and vinegar.

EXPERIENCE
  Lifeguard at TCPARA (2016-2019)
    - Ensured pool safety, trained new guards.
  
  Shift Lead at Central Mesa (2019-Present)
    - Managed operations, excelled in customer service.

  General Manager at Nocturnal Tavern (2023-Present)
    - Team management, customer engagement, leadership skills.

SKILLS
  - C, C++, Python, Java, JavaScript, HTML/CSS
  - React, Node.js, Streamlit, Limited experience with Docker
  - SQL, MongoDB
  - Limited experience with AWS, GCP
  - Git version control
  - MS Office + Adobe Creative Cloud

EDUCATION
  The University of Alabama (2019-2024)
  B.S. in Computer Science
----------------------------------------------
`;

const welcomeAscii = `       __                           _          __                      _             __
  ____/ /___ ___  __________  ____ ( )_____   / /____  _________ ___  (_)___  ____ _/ /
 / __  / __ \`/ / / / ___/ _ \\/ __ \\|// ___/  / __/ _ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ / 
/ /_/ / /_/ / /_/ (__  )  __/ / / / (__  )  / /_/  __/ /  / / / / / / / / / / /_/ / /  
\\__,_/\\__,_/\\__,_/____/\\___/_/ /_/ /____/   \\__/\\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/   
                                                                          version 0.69.420                                                                                     
`;





//Start Menu
document.getElementById("start-button").addEventListener("click", function () {
  console.log("Start button clicked");
  let startMenu = document.getElementById("start-menu");
  startMenu.classList.toggle("show");
});

// Close the menu if clicking anywhere outside of it
document.addEventListener("click", (event) => {
  let startMenu = document.getElementById("start-menu");
  let startButton = document.getElementById("start-button");

  // If clicking outside the start menu AND not on the start button
  if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
    console.log("Clicked outside of the start menu, closing it.");
    startMenu.classList.remove("show");
  }
});

//Opens resume window
document.getElementById("resume-option").addEventListener("click", function () {
  let resumeWindow = document.getElementById("resume-window");
  resumeWindow.classList.toggle("hidden");
});

// Close button functionality
document.getElementById("resume-close-button").addEventListener("click", function () {
  let resumeWindow = document.getElementById("resume-window");
  resumeWindow.classList.toggle("hidden");
});

// Fullscreen toggle
document.getElementById("fullscreen-button").addEventListener("click", function () {
  let resumeContent = document.getElementById("resume-content");
  resumeContent.classList.toggle("fullscreen");
});