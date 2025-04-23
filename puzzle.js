// Puzzle and hint data
const puzzleData = {
    1: {
        title: "North York Dentist",
        correctCode: "92",
        hints: [
            "There appears to be arrows on the business card",
            "The pattern on the business card appears to match the pattern on the pamphlet",
            "The code is 92"
        ]
    },
    2: {
        title: "Magic Cinema",
        correctCode: "41",
        hints: [
            "The barcode appears to be a pattern",
            "The pattern appears to be connected to morse code",
            "The code is 41"
        ]
    },
    3: {
        title: "The Annex Speech Therapy",
        correctCode: "08",
        hints: [
            "The words to practice might be hiding a code",
            "Perhaps the words relate to the NATO phonetic alphabet",
            "The code is 08"
        ]
    },
    4: {
        title: "Builder Depot Receipt",
        correctCode: "59",
        hints: [
            "The symbols on the back appear to create a math problem",
            "Perhaps the receipt could be folded to reveal which numbers to add/subtract",
            "The code is 59"
        ]
    },
    5: {
        title: "The Etobicoke Handyman",
        correctCode: "12",
        hints: [
            "There could be a simple image hiding the code",
            "The clock is pointing to noon",
            "The code is 12"
        ]
    },
    6: {
        title: "ClearFlow Report",
        correctCode: "73",
        hints: [
            "Perhaps it's significant that the intruder mentioned searching the city 'corner to corner'",
            "The symbols on the corners of the reports can be pressed together to form letters",
            "The code is 73"
        ]
    },
    7: {
        title: "The Toronto Herald",
        correctCode: "13",
        hints: [
            "The printer callibration symbol appears to show certain colours that should be added together",
            "These colours correlate to the lines in the Contango Cosmetics coupon. Perhaps another clue can be used to measure these lines",
            "The code is 13 (1.1 + 4.3 + 2.2 + 5.4)"
        ]
    },
    8: {
        title: "Contango Cosmetics",
        correctCode: "23",
        hints: [
            "The sales zones can be traced to form shapes",
            "The sales zone correlate with those shown in the ads",
            "The code is 23"
        ]
    },
    9: {
        title: "Suzy's Snack Shop",
        correctCode: "05",
        hints: [
            "The logic puzzle reveals the correct arrangement of candies; lollipops, candy corn, gummy bears, chocolate bars, sour cherries, nuts, peppermints, licorice, and candy canes",
            "The arrangement can be traced between the pictures of the candies on the back of the note",
            "The code is 05"
        ]
    }
};

// Function to get puzzle data
function getPuzzleData(puzzleNumber) {
    return puzzleData[puzzleNumber] || {
        title: "Unknown Puzzle",
        correctCode: "",
        hints: ["No hints available"]
    };
}

// Function to handle hint button clicks
function toggleHint(hintNumber) {
    const hintText = document.getElementById(`hint-${hintNumber}`);
    const button = document.querySelector(`button[onclick="toggleHint(${hintNumber})"]`);
    
    if (hintText.style.display === 'block') {
        hintText.style.display = 'none';
        button.classList.remove('used');
    } else {
        hintText.style.display = 'block';
        button.classList.add('used');
    }
}

// Function to check if a puzzle is unlocked
function isPuzzleUnlocked(puzzleNumber) {
    return localStorage.getItem(`puzzle_${puzzleNumber}_unlocked`) === 'true';
}

// Function to unlock a puzzle
function unlockPuzzle(puzzleNumber) {
    localStorage.setItem(`puzzle_${puzzleNumber}_unlocked`, 'true');
    updatePuzzleStatus(puzzleNumber);
}

// Function to update puzzle status in the UI
function updatePuzzleStatus(puzzleNumber) {
    const puzzleCard = document.querySelector(`.puzzle-card[data-puzzle="${puzzleNumber}"]`);
    if (puzzleCard) {
        if (isPuzzleUnlocked(puzzleNumber)) {
            puzzleCard.classList.add('solved');
            puzzleCard.querySelector('.puzzle-status').innerHTML = `
                <i class="fas fa-lock-open"></i>
                <span>Unlocked</span>
            `;
        }
    }
}

// Function to submit code
function submitCode() {
    const codeInput = document.getElementById('code-input');
    const code = codeInput.value.trim().toUpperCase();
    const urlParams = new URLSearchParams(window.location.search);
    const puzzleNumber = urlParams.get('puzzle');
    
    if (puzzleNumber) {
        const puzzle = getPuzzleData(puzzleNumber);
        if (code === puzzle.correctCode) {
            unlockPuzzle(puzzleNumber);
            alert('Correct! This puzzle is now unlocked.');
            // Redirect back to puzzles page after a short delay
            setTimeout(() => {
                window.location.href = 'puzzles.html';
            }, 1000);
        } else {
            alert('Incorrect code. Please try again.');
        }
    }
}

// Function to initialize the puzzle page
function initializePuzzlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const puzzleNumber = urlParams.get('puzzle');
    
    if (puzzleNumber) {
        const puzzle = getPuzzleData(puzzleNumber);
        document.querySelector('.puzzle-header h1').textContent = puzzle.title;
        
        // Update hint texts
        puzzle.hints.forEach((hint, index) => {
            const hintText = document.getElementById(`hint-${index + 1}`);
            if (hintText) {
                hintText.textContent = hint;
            }
        });

        // Update puzzle status if unlocked
        if (isPuzzleUnlocked(puzzleNumber)) {
            const codeInput = document.getElementById('code-input');
            codeInput.value = puzzle.correctCode;
            codeInput.disabled = true;
            document.querySelector('.submit-button').disabled = true;
        }
    }
}

// Function to initialize the puzzles page
function initializePuzzlesPage() {
    // Update status of all puzzle cards
    for (let i = 1; i <= 9; i++) {
        updatePuzzleStatus(i);
    }
}

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('puzzle.html')) {
        initializePuzzlePage();
    } else if (window.location.pathname.includes('puzzles.html')) {
        initializePuzzlesPage();
    }
}); 