let terminalOpened = false; // Flag to track if the terminal has been opened

// Toggle terminal visibility when tilde key or tilde button is pressed
function toggleTerminal() {
  const terminal = document.getElementById('terminal');

  if (!terminal.classList.contains('hidden')) {
    clearTerminal(); // Clear terminal before closing it
    terminalOpened = false; // Reset flag so prompt is added again next time
  }

  terminal.classList.toggle('hidden');

  if (!terminal.classList.contains('hidden')) {
    document.getElementById('terminal-input').focus(); // Focus on input when terminal is opened
  }
}

// Draggable terminal window
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = document.getElementById(elmnt.id + "-header");

  if (header) {
    header.onmousedown = dragMouseDown; // Move the DIV from the header if present
  } else {
    elmnt.onmousedown = dragMouseDown; // Otherwise, move the DIV from anywhere inside the DIV
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Call dragElement on the terminal to make it draggable
dragElement(document.getElementById("terminal"));

// Close terminal when 'X' button is clicked
document.getElementById('close-button').addEventListener('click', function () {
  document.getElementById('terminal').classList.add('hidden');
});

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

// Add a new user prompt
function addUserPrompt() {
  const promptContainer = document.createElement('div'); // Create a div container for prompt and input
  promptContainer.style.display = 'inline'; // Ensure the prompt stays inline with input

  const prompt = document.createElement('span');
  prompt.textContent = 'user> ';
  promptContainer.appendChild(prompt);

  terminalOutput.appendChild(promptContainer); // Append container to terminal output
  terminalInput.focus(); // Ensure the input is focused
}

// When clicking anywhere in the terminal, focus the input field (but don't add a prompt or simulate a command)
document.getElementById('terminal').addEventListener('click', function () {
  terminalInput.focus(); // Just focus the input field for typing, no new prompt or command
});

terminalInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior of pressing enter
    const inputValue = terminalInput.value.trim();

    if (inputValue.toLowerCase() === 'stop') {
      clearTerminal(); // Clear the terminal output
      toggleTerminal(); // Close terminal after clearing it
      terminalOpened = false; // Reset flag so prompt is added again next time
    } else if (inputValue) {
      // Append input value to the last prompt container (on the same line)
      const lastPromptContainer = terminalOutput.lastChild; // Get the last prompt container
      const userInput = document.createElement('span'); // Create a span for user input
      userInput.textContent = inputValue;
      lastPromptContainer.appendChild(userInput); // Add input to same container as prompt
      terminalInput.value = ''; // Clear input field after submitting

      // Add a line break (create a new prompt on the next line)
      terminalOutput.appendChild(document.createElement('br'));

      // Add new user prompt for the next command
      addUserPrompt();
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
  }
});
