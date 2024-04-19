const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');

/**
 *
 * @param number the number to generate fizz buzz for
 * @returns an array of strings representing the fizz buzz sequence
 */
function fizzBuzzPro(number) {
    const result = [];
    for (let i = 1; i <= number; i++) {
        let value = '';
        if (i % 3 === 0) {
            value += 'Fizz';
        }
        if (i % 5 === 0) {
            value += 'Buzz';
        }
        result.push(value || i);
    }
    return result;
}

/**
 *
 * @param numbers an array of numbers to generate fizz buzz for
 * @returns an array of arrays of strings representing the fizz buzz sequence
 */
function fizzBuzzProMax(numbers) {
    const result = [];
    for (const number of numbers) {
        result.push(fizzBuzzPro(number));
    }
    return result;
}

// Generate fizz buzz for a list of numbers
form.addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    const value = input.value;
    if (!value || value.trim() === '') {
        alert('Please enter a list of numbers separated by commas');
        return;
    }

    let numbers;
    try {
        numbers = value.split(',').map(number => parseInt(number.trim()));
    } catch (error) {
        console.error('Error parsing numbers:', error);
        alert('Please enter a list of numbers separated by commas');
        return;
    }

    // Clear the output
    output.innerHTML = '';

    fizzBuzzProMax(numbers).forEach((fizzBuzz, index) => {
        const title = document.createElement('h1');
        title.textContent = `Fizz Buzz for ${numbers[index]}`;
        output.appendChild(title);

        const list = document.createElement('ul');
        fizzBuzz.forEach(value => {
            const item = document.createElement('li');
            item.textContent = value;
            list.appendChild(item);
        });

        output.appendChild(list);
    });
});