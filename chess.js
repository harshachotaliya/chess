function moveRight (currentRow, currentColumn) {
    const moves = [];
    for (let column = currentColumn + 1; column <= 7; column++) {
        moves.push([currentRow, column]);
    }
    return moves;
}

function moveLeft (currentRow, currentColumn) {
    const moves = [];
    for (let column = currentColumn - 1; column >= 0; column--) {
        moves.push([currentRow, column]);
    }
    return moves;
}

function moveUpward (currentRow, currentColumn) {
    const moves = [];
    for (let row = currentRow - 1; row >= 0; row--) {
        moves.push([row, currentColumn]);
    }
    return moves;
}

function moveDownward (currentRow, currentColumn) {
    const moves = [];
    for (let row = currentRow + 1; row <= 7; row++) {
        moves.push([row, currentColumn]);
    }
    return moves;
}