let countdown = null
let animation = null

function createForm() {
    const fields = ['hours', 'minutes', 'seconds']
    const fieldsElement = document.getElementById('fields');

    for (let i = 0; i < fields.length; ++i) {
        const id = fields[i];

        const field = document.createElement('div');
        field.className = 'field';

        const label = document.createElement('label');
        label.setAttribute('for', id);

        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', id);
        input.setAttribute('placeholder', id);
        input.setAttribute('required', 'true');

        input.addEventListener('input', (event) => {
            const value = event.target.value;

            if (value === '') {
                // return to the previous input field if the value is empty
                field?.previousElementSibling?.previousElementSibling?.getElementsByTagName('input')[0]?.focus();
                // reset the class of the field
                input.className = '';
                return;
            } else {
                // add the class to the field
                input.className = 'filled';
            }

            // allow only valid digits in the acceptable range
            if ((value.length > 0 && (value < 0 || value > 59)) || value.length > 2) {
                event.target.value = value.substring(0, value.length - 1);
                return
            }

            // move to the next input field if the value is 2 characters long
            // and the current field is not the last field
            if (value.length === 2 && i < fields.length - 1) {
                field?.nextElementSibling?.nextElementSibling?.getElementsByTagName('input')[0]?.focus();
            }
        })

        field.append(label, input);

        fieldsElement.appendChild(field);

        if (i < fields.length - 1) {
            const separator = document.createElement('span');
            separator.innerText = ':';
            fieldsElement.appendChild(separator);
        }
    }
}

function performAnimation(field, current, previous) {
    const timesToRun = 10;

    let timesRun = 0;

    if (current !== previous) {
        // animate the field with javascript
        resetAnimation(field, previous);
        animation = setInterval(() => {
            if (timesRun < timesToRun) {
                // gradually move the field value from left to right
                field.style.textIndent = `${(++timesRun / timesToRun) * 120}%`;
            } else {
                resetAnimation(field, current);
            }
        }, 500 / timesToRun)
    } else {
        resetAnimation(field, current)
    }
}

function resetAnimation(field, current) {
    clearInterval(animation);
    field.style.textIndent = '0';
    if (current) {
        field.value = current.toString().padStart(2, '0');
    }
}

// handles form submission
document.getElementsByTagName('form')[0].addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    const button = event.target.getElementsByTagName('button')[0];

    const entries = event.target.getElementsByTagName('input');

    function stopInterval() {
        clearInterval(countdown);
        button.innerText = 'Start Countdown';
        button.className = '';
        for (let i = 0; i < entries.length; ++i) {
            const entry = entries[i];
            resetAnimation(entry, null)
            entry.removeAttribute('disabled');
            entry.className = '';
        }
    }

    if (button.innerText === 'Start Countdown') {
        // start countdown
        const titleField = entries[0];
        const title = titleField.value;

        const hoursField = entries[1];
        const hours = parseInt(hoursField.value, 10);
        let previousHour = hours;

        const minutesField = entries[2];
        const minutes = parseInt(minutesField.value, 10);
        let previousMinute = minutes;

        const secondsField = entries[3];
        const seconds = parseInt(secondsField.value, 10);
        let previousSecond = seconds;

        if (title === '' || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            alert('Please fill in all the fields');
            return;
        }

        let time = (hours * 3600) + (minutes * 60) + seconds;
        if (time <= 0) {
            alert('Please enter a valid time');
            return;
        }

        for (let i = 0; i < entries.length; ++i) {
            entries[i].setAttribute('disabled', 'false');
        }

        button.innerText = 'Stop Countdown';
        button.className = 'stop';

        countdown = setInterval(() => {
            if (time <= 0) {
                stopInterval();
                return;
            }

            const h = Math.floor(time / 3600);
            const m = Math.floor((time % 3600) / 60);
            const s = time % 60;

            performAnimation(hoursField, h, previousHour);
            performAnimation(minutesField, m, previousMinute);
            performAnimation(secondsField, s, previousSecond);

            previousHour = h;
            previousMinute = m;
            previousSecond = s;

            time--;
        }, 1000);
    } else if (button.innerText === 'Stop Countdown') {
        stopInterval();
    }
});

createForm()