const form = document.getElementById('form');
const url = document.getElementById('url');
const content = document.getElementById('content');

form.addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    try {
        // Use a CORS proxy to avoid CORS policy issues
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${url.value}`);
        const data = await response.text();

        // Parse the HTML content
        const html = document.createElement('div');
        html.innerHTML = data;

        // Remove tags that will mess up the text content
        const tagsToRemove = ['script', 'link', 'style', 'meta', 'noscript'];
        tagsToRemove.forEach(tag => {
            html.querySelectorAll(tag).forEach(element => element.remove());
        })

        // Extract the remaining text content
        const textContent = html.textContent;

        // Extract images
        const images = html.querySelectorAll('img');

        // Display text content
        const textTitleElement = document.createElement('h1');
        textTitleElement.textContent = 'Text Content';
        const textElement = document.createElement('p');
        textElement.textContent = textContent;
        content.append(textTitleElement, textElement);

        // Display images
        const imageTitleElement = document.createElement('h1');
        imageTitleElement.textContent = 'Images';
        content.appendChild(imageTitleElement);

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            content.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching website content:', error);
    }
});