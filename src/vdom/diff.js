import render from './render';

const zipp = (xs, ys) => {
    const zipped = [];
    for(let i = 0; i < Math.min(xs.length, ys.length); i++){
        zipped.push([xs[i], ys[i]]);
    };
    return zipped;
}

const diffAttributes = (oldAttr, newAttr) => {
    const patches = [];
    // set new atributes
    for (const [key, value] of Object.entries(newAttr)){
        patches.push($node => {
            $node.setAttribute(key, value);
            return $node;
        });
    };
    // remove old atributes
    for(const [key, value] of Object.entries(oldAttr)){
        if(!(key in newAttr)){
            $node.removeAttribute(key);
            return $node;
        }
    }
    // return
    return $node => {
        for (const patch of patches){
            patch($node);
        }
    }
}

const diffChildren = (oldChildren, newChildren) => {
    const childPatches = [];
    for (const [oldChild, newChild] of zipp(oldChildren, newChildren)) {
        childPatches.push(diff(oldChild, newChild));
    };

    const additionalPatches = [];
    for(const additionalChild of newChildren.slice(oldChildren.length)){
        additionalPatches.push( $node => {
            $node.appendChild(render(additionalChild));
            return $node;
        });
    }

    return $parent => {
        for(const [patch, child] of zipp(childPatches, $parent.childNodes)){
            patch(child);
        }
        for(const patch of additionalPatches){
            patch($parent);
        }
        return $parent;
    }
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
        return $node;
    };
}

export default diff;