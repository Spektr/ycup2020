function findMaxValues(weights) {
    let first = 0;
    let second = 0;
    let firstId = 0;
    let secondId = 0;

    for (let i = 0; i < weights.length; i++) {
        const cur = weights[i];
        if (cur <= second) {
            continue;
        }

        if (cur >= first) {
            second = first;
            secondId = firstId;
            first = cur;
            firstId = i;
            continue;
        }

        second = cur;
        secondId = i;
    }

    return {first, second, firstId, secondId};
}

function findLatestWeight(weights) {
    const immutableArray = [...weights];

    do {
        const {first, second, firstId, secondId} = findMaxValues(immutableArray);

        if (second === 0 || first === 0) {
            return first;
        }

        if(first === second){
            immutableArray[firstId] = 0;
            immutableArray[secondId] = 0;
            continue;
        }

        immutableArray[firstId] = first - second;
        immutableArray[secondId] = 0;

    } while (true)
}

module.exports = findLatestWeight;
