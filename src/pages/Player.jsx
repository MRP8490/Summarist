import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Player.css";

function Player() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) {
    return (
      <>
        <Sidebar />
        <main className="player-page">
          <h1>Loading...</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="player-page">
        <h1>{book.title}</h1>

        <p className="player-summary">{book.summary}</p>

        <div className="audio-player">
          <img src={book.imageLink} alt={book.title} />

          <div className="audio-info">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>

          <audio controls src={book.audioLink}></audio>
        </div>
      </main>
    </>
  );
}

export default Player;