document.querySelectorAll('.line-dot').forEach((dot, index) => {
    const title = dot.getAttribute('data-title');
    const sub1 = dot.getAttribute('data-sub1');
    const sub2 = dot.getAttribute('data-sub2');
    const sub3 = dot.getAttribute('data-sub3');
  
    // Create main dot content
    const titleDiv = document.createElement('div');
    titleDiv.className = 'project-details';
    titleDiv.textContent = title;
    dot.appendChild(titleDiv);
    
    
  
    // Sub-dots information
    const subDotData = [sub1, sub2, sub3];
    const subDotClasses = ['coding', 'professional', 'personal'];
    const subDotPositions = [
      { x: -23, y: -200 },
      { x: -23, y: -400 },
      { x: -23, y: 200 },
      { x: -23, y: 400 }
    ];
    
    subDotData.forEach((subTitle, i) => {
      const subDot = document.createElement('div');
      subDot.className = `sub-dot ${subDotClasses[i]}`;
      subDot.style.transform = `translate(0, 0) scale(0)`; // Initial state
    
      const subContent = document.createElement('div');
      subContent.className = 'project-details';
      subContent.innerHTML = `<h3>${i + 1}</h3><p>${subTitle}</p>`;
      subDot.appendChild(subContent);
    
      dot.appendChild(subDot);
    
      // Add hover event to animate sub-dots vertically
      dot.addEventListener('mouseover', () => {
      const subDots = dot.querySelectorAll('.sub-dot');
      subDots.forEach((subDot, j) => {
        subDot.style.opacity = '1'; // Make sure sub-dots become visible
        subDot.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        subDot.style.transform = `translate(${subDotPositions[j].x}px, ${subDotPositions[j].y}px) scale(1)`; // Position sub-dots vertically
      });
      });
    
      dot.addEventListener('mouseleave', () => {
      const subDots = dot.querySelectorAll('.sub-dot');
      subDots.forEach(subDot => {
        subDot.style.opacity = '0'; // Hide sub-dots when not hovered
        subDot.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        subDot.style.transform = `translate(0, 0) scale(0)`; // Reset position and scale
      });
      });
    });
  });
  