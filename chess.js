
const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function moveDownward (currentRow, currentColumn, steps) {
    const moves = [];
    for (let row = currentRow - 1; row >= Math.max(1, currentRow - steps); row--) {
        moves.push(`${currentColumn}${row}`);
    }
    return sortMoves(moves);
}

function moveUpward (currentRow, currentColumn, steps) {
    const moves = [];
    for (let row = currentRow + 1; row <= Math.min(8, currentRow + steps); row++) {
        moves.push(`${currentColumn}${row}`);
    }
    return moves;
}

function moveRight (currentRow, currentColumn, steps) {
    const moves = [];
    for (let column = currentColumn + 1; column <= Math.min(7, currentColumn + steps); column++) {
        moves.push(`${cols[column]}${currentRow}`);
    }
    return moves;
}

function moveLeft (currentRow, currentColumn, steps) {
    const moves = [];
    for (let column = currentColumn - 1; column >= Math.max(0, currentColumn - steps); column--) {
        moves.push(`${cols[column]}${currentRow}`);
    }
    return sortMoves(moves);
}

function moveDigonalRightDownward (currentRow, currentColumn, steps) {
    const moves = [];
    for (let column = currentColumn + 1, row = currentRow + 1; column <= Math.min(7, currentColumn + steps) && row <= Math.min(8, currentRow + steps); column ++, row ++) {
        moves.push(`${cols[column]}${row}`);
    }
    return moves;
}

function moveDigonalLeftDownward (currentRow, currentColumn, steps) {
    const moves = [];
    for (let column = currentColumn - 1, row = currentRow + 1; column >= Math.max(0, currentColumn - steps) && row <= Math.min(8, currentRow + steps); column--, row++) {
        moves.push(`${cols[column]}${row}`);
    }
    return moves;
}

function moveDigonalRightUpward (currentRow, currentColumn, steps) {
    const moves = [];
    for (let column = currentColumn + 1, row = currentRow - 1; column <= Math.min(7, currentColumn + steps) && row >= Math.max(1, currentRow - steps); column++, row--) {
        moves.push(`${cols[column]}${row}`);
    }
    return moves;
}

function moveDigonalLeftUpward (currentRow, currentColumn, steps) {
    const moves = [];
    for (let column = currentColumn - 1, row = currentRow - 1; column >= Math.max(0, currentColumn - steps) && row >= Math.max(1, currentRow - steps); column--, row--) {
        moves.push(`${cols[column]}${row}`);
    }
    return moves;
}

function getMoves (piece, position) {
    let [column, row] = position.split("");
    const columnIndex = cols.indexOf(column);
    if (row < 1 || row > 8 || columnIndex === -1) {
        console.error("Invalid position"); 
        return;
    }
    if (! (['King', 'Queen', 'Pawn'].includes(piece)))  {
        console.error("Invalid piece");
        return;
    }
    
    let result;

    switch (piece) {  
        case 'King' : 
        console.log('inside king')
            result = [
                ... moveLeft(Number(row), columnIndex, 1),
                ... moveRight(Number(row), columnIndex, 1),
                ... moveUpward(Number(row), column, 1),
                ... moveDownward(Number(row), column, 1),
                ... moveDigonalRightDownward(Number(row), columnIndex, 1),
                ... moveDigonalLeftDownward(Number(row), columnIndex, 1),
                ... moveDigonalRightUpward(Number(row), columnIndex, 1),
                ... moveDigonalLeftUpward(Number(row), columnIndex, 1),
            ]
            return result;   
        
        case 'Queen' : 
            result = [
                ... moveLeft(Number(row), columnIndex, 7),
                ... moveRight(Number(row), columnIndex, 7),
                ... moveDownward(Number(row), column, 7),
                ... moveUpward(Number(row), column, 7),
                ... moveDigonalRightDownward(Number(row), columnIndex, 7),
                ... moveDigonalLeftDownward(Number(row), columnIndex, 7),
                ... moveDigonalRightUpward(Number(row), columnIndex, 7),
                ... moveDigonalLeftUpward(Number(row), columnIndex, 7),
            ];
            return result; 

        case 'Pawn' : 
            result = [
                ... moveUpward(Number(row), column, 1),
            ]
            return result;
    }
}

function sortMoves (moves) {
    moves.sort((a, b) => {
    const [colA, rowA] = [a[0], Number(a.slice(1))];
    const [colB, rowB] = [b[0], Number(b.slice(1))];

    if (rowA === rowB) {
        return cols.indexOf(colA) - cols.indexOf(colB);
    }
    return rowA - rowB;
    });
    return moves;
}

const args = process.argv.slice(2);

const piece = args[0];
const position = args[1];
const moves = getMoves(piece, position);
console.log(moves);