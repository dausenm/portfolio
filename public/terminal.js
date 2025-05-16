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

// Draggable Windows Function
function makeDraggable(headerId, windowId) {
  const header = document.getElementById(headerId);
  const windowElement = document.getElementById(windowId);

  if (!header || !windowElement) return; // Avoid errors if elements are missing

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  header.onmousedown = function (e) {
      e = e || window.event;
      if (e.target !== header) return; // Prevent dragging when clicking other elements inside header

      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
  };

  function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
      windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  makeDraggable("settings-header", "settings-window");
  makeDraggable("resume-header", "resume-window");
  makeDraggable("terminal-header", "terminal");
  makeDraggable("contact-header", "contact-window");
  makeDraggable("readme-header", "readme-window");
  makeDraggable("nvntry-header", "nvntry-window");
  makeDraggable("movemint-header", "movemint-window");
  makeDraggable("nocturnal-header", "nocturnal-window");
  makeDraggable("experience-header", "experience-window");
  makeDraggable("about-header", "about-window");
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
      
      const helpMessage = "list of available commands:\n\t- help: displays a lit of available commands\n\t- stop: closes the terminal\n\t- clear: clears the terminal contents\n\t- resume: prints my resume to the terminal.\n\t- readme: displays README.txt\n\t- nvntry: opens NVNTRY application window\n\t- movemint: opens Movemint app window\n\t- nocturnal: opens Nocturnal Tavern website window\n\t- experience: opens work experience window\n\t- contact: opens contact info window\n\t- about: opens about me window";
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
    else if (inputValue.toLowerCase() === 'readme') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      toggleReadme();
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'nvntry') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      document.getElementById("nvntry-window").classList.toggle("hidden");
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'movemint') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      document.getElementById("movemint-window").classList.toggle("hidden");
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'nocturnal') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      document.getElementById("nocturnal-window").classList.toggle("hidden");
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'contact') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      document.getElementById("contact-window").classList.toggle("hidden");
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'experience') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      document.getElementById("experience-window").classList.toggle("hidden");
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
    }
    else if (inputValue.toLowerCase() === 'about') {
      const lastPromptContainer = terminalOutput.lastChild;
      const userInput = document.createElement('span');
      userInput.textContent = inputValue; // This is the 'help' input
      lastPromptContainer.appendChild(userInput); // Add input to the last prompt
      terminalInput.value = ''; // Clear input field
      document.getElementById("about-window").classList.toggle("hidden");
  
      terminalOutput.appendChild(document.createElement('br')); // Line break for new prompt
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
--------------------------------------------------
                 DAUSEN MASON                  
     Aspiring Software Developer | Bartender    
--------------------------------------------------

PROFILE
  Recent Computer Science graduate with a passion for 
  full-stack and application development. Experienced 
  in cloud deployment, UI/UX design, and cross-platform 
  development. Background in management and service 
  industry brings strong leadership and communication skills.

EXPERIENCE
  General Manager - Nocturnal Tavern (2023–Present)
    • Oversaw operations, led hiring/training, and improved workflow.

  Shift Lead - Central Mesa (2019–Present)
    • Managed front-of-house, enhanced team efficiency, and 
      delivered excellent customer experience.

  Lifeguard - TCPARA (2016–2019)
    • Maintained pool safety and trained new staff.

PROJECTS
  📂 Portfolio Website (dausenmason.com)
    • Node.js, Tailwind CSS, JavaScript
    • Simulates a desktop environment with draggable windows,
      interactive terminal, dynamic theming, and more.

  📱 NVNTRY (Mobile App)
    • Flutter, Dart, Hive
    • Personal inventory tracker with dark mode, category sorting,
      local storage, and mobile-first UI.

  🎮 Movemint (Indie Game Prototype)
    • C++, OpenGL
    • Fast-paced, physics-driven movement prototype exploring 
      momentum and fluid traversal mechanics.

  🍸 Nocturnal Tavern Website
    • Node.js, React, Tailwind CSS
    • Developed a responsive, branded web presence with 
      API integration and accessibility features.

TECHNICAL SKILLS
  • Languages: JavaScript, C++, Python, Java, Dart, HTML/CSS
  • Frameworks: React, Node.js, Flutter
  • Tools: Git, Figma, Docker (basic)
  • Databases: Hive, MongoDB, SQL
  • Cloud: AWS (App Runner, Route 53, CloudFront), Netlify

EDUCATION
  The University of Alabama (2019–2024)
  B.S. in Computer Science

--------------------------------------------------
  GitHub   : github.com/dausenm
  Website  : dausenmason.com
  LinkedIn : linkedin.com/in/dausenmason
--------------------------------------------------

`;

const welcomeAscii = `       __                           _          __                      _             __
  ____/ /___ ___  __________  ____ ( )_____   / /____  _________ ___  (_)___  ____ _/ /
 / __  / __ \`/ / / / ___/ _ \\/ __ \\|// ___/  / __/ _ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ / 
/ /_/ / /_/ / /_/ (__  )  __/ / / / (__  )  / /_/  __/ /  / / / / / / / / / / /_/ / /  
\\__,_/\\__,_/\\__,_/____/\\___/_/ /_/ /____/   \\__/\\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/   
                                                                          version 0.69.420        
                                                  Tip: Use 'help' for a list of available commands                                                                             
`;


// Date and time on the taskbar
function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = "";
  const is24Hour = localStorage.getItem("is24Hour") === "true"; // Get stored preference
  
  if (!is24Hour) {  // Convert to 12-hour format if needed
        ampm = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12; // Convert 0 to 12
    }

  minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero
  let timeString = `${hours}:${minutes} ${ampm}`;

  let dateString = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  document.getElementById("taskbar-time").innerHTML = `${dateString} | ${timeString}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

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

// Contact Window
document.getElementById("contact-option").addEventListener("click", function () {
  let contactWindow = document.getElementById("contact-window");
  contactWindow.classList.toggle("hidden");
});

// Close Contact Window
document.getElementById("close-contact").addEventListener("click", function () {
  document.getElementById("contact-window").classList.add("hidden");
});

//Opens settings window
document.getElementById("settings-option").addEventListener("click", function () {
  let settingsWindow = document.getElementById("settings-window");
  settingsWindow.classList.toggle("hidden");
});

document.getElementById("close-settings").addEventListener("click", function () {
  let settingsWindow = document.getElementById("settings-window");
  settingsWindow.classList.add("hidden");
});

// Light mode / dark mode toggle
// Get dark mode toggle switch
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Function to enable Dark Mode
function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark"); // Save preference
}

// Function to disable Dark Mode
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light"); // Save preference
}

// Check local storage for theme preference
if (localStorage.getItem("theme") === "dark") {
    enableDarkMode();
    darkModeToggle.checked = true; // Keep switch on
}

// Toggle Dark Mode when switch is clicked
darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// 24-hour time toggle
document.getElementById("time-format-toggle").addEventListener("change", function() {
  const isChecked = this.checked;
  localStorage.setItem("is24Hour", isChecked); // Save preference
  updateClock(); // Apply the new setting immediately
});

// Set the toggle state based on saved preference
document.getElementById("time-format-toggle").checked = localStorage.getItem("is24Hour") === "true";

//README window
// Toggle README.txt window
function toggleReadme() {
  let readmeWindow = document.getElementById("readme-window");
  readmeWindow.classList.toggle("hidden");
}

// Open README.txt when clicking the icon
document.getElementById("readme-icon").addEventListener("click", function() {
  toggleReadme();
});


document.getElementById("wallpaper-select").disabled = false;

//Change Background Image
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");  // Debugging line

  let wallpaperSelect = document.getElementById("wallpaper-select");
  if (!wallpaperSelect) {
      console.error("Wallpaper select element not found!");
      return;
  }

  wallpaperSelect.addEventListener("change", function () {
      let selectedWallpaper = this.value;
      console.log("Selected wallpaper:", selectedWallpaper);  // Debugging
      document.body.style.backgroundImage = `url('assets/wallpapers/${selectedWallpaper}')`;
  });
});

document.getElementById("wallpaper-select").addEventListener("click", function () {
  console.log("Dropdown clicked!");
});

// Open GitHub repositories when clicking "Projects"
document.getElementById("projects-option").addEventListener("click", function () {
  window.open("https://github.com/dausenm?tab=repositories", "_blank");
});

//Clicking icons opens their respective windows
document.getElementById("nvntry-icon").addEventListener("click", () => {
  document.getElementById("nvntry-window").classList.toggle("hidden");
});

document.getElementById("movemint-icon").addEventListener("click", () => {
  document.getElementById("movemint-window").classList.toggle("hidden");
});

document.getElementById("nocturnal-icon").addEventListener("click", () => {
  document.getElementById("nocturnal-window").classList.toggle("hidden");
});

document.getElementById("experience-icon").addEventListener("click", () => {
  document.getElementById("experience-window").classList.toggle("hidden");
});

document.getElementById("about-icon").addEventListener("click", () => {
  document.getElementById("about-window").classList.toggle("hidden");
});
