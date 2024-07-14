function openTab(tabId) {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove 'active' class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');

    // Add 'active' class to the clicked button
    event.currentTarget.classList.add('active');
}

// Open the first tab by default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tab-button').click();
});