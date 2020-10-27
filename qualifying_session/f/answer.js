module.exports = function (input) {
    const aliases = input.aliases;
    const modules = input.modules;
    const allPaths = {};

    function getFullPath(str) {
        for (let key in aliases) {
            if (str.includes(key)) {
                return str.replace(key, aliases[key]);
            }
        }
        return str.replace('./', input.absoluteRepoPath+ '/');
    }

    function markUsability(str){
        allPaths[getFullPath(str)]= true;
        const module = modules.find((module)=>(getFullPath(module.file) === getFullPath(str)));
        module.deps.forEach((dep)=> markUsability(dep));
    }

    // get all paths
    input.modules.forEach(item => {
        allPaths[getFullPath(item.file)] = false;
        item.deps.forEach((dep) => {
            allPaths[getFullPath(dep)] = false;
        })
    });

    // mark usable paths
    input.entrypoints.forEach(ep => {
        markUsability(ep);
    })

    // get correct view
    return Object.entries(allPaths).reduce((acc, item)=>{
        return item[1] ? acc : acc.concat([item[0]]);
    }, []);
}
