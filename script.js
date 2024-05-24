const submitButton = document.getElementById('submitButton');
const characterInput = document.getElementById('characterInput');
const strokeOrderContainer = document.getElementById('stroke-order-container');

submitButton.addEventListener('click', () => {
  const character = characterInput.value.trim();

  if (character.length !== 1) {
    alert('Please enter a single Japanese character.');
    return;
  }

  // Fetch stroke order data for the character
  fetch(`https://mazii.net/zh-TW/search/kanji/jatw/${character}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        alert('Character not found.');
        return;
      }

      const strokeOrder = data[0].stroke_order;

      // Clear existing stroke order diagrams
      strokeOrderContainer.innerHTML = '';

      // Create and display stroke order diagrams
      strokeOrder.forEach((stroke, index) => {
        const strokeOrderDiagram = document.createElement('div');
        strokeOrderDiagram.classList.add('stroke-order-diagram');
        strokeOrderDiagram.textContent = index + 1;

        // Add additional styling or functionality for each stroke diagram as needed

        strokeOrderContainer.appendChild(strokeOrderDiagram);
      });
    })
    .catch(error => {
      console.error('Error fetching stroke order data:', error);
      alert('An error occurred while fetching stroke order data.');
    });
});
