const renderElement = ({ tagName, attr, children }) => {
    const $el = document.createElement(tagName);

    // set attributes
    for(const [key, value] of Object.entries(attr)){
        $el.setAttribute(key, value);
    }

    // set children
    for( const child of children){
        const $child = render(child);
        $el.appendChild($child);
    }

    return $el;
};

const render = (vNode) => {
    if (typeof vNode === 'string') return document.createTextNode(vNode);
    return renderElement(vNode);
}

export default render;