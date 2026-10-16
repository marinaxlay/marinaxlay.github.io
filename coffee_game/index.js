// Get references to the color, design, drink, accessory and sweet elements
const colorEl = document.getElementById("color");
const designEl = document.getElementById("design");
const drinkEl = document.getElementById("drink");
const colorOptionsContainer = document.getElementById('color-options');
const designOptionsContainer = document.getElementById('design-options');
const drinkOptionsContainer = document.getElementById('drink-options');

// Define the image paths for the colors, designs, drinks, accessories and sweets
const colorSources = {
  "color-1": "resources/color/black.png",
  "color-2": "resources/color/blue.png",
  "color-3": "resources/color/green.png",
  "color-4": "resources/color/orange.png",
  "color-5": "resources/color/pink.png",
  "color-6": "resources/color/purple.png",
  "color-7": "resources/color/red.png",
  "color-8": "resources/color/white.png",
  "color-9": "resources/color/yellow.png",
};

const designSources = {
  "design-0": "resources/design/none.png",
  "design-1": "resources/design/clouds.png",
  "design-2": "resources/design/flowers.png",
  "design-3": "resources/design/frog.png",
  "design-4": "resources/design/plants.png",
  "design-5": "resources/design/strawberries.png",
};

const drinkSources = {
  "drink-0": "resources/drink/none.png",
  "drink-1": "resources/drink/coffee.png",
  "drink-2": "resources/drink/chai-latte.png",
  "drink-3": "resources/drink/matcha-latte.png",
  "drink-4": "resources/drink/pink-latte.png",
  "drink-5": "resources/drink/ube-latte.png",
  "drink-6": "resources/drink/green-tea.png",
};

// Initialize the state (start with color options visible)
let currentCategory = 'color'; // Keep track of the current active category

// Function to show color options
function showColorOptions() {
    colorOptionsContainer.style.display = 'grid';
    designOptionsContainer.style.display = 'none';
    drinkOptionsContainer.style.display = 'none';

    currentCategory = 'color';
    updateButtonStyles('color');
}

// Function to show design options
function showDesignOptions() {
    colorOptionsContainer.style.display = 'none';
    designOptionsContainer.style.display = 'grid';
    drinkOptionsContainer.style.display = 'none';

    currentCategory = 'design';
    updateButtonStyles('design');
}

// Function to show drink options
function showDrinkOptions() {
    colorOptionsContainer.style.display = 'none';
    designOptionsContainer.style.display = 'none';
    drinkOptionsContainer.style.display = 'grid';

    currentCategory = 'drink';
    updateButtonStyles('drink');
}

// Update color
function updateColorElement(colorSourceKey) {
    colorEl.src = colorSources[colorSourceKey];
}

// Update design
function updateDesignElement(designSourceKey) {
    designEl.src = designSources[designSourceKey];
}

// Update drink
function updateDrinkElement(drinkSourceKey) {
    drinkEl.src = drinkSources[drinkSourceKey];
}

// Function to update the styles of buttons based on the selected category
function updateButtonStyles(category) {

// Reset background color for all buttons
document.getElementById('color-button').style.backgroundColor = '';
document.getElementById('color-button').style.color = '';
document.getElementById('color-button').style.border = '';
document.getElementById('design-button').style.backgroundColor = '';
document.getElementById('design-button').style.color = '';
document.getElementById('design-button').style.border = '';
document.getElementById('drink-button').style.backgroundColor = '';
document.getElementById('drink-button').style.color = '';
document.getElementById('drink-button').style.border = '';

// Set the background color of the selected category button
if (category === 'color') {
  document.getElementById('color-button').style.backgroundColor = '#593b0bff';
  document.getElementById('color-button').style.color = '#fff2dbff';
  document.getElementById('color-button').style.border = 'solid 2px';
} else if (category === 'design') {
  document.getElementById('design-button').style.backgroundColor = '#593b0bff';
  document.getElementById('design-button').style.color = '#fff2dbff';
  document.getElementById('design-button').style.border = 'solid 2px';
} else if (category === 'drink') {
  document.getElementById('drink-button').style.backgroundColor = '#593b0bff';
  document.getElementById('drink-button').style.color = '#fff2dbff';
  document.getElementById('drink-button').style.border = 'solid 2px';
}
}

// Event listeners
document.getElementById('color-button').addEventListener("click", showColorOptions);
document.getElementById('design-button').addEventListener("click", showDesignOptions);
document.getElementById('drink-button').addEventListener("click", showDrinkOptions);

// Event listeners for the color update
document.getElementById('color-1').addEventListener("click", () => updateColorElement('color-1'));
document.getElementById('color-2').addEventListener("click", () => updateColorElement('color-2'));
document.getElementById('color-3').addEventListener("click", () => updateColorElement('color-3'));
document.getElementById('color-4').addEventListener("click", () => updateColorElement('color-4'));
document.getElementById('color-5').addEventListener("click", () => updateColorElement('color-5'));
document.getElementById('color-6').addEventListener("click", () => updateColorElement('color-6'));
document.getElementById('color-7').addEventListener("click", () => updateColorElement('color-7'));
document.getElementById('color-8').addEventListener("click", () => updateColorElement('color-8'));
document.getElementById('color-9').addEventListener("click", () => updateColorElement('color-9'));

// Event listeners for the design update
document.getElementById('design-0').addEventListener("click", () => updateDesignElement('design-0'));
document.getElementById('design-1').addEventListener("click", () => updateDesignElement('design-1'));
document.getElementById('design-2').addEventListener("click", () => updateDesignElement('design-2'));
document.getElementById('design-3').addEventListener("click", () => updateDesignElement('design-3'));
document.getElementById('design-4').addEventListener("click", () => updateDesignElement('design-4'));
document.getElementById('design-5').addEventListener("click", () => updateDesignElement('design-5'));

// Event listeners for the drink update
document.getElementById('drink-0').addEventListener("click", () => updateDrinkElement('drink-0'));
document.getElementById('drink-1').addEventListener("click", () => updateDrinkElement('drink-1'));
document.getElementById('drink-2').addEventListener("click", () => updateDrinkElement('drink-2'));
document.getElementById('drink-3').addEventListener("click", () => updateDrinkElement('drink-3'));
document.getElementById('drink-4').addEventListener("click", () => updateDrinkElement('drink-4'));
document.getElementById('drink-5').addEventListener("click", () => updateDrinkElement('drink-5'));
document.getElementById('drink-6').addEventListener("click", () => updateDrinkElement('drink-6'));