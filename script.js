async function fetchDataAndRenderTable() {
    try {
        const response = await fetch('data.json');  // 웹앱 URL 대신 로컬의 data.json 파일을 읽어옴
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const table = document.querySelector('#data-table');
    table.innerHTML = ''; // 기존 테이블 내용을 지웁니다.

    data.tableData.forEach((row, rowIndex) => {
        const tr = table.insertRow();
        row.forEach((cell, cellIndex) => {
            let skipCell = false;
            let td;

            data.mergedCells.forEach((mergedCell) => {
                if (
                    rowIndex >= mergedCell.row &&
                    rowIndex < mergedCell.row + mergedCell.numRows &&
                    cellIndex >= mergedCell.column &&
                    cellIndex < mergedCell.column + mergedCell.numColumns
                ) {
                    if (rowIndex === mergedCell.row && cellIndex === mergedCell.column) {
                        td = tr.insertCell();
                        td.rowSpan = mergedCell.numRows;
                        td.colSpan = mergedCell.numColumns;
                    } else {
                        skipCell = true;
                    }
                }
            });

            if (!skipCell) {
                if (!td) td = tr.insertCell();
                td.textContent = cell.text;
                td.style.backgroundColor = data.backgrounds[rowIndex][cellIndex];
                td.style.color = data.fontColors[rowIndex][cellIndex];
                td.style.textAlign = data.horizontalAlignments[rowIndex][cellIndex];
                td.style.verticalAlign = data.verticalAlignments[rowIndex][cellIndex];
                td.style.fontWeight = data.fontWeights[rowIndex][cellIndex];
                td.style.fontStyle = data.fontStyles[rowIndex][cellIndex];
                td.style.fontSize = data.fontSizes[rowIndex][cellIndex] + 'px';
                if (data.strikethroughs[rowIndex][cellIndex]) {
                    td.style.textDecoration = 'line-through';
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchDataAndRenderTable);
