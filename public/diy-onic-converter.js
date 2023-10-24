/**
 * Implement your converter function here.
 */
const diyOnicConverter = (textContentContainerSelector, options = {}) => {
  const {
    selectorList = ["p"],
    prefixLength = 3,
    formatType = "bold",
  } = options;
  const container = document.querySelector(textContentContainerSelector);
  console.log("Performing bionic reading conversion on:", container);

  const newStyleSheet = document.createElement("style");
  newStyleSheet.textContent = `
    ${textContentContainerSelector}.bonic-toggle-on .bionic-orgional-text {
      display: none;
    }
    ${textContentContainerSelector}:not(.bonic-toggle-on) .bionic-transformed-text {
      display: none;
    }

    ${textContentContainerSelector} .bionic-bold {
      font-weight: bold;
    }

    ${textContentContainerSelector} .bionic-italic {
      font-style: italic;
    }

    ${textContentContainerSelector} .bionic-underline {
      text-decoration: underline;
    }

    ${textContentContainerSelector} .bionic-highlight {
      background-color: yellow;
    }
  `;
  const head = document.querySelector("head");
  head.appendChild(newStyleSheet);

  const selectedElements = selectorList
    .map((selector) => Array.from(container.querySelectorAll(selector)))
    .flat();
  // console.log(selectedElements);

  selectedElements.forEach((element) => {
    element.className = "bionic-orgional-text";
    let returnContent = document.createElement(element.tagName); // Duplicate the orgional element.
    const elementText = element.textContent;

    elementText.split(" ").forEach((text) => {
      // Create two nodes, the outer for containing the entire text and the inner for bolding. HTML 5 lets us
      // us create any element we want so `text` will work just fine and the `innerText` will be bold per formayType style.
      const textNode = document.createElement("text");
      const newText = document.createElement("innerText");
      switch (formatType) {
        case "bold":
          newText.className = "bionic-bold";
          break;
        case "italic":
          newText.className = "bionic-italic";
          break;
        case "underline":
          newText.className = "bionic-underline";
          break;
      }

      // Grab the prefix length of the text to create the new bold node
      newText.textContent = text.slice(0, prefixLength);

      textNode.appendChild(newText);
      textNode.className = "bionic-transformed-text";
      textNode.append(text.slice(prefixLength, text.length) + " "); //Append the rest of the text

      returnContent.appendChild(textNode);
    });
    element.after(returnContent);
  });

  container.className = container.className += " bonic-toggle-on";
  addControlsOverlay(container);
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;

// Create an interactive panel to work with the controls on page. We can toggle the text and decoration of highlighted text
function addControlsOverlay(container) {
  const existingClasses = container.className;
  const body = document.querySelector("body");
  const newContainer = document.createElement("div");
  newContainer.style = `
    background-color: white;
    border: 1px solid black;
    padding: 1em;
    margin-right: 2em;
    margin-bottom: 2em;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 100;
    max-width: 100%;
    width: 24em;
  `;

  body.appendChild(newContainer);

  const bonicTitle = document.createElement("h3");
  bonicTitle.textContent = "Bionic Text Transform";
  bonicTitle.style = `margin: 0; padding: 0;`;
  newContainer.appendChild(bonicTitle);

  const controlPanel = document.createElement("div");
  controlPanel.style = `margin-top: 1em;`;
  newContainer.appendChild(controlPanel);

  // Create checkbox
  const toggleDisplay = document.createElement("input");
  toggleDisplay.type = "checkbox";
  toggleDisplay.id = "toggleDisplay";
  toggleDisplay.name = "toggleDisplay";
  toggleDisplay.checked = true;
  toggleDisplay.onchange = function (event) {
    // Toggle the selectors for visibility
    container.classList.toggle("bonic-toggle-on");
  };

  // Create label for checkbox
  const toggleLabel = document.createElement("label");
  toggleLabel.htmlFor = "toggleDisplay";
  toggleLabel.style = `margin-right: 8px`;
  toggleLabel.appendChild(document.createTextNode("Toggle Display:"));

  // Create select
  const format = document.createElement("select");
  format.id = "format";
  format.name = "format";
  format.value = "bold";
  format.onchange = function (event) {
    const textNodes = container.querySelectorAll("innerText");
    textNodes.forEach((node) => {
      node.className = `bionic-${event.target.value}`;
    });
  };

  // Create options for select
  const options = ["bold", "underline", "italic", "highlight"];
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("option");
    option.value = options[i];
    option.text = options[i].charAt(0).toUpperCase() + options[i].slice(1);
    format.appendChild(option);
  }

  // Create label for select
  const formatLabel = document.createElement("label");
  formatLabel.htmlFor = "format";
  formatLabel.style = `margin-right: 8px`;
  formatLabel.appendChild(document.createTextNode("Format:"));

  // Append elements to container
  controlPanel.appendChild(toggleLabel);
  controlPanel.appendChild(toggleDisplay);
  controlPanel.appendChild(document.createElement("br"));
  controlPanel.appendChild(formatLabel);
  controlPanel.appendChild(format);
}

window.addControlsOverlay = addControlsOverlay;
