let newBookBtn = document.querySelector(".add-new-book");

newBookBtn.addEventListener("click", function(){
  let newBookForm = document.querySelector("#new-book-form");
  newBookForm.style.display = "block";
})

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function render(){
  let bookCards = document.querySelector(".book-cards");
  bookCards.innerHTML = "";
  for(let i = 0; i < myLibrary.length; i++){
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");
    bookEl.innerHTML = `
      <div class="card-header">
        <button class="remove-btn" onclick="removeBook(${i})">x</button>
        <h3 class="title">Book:${book.title}</h3>
        <h5 class="author">By:${book.author}</h3>
      </div>
      <div class="card-body">
        <p>${book.pages} pages</p>
        <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
      </div>
    `;
    bookCards.appendChild(bookEl);
  }
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
}

document.querySelector("#new-book-form").addEventListener("submit", function(event){
  event.preventDefault(); //because we don't have a backend to save out data
  addBookToLibrary();
})

function removeBook(index){
  myLibrary.splice(index,1);
  render();
}

Book.prototype.toggleRead = function(){
  this.read = !this.read;
}

function toggleRead(index){
  myLibrary[index].toggleRead();
  render();
}