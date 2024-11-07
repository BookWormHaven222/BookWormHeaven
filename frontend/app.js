document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Por favor, inicia sesión primero');
        window.location.href = 'login.html';
    }
}

async function fetchGenre(genreId) {
    try {
        const response = await fetch(`http://localhost:3000/api/literature/${encodeURIComponent(genreId)}`);
        const books = await response.json();
        displayBooks(books, genreId);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
    }
}

function displayBooks(books, genreId) {
    const container = document.getElementById('books-list');
    container.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const image = document.createElement('img');
        let imagePath = '';

        if (genreId === 1) {
            switch (book.titulo) {
                case 'Cien años de soledad':
                    imagePath = 'Images/Ficcion Clasica/cien_anos_de_soledad.jpg';
                    break;
                case '1984':
                    imagePath = 'Images/Ficcion Clasica/1984.jpg';
                    break;
                case 'El gran Gatsby':
                    imagePath = 'Images/Ficcion Clasica/el_gran_gatsby.jpeg';
                    break;
                case 'Orgullo y prejuicio':
                    imagePath = 'Images/Ficcion Clasica/orgullo_y_prejuicio.jpeg';
                    break;
                case 'Matar a un ruiseñor':
                    imagePath = 'Images/Ficcion Clasica/matar_a_un_ruisenor.jpg';
                    break;
                default:
                    imagePath = '';
            }
        } else if (genreId === 2) {
            switch (book.titulo) {
                case 'Gen egoista':
                    imagePath = 'Images/Ciencia/Gen egoista.jpg';
                    break;
                case 'Sapiens':
                    imagePath = 'Images/Ciencia/Sapiens.jpeg';
                    break;
                case 'Cosmos':
                    imagePath = 'Images/Ciencia/Cosmos.jpeg';
                    break;
                case 'Breve historia del tiempo':
                    imagePath = 'Images/Ciencia/Breve historia del tiempo.jpeg';
                    break;
                case 'Origen de las especies':
                    imagePath = 'Images/Ciencia/Origen de las especies.jpg';
                    break;
                default:
                    imagePath = '';
            }
        } else if (genreId === 3) {
            switch (book.titulo) {
                case 'La crítica de la razón pura':
                    imagePath = 'Images/Filosofia/La crítica de la razón pura.jpg';
                    break;
                case 'El contrato social':
                    imagePath = 'Images/Filosofia/El contrato social.jpg';
                    break;
                case 'Más allá del bien y del mal':
                    imagePath = 'Images/Filosofia/Mas alla del bien y del mal.jpeg';
                    break;
                case 'Meditaciones':
                    imagePath = 'Images/Filosofia/Meditaciones.jpeg';
                    break;
                case 'República':
                    imagePath = 'Images/Filosofia/Republica.jpg';
                    break;
                default:
                    imagePath = '';
            }
        }

        if (imagePath) {
            image.src = imagePath;
            image.alt = book.titulo;
            image.classList.add('book-image');
            bookDiv.appendChild(image);
        }

        const title = document.createElement('h4');
        title.textContent = book.titulo;
        const description = document.createElement('p');
        description.textContent = book.descripcion;
        const rateButton = document.createElement('button');
        rateButton.textContent = 'Calificar y Comentar';
        rateButton.onclick = () => showRatingSection(book);

        bookDiv.appendChild(title);
        bookDiv.appendChild(description);
        bookDiv.appendChild(rateButton);
        container.appendChild(bookDiv);
    });
}

function showRatingSection(book) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Por favor, inicia sesión para calificar y comentar');
        window.location.href = 'login.html';
        return;
    }
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');

    const ratingLabel = document.createElement('label');
    ratingLabel.textContent = `Califica "${book.titulo}": `;
    const ratingSelect = document.createElement('select');
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} estrellas`;
        ratingSelect.appendChild(option);
    }

    const commentLabel = document.createElement('label');
    commentLabel.textContent = 'Comentario: ';
    const commentInput = document.createElement('textarea');
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar';
    submitButton.onclick = () => submitReview(book, ratingSelect.value, commentInput.value);

    ratingContainer.appendChild(ratingLabel);
    ratingContainer.appendChild(ratingSelect);
    ratingContainer.appendChild(commentLabel);
    ratingContainer.appendChild(commentInput);
    ratingContainer.appendChild(submitButton);

    document.body.appendChild(ratingContainer);
}

async function submitReview(book, rating, comment) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/api/book/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bookId: book.id, rating, comment })
        });
        const result = await response.json();
        if (result.success) {
            alert('Comentario y calificación enviados con éxito');
        } else {
            alert('Error al enviar comentario');
        }
    } catch (error) {
        console.error('Error al enviar comentario:', error);
    }
}
