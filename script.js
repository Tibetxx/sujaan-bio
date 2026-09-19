// Theme Toggle Functionality (Dark/Light Mode Switcher)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Multiple Typing Effect Text Lines
const texts = [
    "Hello 👋 ! I am SuJaan",
    "Computer Science Student 💻",
    "Building things for the web 🚀",
    "Exploring Code & Tech ✨"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextSpan = document.getElementById("typed-text");

function typeEffect() {
    if (!typedTextSpan) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2500; // Pause at end of sentence
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Share Profile Function
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'SuJaan - Link Bio',
            text: 'Check out my official link bio page!',
            url: window.location.href,
        }).catch((error) => console.log('Error sharing', error));
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
    }
}

// Initialization on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    // Start Typing Effect
    setTimeout(typeEffect, 500);

    // Real Global Visitor Counter using CountAPI (पूरा दुनिया के लिए लाइव काउंट)
    fetch('https://api.countapi.xyz/hit/sujaan-link-bio-2026/visits')
        .then(response => response.json())
        .then(data => {
            const visitElement = document.getElementById("visit-count");
            if (visitElement) {
                visitElement.innerText = data.value.toLocaleString();
            }
        })
        .catch(error => {
            console.error('Error fetching visitor count:', error);
            const visitElement = document.getElementById("visit-count");
            if (visitElement) {
                visitElement.innerText = "1,240"; // ফলব্যাক সংখ্যা যদি কোনো কারণে এপিআই লোড না হয়
            }
        });
});