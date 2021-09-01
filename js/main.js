

const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    const errorDiv = document.getElementById("error");
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    // console.log(searchText);
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
    searchInput.value = '';
}

const displayBooks = books => {
    books.forEach(book => {
        const booksContainer = document.getElementById('books-container');
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