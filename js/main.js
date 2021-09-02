const div = document.createElement('div');
const errorDiv = document.getElementById("error");
const booksContainer = document.getElementById('books-container');

// Get Books From API
const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    if (searchText === "") {
        errorDiv.classList.add('d-block', 'fw-bolder', 'text-danger', 'mt-1');
        errorDiv.innerText = "Search Field Cannot Be Empty!";
        return;
    }
    //Dynamic Search Text
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data, data.docs));

    // Clear Search Text
    searchInput.value = '';
    //Clear Total Search Result
    document.getElementById('total-items').innerText = '';
    errorDiv.innerText = "";
    booksContainer.textContent = '';
}

//Display Books
const displayBooks = (data, books) => {

    // Error Handing
    if (data.numFound === 0) {
        errorDiv.classList.add('d-block', 'fw-bolder', 'text-danger', 'm-1');
        errorDiv.innerText = "NO Result Found ! Please Type Carefully";
    } else {
        errorDiv.innerText = "";
    }

    // Get Total Search Result
    document.getElementById('total-items').innerText = parseInt(data.numFound);
    // Repeating Part of Display
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
                <h5 class="card-title fw-bolder">${book.title}</h5>
                <p class="card-text">by <span class="text-success">${book.author_name}</span></p>
                <p class="card-text">First Published In: <small class="text-success">${book.first_publish_year}</small></p>
                <p class="card-text">Published By: <small class="text-muted">${book.publisher}</small></p>
            </div >
        </div >
        </div > `;
        booksContainer.appendChild(div);
    });
}