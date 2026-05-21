import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

function Search() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.length < 2) {
      setBooks([]);
      return;
    }

    fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedSearch}`
    )
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setBooks([]));
  }, [debouncedSearch]);

  function clearSearch() {
    setSearch("");
    setDebouncedSearch("");
    setBooks([]);
  }

  return (
    <div style={searchWrapperStyle}>
      <div style={searchBoxStyle}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for books"
          style={inputStyle}
        />

        <button onClick={clearSearch} style={buttonStyle}>
          {search ? <FiX size={24} /> : <FiSearch size={24} />}
        </button>
      </div>

      {books.length > 0 && (
        <div style={resultsStyle}>
          {books.map((book) => (
            <a key={book.id} href={`/book/${book.id}`} style={resultItemStyle}>
              <img src={book.imageLink} alt={book.title} style={resultImageStyle} />

              <div>
                <h3 style={resultTitleStyle}>{book.title}</h3>
                <p style={resultAuthorStyle}>{book.author}</p>
                <p style={resultTimeStyle}>◷ 04:40</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
const searchWrapperStyle = {
  width: "400px",
  marginLeft: "auto",
  marginBottom: "32px",
  position: "relative",
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "56px",
  border: "2px solid #e1e7ea",
  borderRadius: "12px",
  overflow: "hidden",
  background: "#f7faf9",
};

const inputStyle = {
  flex: 1,
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 20px",
  fontSize: "16px",
  background: "transparent",
  color: "#032b41",
};

const buttonStyle = {
  width: "64px",
  height: "100%",
  border: "none",
  borderLeft: "2px solid #e1e7ea",
  background: "#f7faf9",
  color: "#032b41",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const resultsStyle = {
  position: "absolute",
  top: "76px",
  right: 0,
  width: "520px",
  background: "white",
  border: "1px solid #d3e1e8",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  zIndex: 50,
};

const resultItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  padding: "32px",
  color: "#032b41",
  textDecoration: "none",
};

const resultImageStyle = {
  width: "80px",
  height: "110px",
  objectFit: "cover",
};

const resultTitleStyle = {
  margin: "0 0 8px",
  fontSize: "18px",
};

const resultAuthorStyle = {
  margin: "0 0 8px",
  color: "#7b8c98",
};

const resultTimeStyle = {
  margin: 0,
  color: "#7b8c98",
};

export default Search;