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

  console.log(formatType);

  const selectedElements = selectorList
    .map((selector) => Array.from(container.querySelectorAll(selector)))
    .flat();
  // console.log(selectedElements);

  selectedElements.forEach((element) => {
    const parentNode = element.parentNode;
    let returnContent = document.createElement(element.tagName); // Duplicate the orgional element.
    const elementText = element.textContent;

    elementText.split(" ").forEach((text) => {
      // Create two nodes, the outer for containing the entire text and the inner for bolding. HTML 5 lets us
      // us create any element we want so `text` will work just fine and the `innerText` will be bold per formayType style.
      const textNode = document.createElement("text");
      const newText = document.createElement("innerText");
      switch (formatType) {
        case "bold":
          newText.style = "font-weight: bold;";
          break;
        case "italic":
          newText.style = "font-style: italic;";
          break;
        case "underline":
          newText.style = "text-decoration: underline;";
          break;
      }

      // Grab the prefix length of the text to create the new bold node
      newText.textContent = text.slice(0, prefixLength);

      textNode.appendChild(newText);
      textNode.append(text.slice(prefixLength, text.length) + " "); //Append the rest of the text

      returnContent.appendChild(textNode);
    });
    parentNode.replaceChild(returnContent, element);
  });
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;

function addControlsOverlay() {}
