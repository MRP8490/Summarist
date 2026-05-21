import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import "./Book.css";

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  function handleReadListen() {
    navigate(`/player/${book.id}`);
  }

 function handleAddToLibrary() {
  const existingBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];

  const alreadySaved = existingBooks.find(
    (savedBook) => savedBook.id === book.id
  );

  if (alreadySaved) {
    setMessage("This book is already in your library");
    return;
  }

  const updatedBooks = [...existingBooks, book];
  localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));

  setMessage("Book added to your library");
}

  if (!book) {
  return (
    <>
      <Sidebar />
      <main className="book-page">
        <Search />

        <section className="book-content">
          <div className="book-skeleton">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-button"></div>
          </div>

          <div className="skeleton skeleton-cover"></div>
        </section>
      </main>
    </>
  );
}

  return (
    <>
      <Sidebar />

      <main className="book-page">
        <Search />

        <section className="book-content">
          <div className="book-top">
            <div className="book-info">
              <h1>
                {book.title}
                {book.subscriptionRequired && (
                  <span className="premium-pill">Premium</span>
                )}
              </h1>

              <h3>{book.author}</h3>
              <p>{book.subTitle}</p>

              <div className="book-stats">
                <p>⭐ {book.averageRating} ({book.totalRating} ratings)</p>
                <p>💡 {book.keyIdeas} key ideas</p>
                <p>🎧 {book.type}</p>
              </div>

              <button onClick={handleReadListen} className="read-button">
                Read / Listen
              </button>

              <button onClick={handleAddToLibrary} className="library-button">
                Add to My Library
              </button>
              {message && <p className="library-message">{message}</p>}
            </div>

            <img className="book-cover" src={book.imageLink} alt={book.title} />
          </div>

          <h2>What's it about?</h2>

          <div className="book-tags">
            {book.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <h2>Book Description</h2>
          <p className="book-text">{book.bookDescription}</p>

          <h2>About the author</h2>
          <p className="book-text">{book.authorDescription}</p>
        </section>
      </main>
    </>
  );
}

export default Book;