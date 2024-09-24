// This file simulates API calls. In a real application, these would be actual API requests.
let books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
];

export const fetchBooks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 500);
  });
};

export const addBook = async (newBook) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = { ...newBook, id: Date.now() };
      books.push(book);
      resolve(book);
    }, 500);
  });
};

export const updateBook = async (updatedBook) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      books = books.map((book) => (book.id === updatedBook.id ? updatedBook : book));
      resolve(updatedBook);
    }, 500);
  });
};

export const deleteBook = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      books = books.filter((book) => book.id !== id);
      resolve(id);
    }, 500);
  });
};