const selectorList = ["p"];
const prefixLength = 3;

/**
 * Implement your converter function here.
 */
const diyOnicConverter = (textContentContainerSelector) => {
  const container = document.querySelector(textContentContainerSelector);
  console.log("Performing bionic reading conversion on:", container);

  const selectedElements = Array.from(
    selectorList.map((selector) =>
      Array.from(container.querySelectorAll(selector))
    )
  ).flat();
  // console.log(selectedElements);

  selectedElements.forEach((element) => {
    let returnContent = document.createElement(element.tagName);
    const elementText = element.textContent;

    elementText.split(" ").forEach((text) => {
      const textNode = document.createElement("text");
      const newText = document.createElement("b");

      newText.textContent = text.slice(0, prefixLength);
      textNode.appendChild(newText);
      textNode.append(text.slice(prefixLength, text.length) + " ");

      returnContent.appendChild(textNode);
      container.appendChild(returnContent);
    });
  });
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
