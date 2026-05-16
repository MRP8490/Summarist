import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import "./ForYou.css";

function ForYou() {
  const [selected, setSelected] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const navigate = useNavigate();

  function openBook(id) {
    navigate(`/book/${id}`);
  }

  useEffect(() => {
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")
      .then((res) => res.json())
      .then((data) => setSelected(Array.isArray(data) ? data[0] : data));

    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
      .then((res) => res.json())
      .then((data) => setRecommended(data));

    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested")
      .then((res) => res.json())
      .then((data) => setSuggested(data));
  }, []);

  if (!selected) {
    return (
      <>
        <Sidebar />
        <main className="for-you-page">
          <h1>Loading...</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="for-you-page">
        <Search />

        <section className="for-you-content">
          <h1>For You</h1>

          <h2>Selected just for you</h2>

          <div onClick={() => openBook(selected.id)} className="selected-card">
            <p>{selected.subTitle}</p>

            <img src={selected.imageLink} alt={selected.title} />

            <div>
              <h3>{selected.title}</h3>
              <p>{selected.author}</p>
              <p>▶ 3 mins 23 secs</p>
            </div>
          </div>

          <h2>Recommended For You</h2>

          <div className="books-row">
            {recommended.slice(0, 5).map((book) => (
              <div key={book.id} onClick={() => openBook(book.id)} className="book-card">
                <img src={book.imageLink} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.subTitle}</p>
                <p>⏱ 04:52 ⭐ {book.averageRating}</p>
              </div>
            ))}
          </div>

          <h2>Suggested Books</h2>

          <div className="books-row">
            {suggested.slice(0, 5).map((book) => (
              <div key={book.id} onClick={() => openBook(book.id)} className="book-card">
                <img src={book.imageLink} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.subTitle}</p>
                <p>⏱ 04:52 ⭐ {book.averageRating}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default ForYou;