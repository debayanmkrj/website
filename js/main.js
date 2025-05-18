
// Main JavaScript file for handling page interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Let the default navigation work for separate pages
            // No need to prevent default
        });
    });
    
    // Add back button functionality if on subpages
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../index.html';
        });
    }
});