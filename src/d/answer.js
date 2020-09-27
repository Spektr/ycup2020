function prepareString(value){
    return value.replace(/\n+/g,'').replace(/\ +/g,' ').trim();
}

function getColumnStyles(tableElement) {
    const colgroup = tableElement.getElementsByTagName('colgroup');

    if (!colgroup.length) {
        return Array
            .from(tableElement.rows[0].cells)
            .map((cell) => ':---');
    }

    return Array
        .from(colgroup[0].children)
        .map((col) => {
            switch (col.align) {
                case "center":
                    return ':---:';
                case "right":
                    return '---:';
                default:
                    return ':---';
            }
        })
}

function solution(input) {
    const element = document.createElement('div');
    element.innerHTML = input;
    const tableElement = element.firstChild;

    const tableData = Array
        .from(tableElement.rows)
        .map((row) => {
            return Array
                .from(row.cells)
                .map((cell) => {
                    return cell.tagName === 'TH'
                        ? `**${prepareString(cell.innerText)}**`
                        : prepareString(cell.innerText);
                })
        })

    tableData.splice(1, 0, getColumnStyles(tableElement));

    return tableData.map((row) => {
        return `| ${row.join(' | ')} |\n`;
    }).join('');
}
