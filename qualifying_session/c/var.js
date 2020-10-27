module.exports = (function () {
    let prevFrames = [];
    let offsetMs = 100;

    function getFrameFor(offset, currentTime) {
        for (let i = prevFrames.length - 1; i > 0; i--) {
            if (currentTime - prevFrames[i].time >= offset) {
                return prevFrames[i].data;
            }
        }
    }

    return function (data, api) {
        let {width, height} = api.getDimensions();
        let currentTime = api.getTime();

        const length = width * height;
        prevFrames.push({time: currentTime, data: data.slice()});
        const res = new Uint8ClampedArray(data.length);
        const red = getFrameFor(0, currentTime);
        const green = getFrameFor(offsetMs, currentTime);
        const blue = getFrameFor(2 * offsetMs, currentTime);
        const allExists = red && green && blue;

        for (let i = 0; i < length; i++) {
            if (allExists) {
                res[4 * i] = red[4 * i];
                res[4 * i + 1] = green[4 * i + 1];
                res[4 * i + 2] = blue[4 * i + 2];
            } else {
                res[4 * i] = data[4 * i];
                res[4 * i + 1] = data[4 * i + 1];
                res[4 * i + 2] = data[4 * i + 2];
            }
            res[4 * i + 3] = 255;
        }

        return Promise.resolve(res);
    };
})();
