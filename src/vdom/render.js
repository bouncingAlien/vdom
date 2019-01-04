const render = (vNode) => {
    const $el = document.createElement(vNode.tagName);

    // set attributes
    for(const [key, value] of Object.entries(vNode.attr)){
        $el.setAttribute(key, value);
    }

    // set children
    for( const child of vNode.children){
        const $child = render(child);
        $el.appendChild($child);
    }

    return $el;
};

export default render;