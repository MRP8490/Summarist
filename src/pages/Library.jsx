import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import "./Library.css";

function Library() {
  const [savedBooks, setSavedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("savedBooks")) || [];
    setSavedBooks(books);
  }, []);

  function handleRemoveBook(bookId) {
    const updatedBooks = savedBooks.filter(
      (book) => book.id !== bookId
    );

    setSavedBooks(updatedBooks);

    localStorage.setItem(
      "savedBooks",
      JSON.stringify(updatedBooks)
    );
  }

  return (
    <>
      <Sidebar />

      <main className="library-page">
        <Search />

        <section className="library-content">
          <h1>My Library</h1>

          {savedBooks.length === 0 ? (
            <div className="library-empty">
              <h2>Save your favorite books!</h2>

              <p>
                When you add a book to your library, it will appear here.
              </p>

              <a href="/for-you">Browse books</a>
            </div>
          ) : (
            <div className="library-books">
              {savedBooks.map((book) => (
                <div
                  key={book.id}
                  className="library-book-card"
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    onClick={() => navigate(`/book/${book.id}`)}
                  />

                  <h3 onClick={() => navigate(`/book/${book.id}`)}>
                    {book.title}
                  </h3>

                  <p>{book.author}</p>
                  <p>{book.subTitle}</p>

                  <button
                    className="remove-button"
                    onClick={() => handleRemoveBook(book.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Library;