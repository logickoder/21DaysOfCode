let db;
const dbName = 'movies'
const openOrCreateDB = window.indexedDB.open(dbName, 1);

openOrCreateDB.addEventListener('error', () => {
    console.error('Error opening DB');
    alert('Error opening DB');
});

openOrCreateDB.addEventListener('success', async () => {
    console.log('Successfully opened DB');
    db = openOrCreateDB.result;

    await populateMovies();
});

openOrCreateDB.addEventListener('upgradeneeded', init => {
    db = init.target.result;

    db.onerror = () => {
        console.error('Error loading database.');
    };

    const table = db.createObjectStore(dbName, {keyPath: 'id', autoIncrement: true});

    console.log('Successfully created object store');
    table.createIndex('title', 'title', {unique: false});
    table.createIndex('year', 'year', {unique: false});
    table.createIndex('genre', 'genre', {unique: false});
});

// adds a new movie to the db
async function addMovie(movie) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([dbName], 'readwrite');
        const objectStore = transaction.objectStore(dbName);
        const query = objectStore.add(movie);
        // query.addEventListener('success', () => {
        // });
        transaction.addEventListener('complete', resolve);
        transaction.addEventListener('error', reject);
    })
}

// gets all movies from the db
function getMovies() {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(dbName).objectStore(dbName);
        const movies = []
        const cursor = objectStore.openCursor()
        cursor.addEventListener('success', e => {
            const pointer = e.target.result;
            if (pointer) {
                movies.push(pointer.value);
                pointer.continue();
            } else {
                resolve(movies);
            }
        });
        cursor.addEventListener('error', reject);
    })
}

function deleteMovie(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([dbName], 'readwrite');
        const objectStore = transaction.objectStore(dbName);
        objectStore.delete(id);
        transaction.addEventListener('complete', resolve);
        transaction.addEventListener('error', reject);
    })
}

// refreshes the content
async function populateMovies() {
    // clear the previous content
    const content = document.getElementById('content');
    content.innerHTML = '';

    const movies = await getMovies();

    movies.forEach(movie => {
        console.log(movie)
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.setAttribute('data-id', movie.id);
        const title = document.createElement('h3');
        title.textContent = movie.title;
        const year = document.createElement('p');
        year.textContent = movie.year;
        const genre = document.createElement('p');
        genre.textContent = movie.genre;

        movieElement.append(title, year, genre);
        content.appendChild(movieElement);
    });
}

// handles form submission
document.getElementsByTagName('form')[0].addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    const button = event.target.getElementsByTagName('button')[0];
    if (button.innerText === '...') {
        return;
    }

    button.innerText = '...';

    const entries = event.target.getElementsByTagName('input');
    const movie = {}

    for (let i = 0; i < entries.length; ++i) {
        const entry = entries[i];
        const id = entry.getAttribute('id');
        const value = entry.value;

        if (!value || value.trim() === '') {
            alert(`Please enter a ${id}`);
            return;
        }

        movie[id] = value;
    }

    try {
        await addMovie(movie);
        await populateMovies();

        // clear form
        for (let i = 0; i < entries.length; ++i) {
            entries[i].value = '';
        }
    } catch (error) {
        console.error(error);
        alert('Error adding movie');
    } finally {
        button.innerText = 'Add';
    }
});