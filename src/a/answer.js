function pushResult(weight, weights) {
    for (let i = 0; i < weights.length; i++) {
        if (weight < weights[i]) {
            weights.splice(i, 0 , weight);
            return;
        }
    }
}

function findLatestWeight(weights) {
    const immutableArray = [...weights];
    immutableArray.sort((a, b) => a - b);

    while(immutableArray.length > 1){
        const first = immutableArray.pop();
        const second = immutableArray.pop();

        if(first !== second){
            pushResult(first - second, immutableArray);
        }
    }

    return immutableArray.pop() || 0;
}

module.exports = findLatestWeight;
