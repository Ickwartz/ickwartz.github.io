class CreateHtml {
    constructor() {}

    /**
     * @description 
     * Creates Html Element with given Tag, Attributes and text, provide empty values where not needed.
     * Enter Attributes in form [[attributeName1, value1], [attributeName2, value2]]
     * @param {string} tag 
     * @param {*} attributes 
     * @param {string} text 
     * 
     * @returns {HTMLElement}
     */
     createHtmlElement(tag, attributes, text) {
        
        let element = document.createElement(tag);
        for (let attribute of attributes) {
            element.setAttribute(attribute[0], attribute[1]);
        }
        element.textContent = text;
        return element;
    }
}

export {CreateHtml};