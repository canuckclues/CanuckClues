// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Store solved puzzles in localStorage
let solvedPuzzles = JSON.parse(localStorage.getItem('solvedPuzzles')) || [];

// Update puzzle cards based on solved status
function updatePuzzleCards() {
    const puzzleCards = document.querySelectorAll('.puzzle-card');
    puzzleCards.forEach((card, index) => {
        if (solvedPuzzles.includes(index + 1)) {
            card.classList.add('solved');
            const status = card.querySelector('.puzzle-status');
            status.innerHTML = '<i class="fas fa-check"></i><span>Solved</span>';
        }
    });
}

// Initialize puzzle cards
updatePuzzleCards();

// Handle code submission
const codeForm = document.getElementById('codeForm');
if (codeForm) {
    codeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const puzzleNumber = parseInt(document.getElementById('puzzleNumber').value);
        const code = document.getElementById('code').value.trim();
        
        // Here you would typically validate the code against your puzzle solutions
        // For now, we'll just mark the puzzle as solved
        if (!solvedPuzzles.includes(puzzleNumber)) {
            solvedPuzzles.push(puzzleNumber);
            localStorage.setItem('solvedPuzzles', JSON.stringify(solvedPuzzles));
            updatePuzzleCards();
            
            // Show success message
            alert('Congratulations! You solved puzzle ' + puzzleNumber + '!');
            codeForm.reset();
        } else {
            alert('This puzzle has already been solved!');
        }
    });
}

// Set minimum date for booking form to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Add animation to features on scroll
const features = document.querySelectorAll('.feature');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(feature);
}); 