let checkedMap = [];

function createCheckedMap(size) {
    return Array(size).fill([]).map(x => Array(size).fill(null));
}

function markAsImpossible(cords) {
    checkedMap[cords[0]][cords[1]] = false;
}

function markRowAsImpossible([x, y], [wX, wY]) {
    if (x === wX) {
        if (y < wY) {
            while (y !== wY) {
                checkedMap[x][wY] = false;
                wY = -1;
            }
        } else {
            while (y !== wY) {
                checkedMap[x][wY] = false;
                wY = +1;
            }
        }
    } else {
        if (x < wX) {
            while (x !== wX) {
                checkedMap[wX][y] = false;
                wX = -1;
            }
        } else {
            while (x !== wX) {
                checkedMap[wX][y] = false;
                wX = +1;
            }
        }
    }
}

function getUncheckedCoords() {
    for (let x in checkedMap) {
        for (let y in checkedMap[x]) {
            if (checkedMap[x][y] === null) {
                return [x, y];
            }
        }
    }
}

// const map = [
//     [0, 1, 1, 0],
//     [1, 1, 0, 0],
//     [0, 1, 0, 1],
//     [1, 1, 1, 1],
// ];
// const downfallInfo = {top: 0, right: 1, bottom: 1, left: 0};

module.exports = function solution(dron, downfallInfo, mapSize) {
    checkedMap = createCheckedMap(mapSize);

    function checkAnother(resolve) {
        const cords = getUncheckedCoords();
        return dron.move(cords)
            .then((result) => {
                if (!result) {
                    markAsImpossible(cords);
                }

                return Promise.all([dron.top(), dron.right(), dron.bottom(), dron.left(),])
                    .then(([top, right, bottom, left]) => {
                        if (top !== downfallInfo.top) {
                            if (downfallInfo.top > top) {
                                markRowAsImpossible(cords, [cords[x, y - top]]);
                            } else {
                                markAsImpossible(cords);
                            }
                            return checkAnother();
                        }

                        if (bottom !== downfallInfo.bottom) {
                            if (downfallInfo.bottom > bottom) {
                                markRowAsImpossible(cords, [cords[x, y + bottom]]);
                            } else {
                                markAsImpossible(cords);
                            }
                            return checkAnother();
                        }

                        if (right !== downfallInfo.right) {
                            if (downfallInfo.right > right) {
                                markRowAsImpossible(cords, [cords[x + right, y]]);
                            } else {
                                markAsImpossible(cords);
                            }
                            return checkAnother();
                        }

                        if (left !== downfallInfo.left) {
                            if (downfallInfo.left > left) {
                                markRowAsImpossible(cords, [cords[x - left, y]]);
                            } else {
                                markAsImpossible(cords);
                            }
                            return checkAnother();
                        }

                        resolve(cords);
                    })
            });
    };


    return new Promise(((resolve) => {
        return checkAnother(resolve);
    }))
}













let checkedMap = [];

function createCheckedMap(size) {
    return Array(size).fill([]).map(x => Array(size).fill(null));
}

function markAsImpossible(cords) {
    checkedMap[cords[0]][cords[1]] = false;
}

function getUncheckedCoords() {
    for (let x = 0; x < checkedMap.length; x++) {
        for (let y = 0; y < checkedMap[x].length; y++) {
            if (checkedMap[x][y] === null) {
                return [x, y];
            }
        }
    }
}

module.exports = function solution(dron, downfallInfo, mapSize) {
    checkedMap = createCheckedMap(mapSize);

    function checkAnother() {
        const cords = getUncheckedCoords();
        return dron.move(cords)
            .then((result) => {
                if (!result) {
                    markAsImpossible(cords);
                    return checkAnother();
                }

                return Promise.all([dron.top(), dron.right(), dron.bottom(), dron.left()])
                    .then(([top, right, bottom, left]) => {
                        if (
                            top !== downfallInfo.top
                            || bottom !== downfallInfo.bottom
                            || right !== downfallInfo.right
                            || left !== downfallInfo.left
                        ) {
                            markAsImpossible(cords);
                            return checkAnother();
                        }
                        return cords;
                    })
            });
    };


    return checkAnother();
}
