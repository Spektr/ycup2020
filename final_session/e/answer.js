const cordsArr = [];
function getCords(node, parentNode, prevNode, cords, parentCoords, prevCords){
    const {x, y} = cords;
    const {style, children} = normalize(node);

    cords = {
        x: x,
        y: calculateTop(node, parentNode, prevNode, false, parentCoords, prevCords),
        width: style.width,
        height: style.height
    };

    if(children){
        let prevCords = false;
        for(let i=0; i < children.length; i++){
            prevCords = getCords(
                children[i],
                node,
                children[i-1] || false,
                false,
                cords,
                prevCords,
            );
        }
    }

    cordsArr.push(cords);
    return cords;
}

function calculateTop(node, parentNode, prevNode, cords, parentCoords, prevCords){
    let y = parentCoords.y || 0;
    if(prevNode && parentNode.style.flexDirection === "column"){
        y = prevCords.y + prevNode.style.height;
    }
    return y;
}

function normalize(node){
    if(!node.style.height){
        node.style.height = 0;
    }
    if(!node.style.width){
        node.style.width = 0;
    }
    return node;
}

module.exports = function(root) {
    // Замените этот пример на код вашего алгоритма, чтобы сравнить
    // вывод алгоритма с ожидаемым результатом.
    getCords(root, false, false, {x: 0, y: 0}, false, false);
    return cordsArr;
}
