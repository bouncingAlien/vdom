import render from './render';

const diffAttributes(oldAttr, newAttr){

}

const diffChildren(oldChildren, newChildren){

}

const diff = (vOldNode, vNewNode) => {
    if(vNewNode === undefined) {
        return $node => {
            $node.remove();
            return undefined;
        }
    };

    // handle text nodes
    if(typeof vOldNode === 'string' || typeof vNewNode === 'string'){
        if(vOldNode !== vNewNode){
            return $node => {
                const $newNode = render(vNewNode);
                $node.replaceWith($newNode);
                return $newNode;
            }
        } else {
            return $node => {}
        }
    }

    // handle element nodes
    if(vOldNode.tagName !== vNewNode.tagName) {
        return $node => {
            const $newNode = render(vNewNode);
            $node.replaceWith($newNode);
            return $newNode;
        }
    };

    const patchAttr = diffAttributes(vOldNode.attr, vNewNode.attr);

    const patchChildren = diffChildren(vOldNode.children, vNewNode.children);
    
    return $node => {
        patchAttr($node);
        patchChildren($node);
    };
}

export default diff;