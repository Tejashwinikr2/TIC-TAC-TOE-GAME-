document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const moveList = document.getElementById("moveList");
    const resetButton = document.getElementById("reset");
    const moveSound = document.getElementById("moveSound");
    const winSound = document.getElementById("winSound");
    const blast = document.getElementById("blast"); // Winner blast popup

    let board = ["", "", "", "", "", "", "", "", ""]; // Game state
    let currentPlayer = "X"; // Player turn
    let gameActive = true; // Game status
    let moves = []; // Store move history

    // All winning combinations
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Handle cell click
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = Number(cell.getAttribute("data-index"));

        if (board[cellIndex] !== "" || !gameActive) return;

        board[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;

        moveSound.play(); // Play move sound

        moves.push(`${currentPlayer} placed at cell ${cellIndex + 1}`);
        updateMoveList(); // Update move history

        checkWinner(); // Check for winner
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = gameActive ? `Player ${currentPlayer}'s turn` : statusText.innerText;
    }

    // Check win or draw
    function checkWinner() {
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.innerText = `Player ${board[a]} Wins!`;
                gameActive = false;
                highlightWinningCells([a, b, c]); // Highlight win
                winSound.play();

                // Show winner blast effect
                blast.classList.remove("blast-hidden");
                setTimeout(() => {
                    blast.classList.add("blast-hidden");
                }, 2000);
                return;
            }
        }

        // Draw condition
        if (!board.includes("")) {
            statusText.innerText = "It's a Draw!";
            gameActive = false;
        }
    }

    // Highlight winning cells
    function highlightWinningCells(indexes) {
        indexes.forEach(index => {
            cells[index].style.backgroundColor = "lightgreen";
        });
    }

    // Display move history
    function updateMoveList() {
        moveList.innerHTML = "";
        moves.forEach(move => {
            const li = document.createElement("li");
            li.textContent = move;
            moveList.appendChild(li);
        });
    }

    // Reset the game
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        moves = [];
        statusText.innerText = "Player X's turn";

        cells.forEach(cell => {
            cell.innerText = "";
            cell.style.backgroundColor = "white";
        });

        blast.classList.add("blast-hidden");
        updateMoveList();
    }

    // Attach event listeners
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});