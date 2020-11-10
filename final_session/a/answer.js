const data = [
    {
        h: 300,
        w: 400,
    },
    {
        h: 300,
        w: 500,
    },
    {
        h: 300,
        w: 600,
    },
];

const frame = {
    h: 200,
    w: 300,
};

function fitToWidth(image, frame) {
    const k = image.w / frame.w;
    const fittedH = image.h /k;

    if(fittedH < frame.h){
        return {
            w:Infinity,
            h:Infinity,
        };
    }

    return {
        w: frame.w,
        h: fittedH,
    };
}

function fitToHeight(image, frame) {
    const k = image.h / frame.h;

    const fittedW = image.w /k;

    if(fittedW < frame.w){
        return {
            w:Infinity,
            h:Infinity,
        };
    }

    return {
        w: fittedW,
        h: frame.h,
    };
}

function getS(image) {
    return image.w * image.h;
}

module.exports = function getBestFitImageIndex(frame, images) {
    const mostFitted = {
        index: 0,
        s: Infinity,
    };

    images.forEach((image, index) => {
        const sW = getS(fitToWidth(image, frame));
        const sH = getS(fitToHeight(image, frame));
        const bestOfS = sW < sH ? sW : sH;

        if(mostFitted.s > bestOfS){
            mostFitted.index = index;
            mostFitted.s = bestOfS;
        }
    })

    return mostFitted.index;
};
