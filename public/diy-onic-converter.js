const selectorList = ["p"];
const prefixLength = 3;

/**
 * Implement your converter function here.
 */
const diyOnicConverter = (textContentContainerSelector) => {
  const container = document.querySelector(textContentContainerSelector);
  console.log("Performing bionic reading conversion on:", container);

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
      // us create any element we want so `text` will work just fine and the `b` will be bold per html spec.
      // But for grins we'll add some css selectors and style it as well.
      const textNode = document.createElement("text");
      const newText = document.createElement("b");
      newText.style = "font-weight: bold;";

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
