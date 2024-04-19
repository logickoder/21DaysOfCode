const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');

function wrangleText(text) {
    return text.split(RegExp('[^a-zA-Z0-9]')).filter(word => word.trim().length > 0).map(word => word.toLowerCase());
}

form.addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    const value = input.value;
    if (!value || value.trim() === '') {
        alert('Please enter a sentence');
        return;
    }

    output.innerText = wrangleText(value);
});