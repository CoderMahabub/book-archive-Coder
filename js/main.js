const div = document.createElement('div');
const errorDiv = document.getElementById("error");
const booksContainer = document.getElementById('books-container');

// Get Books From API
const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    if (searchText === "") {
        errorDiv.classList.add('d-block', 'fw-bolder', 'text-danger');
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    //Dynamic Search Text
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));

    // Clear Search Text
    searchInput.value = '';
    //Clear Total Search Result
    document.getElementById('total-items').innerText = '';
    errorDiv.innerText = "";
    booksContainer.textContent = '';
}

//Display Books
const displayBooks = data => {

    // Error Handing
    if (data.numFound === 0) {
        errorDiv.classList.add('d-block', 'fw-bolder', 'text-danger');
        errorDiv.innerText = "NO Result Found ! Please Type Carefully";
    } else {
        errorDiv.innerText = "";
    }
    const books = data.docs;
    console.log(books);

    // Get Total Search Result
    document.getElementById('total-items').innerText = books.length;

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-lg-6', 'card', 'mb-2');
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="img-fluid rounded-start" alt="Cover Image Not Available">
        </div>
        <div class="col-md-8 d-flex align-items-center">
            <div class="card-body ">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">by ${book.author_name}</p>
                <p class="card-text">First Published In: <small class="text-muted">${book.first_publish_year}</small></p>
            </div >
        </div >
        </div > `;
        booksContainer.appendChild(div);
    });
}