let terminalOpened = false; // Flag to track if the terminal has been opened

// Toggle terminal visibility when tilde key or tilde button is pressed
function toggleTerminal() {
  const terminal = document.getElementById('terminal');
  terminal.classList.toggle('hidden');
  if (!terminal.classList.contains('hidden')) {
    document.getElementById('terminal-input').focus(); // Focus on input when terminal is opened

    if (!terminalOpened) {
      addUserPrompt(); // Add prompt only if this is the first time terminal is opened
      terminalOpened = true; // Set flag to true to prevent adding multiple prompts
    }
  }
}

// Clear terminal content
function clearTerminal() {
  const terminalOutput = document.getElementById('terminal-output');
  terminalOutput.innerHTML = ''; // Clear the terminal output
  terminalInput.value = ''; // Clear input field
}

// Event listener for tilde key (~)
document.addEventListener('keydown', function (event) {
  if (event.key === '~') {
    toggleTerminal();
  }
});

// Event listener for tilde button click
document.getElementById('tilde-button').addEventListener('click', function () {
  toggleTerminal();
});

// Handle terminal input
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

function addUserPrompt() {
  const promptContainer = document.createElement('div'); // Create div container for prompt and input
  promptContainer.style.display = 'flex'; // Keep the prompt and input on the same line

  const prompt = document.createElement('span');
  prompt.textContent = 'user> ';
  promptContainer.appendChild(prompt);
  
  terminalOutput.appendChild(promptContainer); // Append container to terminal output
}

terminalInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const inputValue = terminalInput.value.trim();

    if (inputValue.toLowerCase() === 'stop') {
      clearTerminal(); // Clear the terminal output
      toggleTerminal(); // Close terminal after clearing it
      terminalOpened = false; // Reset flag so prompt is added again next time
    } 
    else if (inputValue.toLowerCase() === 'help'){
        const promptContainer = document.createElement('div');
        promptContainer.style.display = 'flex'; // Keep the prompt and input on the same line
        const prompt = document.createElement('span');
        prompt.textContent = 'You used \'help\' to display a list of commands. fuck you. '
        promptContainer.appendChild(prompt);
        terminalOutput.appendChild(promptContainer);
    }
    else if (inputValue) {
      // Append input value to the last prompt container (on the same line)
      const lastPromptContainer = terminalOutput.lastChild; // Get the last prompt container
      const userInput = document.createElement('span'); // Create span for user input
      userInput.textContent = inputValue;
      lastPromptContainer.appendChild(userInput); // Add input to same container as prompt
      terminalInput.value = ''; // Clear input field after submitting

      // Add new user prompt for the next command
      addUserPrompt();
    }
    terminalInput.value = '';

    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
  }
});
