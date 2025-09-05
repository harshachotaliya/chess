# Chess Moves Generator

A simple Node.js program that simulates an empty chessboard and the movements of three types of
chess pieces - **King**, **Queen**, or **Pawn** for 8 x 8 grid with 64 cells with 8 rows (1, 2, 3.... 8) and 8 columns (A, B, C.... H).

1. Pawn- It can only move 1 step at a time, in the vertical forward direction.
2. King- It can only move 1 step at a time, in all 8 directions (vertical, horizontal and diagonal)
3. Queen- It can move across the board in all 8 directions.

Inputs and Outputs to program:

● Input- The input string to the program will be the Type of chess piece and it’s position (cell number) on the
chessboard. E.g. Pawn, G1

● Output- The output will be a string of all possible cells in which the chess piece can
move from its current position. For the above input, the output would be G2.

Examples -

*Input* - Queen, E4
*Output* - A4, B4, C4, D4, F4, G4, H4, E1, E2, E3, E5, E6, E7, E8, A8, B7, C6, D5, F3, G2, H1, B1, C2, D3, F5, G6, H7

*Input* - Pawn, G1
*Output* - G2

*Input* - King, D5
*Output* - C4, C5, C6, D4, D6, E4, E5, E6


---

## 📦 Prerequisites
- Node.js (v14+ recommended)
- Docker (optional, if you want to run via container)

---

## ▶️ Running with Node.js

### 1. Clone the repo.
```bash
git clone https://github.com/harshachotaliya/chess.git
cd chess
```

### 2. Run the script
```bash
node chess.js <Piece> <Position>
```
---

## ▶️ Running with Docker
### 1. Build the image
```bash
docker build -t chess .
```

### 2. Run the container
```bash
docker run --rm chess <Piece> <Position>
```