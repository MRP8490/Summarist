import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlay, FiPause, FiRotateCcw, FiRotateCw } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import "./Player.css";

function Player() {
  const { id } = useParams();
  const audioRef = useRef(null);
  const [book, setBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  function toggleAudio() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }

  function skip(seconds) {
    audioRef.current.currentTime += seconds;
  }

  if (!book) {
    return (
      <>
        <Sidebar />
        <main className="player-page">
          <div className="player-content">
            <div className="skeleton player-skeleton-title"></div>
            <div className="skeleton player-skeleton-line"></div>
            <div className="skeleton player-skeleton-line"></div>
            <div className="skeleton player-skeleton-line"></div>
          </div>
          <div className="skeleton player-skeleton-bar"></div>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="player-page">
        <Search />

        <section className="player-content">
          <h1>{book.title}</h1>
          <p
  className="player-summary"
  style={{ fontSize: `${fontSize}px` }}
>
  {book.summary}
</p>
        </section>

        <div className="custom-audio-player">
          <div className="player-book-info">
            <img src={book.imageLink} alt={book.title} />
            <div>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          </div>

          <div className="player-controls">
            <button onClick={() => skip(-10)}>
              <FiRotateCcw />
              <span>10</span>
            </button>

            <button className="main-play-button" onClick={toggleAudio}>
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>

            <button onClick={() => skip(10)}>
              <FiRotateCw />
              <span>10</span>
            </button>
          </div>

          <audio ref={audioRef} src={book.audioLink}></audio>
        </div>
      </main>
    </>
  );
}

export default Player;