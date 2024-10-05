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
}

// Toggle resume window with embedded PDF
function toggleResumeWindow() {
  const resumeWindow = document.getElementById('resume-window');
  
  // Toggle visibility
  resumeWindow.classList.toggle('hidden');
  
  // Only attach the drag functionality if the resume window is visible
  if (!resumeWindow.classList.contains('hidden')) {
    const resumeHeader = document.getElementById('resume-header');
    
    resumeHeader.onmousedown = function (e) {
      dragElement(resumeWindow, e);
    };
  } else {
    const resumeHeader = document.getElementById('resume-header');
    resumeHeader.onmousedown = null; // Remove drag when hidden
  }
}

// Close resume when 'X' button is clicked
document.getElementById('resume-close-button').addEventListener('click', function () {
  toggleResumeWindow();
});

// Toggle Fullscreen mode for the resume window
document.getElementById('fullscreen-button').addEventListener('click', function () {
  const resumeWindow = document.getElementById('resume-window');
  resumeWindow.classList.toggle('fullscreen');
  
  if (resumeWindow.classList.contains('fullscreen')) {
    resumeWindow.style.width = '100vw';
    resumeWindow.style.height = '100vh';
  } else {
    resumeWindow.style.width = '800px'; // Default back to original size
    resumeWindow.style.height = '600px';
  }
});

// Draggable functionality (only when called)
function dragElement(elmnt, e) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  e = e || window.event;
  
  // Check if Mouse1 (left mouse button) is pressed
  if (e.button !== 0) return; // Only allow dragging with left mouse button

  e.preventDefault();
  pos3 = e.clientX;
  pos4 = e.clientY;
  
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
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

// Call dragElement on the terminal to make it draggable
dragElement(document.getElementById('terminal'));

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

// Event listener for tilde key (~)
document.addEventListener('keydown', function(event) {
  if (event.key === '~') {
    toggleTerminal();
  }
});

// Toggle terminal with a button
document.getElementById('tilde-button').addEventListener('click', function () {
  toggleTerminal();
});


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
      // Step 1: Append the user's input 'help' to the terminal
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      
      // Step 2: Clear the input field after appending the user's input
      terminalInput.value = ''; // Clear input field
      
      // Step 3: Append the help message to the terminal
      const helpMessage = "\tyou entered 'help' to view a list of available commands. fuck you.\n";
      printToTerminal(helpMessage);
    
      // Step 4: Add a new user prompt after displaying the help message
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

      printToTerminal('opening resume...\n');
    
      // Toggle the resume window to show the embedded PDF
      toggleResumeWindow();
    
      // Add a new prompt after showing the resume
      terminalOutput.appendChild(document.createElement('br'));
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

