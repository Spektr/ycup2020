module.exports = function (input) {
    const galaxyRegexp = '([A-Z]{2,8}-\\d{2,8})';
    const systemRegexp = '((?:[A-Z]+)((?!--)[A-Z-])+[A-Z])';
    const planetRegexp = '([A-Z]+)';
    const globalRegexp = '^'+[galaxyRegexp, systemRegexp,planetRegexp].join('/') + ':{(.*)}$';

    const result = [];

    input.forEach((str)=> {
        const matches = str.match(globalRegexp);
        if(matches === null){
            return;
        }

        const allStr = matches[0];
        const galaxy = matches[1];
        const system = matches[2];
        const planet = matches[4];
        const message = matches[5];

        if(/UNDEFINED/.test(planet)){
            return;
        }

        result.push(allStr.replace(/@([^@]+)@/gi, (_, str)=>`<fake>${str}</fake>`));

    });

    return result;
}
