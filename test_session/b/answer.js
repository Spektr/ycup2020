module.exports = function (str) {
    const matches = str.match(/([^a-z]+)/g);

    // block  0(_) mod 1(__) elem
    if(matches.length === 2){
        return {mod:matches[0], elem: matches[1]};
    }

    // block  0(_) mod 1(_) mod 2(__) elem
    if (matches[0] === matches[1]) {
        return {mod:matches[0], elem: matches[2]};
    }

    // block  0(__) elem   1(_) mod 2(_) mod
    return {mod:matches[1], elem: matches[0]};
}
