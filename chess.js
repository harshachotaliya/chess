
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

/**
 *
 * @param {"King|Queen|Pawn"} piece - Chess pieces
 * @param {string} position - Cell number on the chessboard
 * @returns {string} List of possible cells in which the chess piece can move from its current position.
 * @throws {Error} If the input position or piece is invalid.
 *
 */
function getMoves (piece, position) {
    let [column, row] = position.split("");
    column = column.toUpperCase();
    row = Number(row);
    const columnIndex = cols.indexOf(column);
    if (row < 1 || row > 8 || columnIndex === -1) {
        throw new Error("Please input valid position");
    }
    if (! (['King', 'Queen', 'Pawn'].includes(piece)))  {
        throw new Error("Please input valid piece");
    }
    
    let result;

    switch (piece) {  
        case 'King' : 
            result = [
                ... moveLeft(row, columnIndex, 1),
                ... moveRight(row, columnIndex, 1),
                ... moveUpward(row, column, 1),
                ... moveDownward(row, column, 1),
                ... moveDigonalRightDownward(row, columnIndex, 1),
                ... moveDigonalLeftDownward(row, columnIndex, 1),
                ... moveDigonalRightUpward(row, columnIndex, 1),
                ... moveDigonalLeftUpward(row, columnIndex, 1),
            ]
            return result;   
        
        case 'Queen' : 
            result = [
                ... moveLeft(row, columnIndex, 7),
                ... moveRight(row, columnIndex, 7),
                ... moveDownward(row, column, 7),
                ... moveUpward(row, column, 7),
                ... moveDigonalRightDownward(row, columnIndex, 7),
                ... moveDigonalLeftDownward(row, columnIndex, 7),
                ... moveDigonalRightUpward(row, columnIndex, 7),
                ... moveDigonalLeftUpward(row, columnIndex, 7),
            ];
            return result; 

        case 'Pawn' : 
            result = [
                ... moveUpward(row, column, 1),
            ]
            return result;
    }
}

/**
 * Sorts a list of chess moves.
 *
 * @param {string[]} moves - Array of moves
 * @returns {string[]} Sorted array of moves
 *
 */
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
if (args.length < 2) {
  console.log("Usage: node chess.js <Piece> <Position> OR docker run --rm chess <Piece> <Position>");
  process.exit(1);
}
const piece = args[0];
const position = args[1];

try {
  const moves = getMoves(piece, position);
  console.log(`Possible cells for ${piece} at ${position}:`);
  console.log(moves.join(", "));
} catch (err) {
  console.error("Error:", err.message);
}