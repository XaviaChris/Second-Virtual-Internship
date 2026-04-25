import "./TopBar.css";
import { IoSearch } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AiOutlineHome,
} from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import { RiBallPenLine } from "react-icons/ri";
import { HiOutlineCog } from "react-icons/hi";
import { BsQuestionCircle } from "react-icons/bs";

function TopBar() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [recRes, sugRes] = await Promise.all([
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
        ]);

        const recData = await recRes.json();
        const sugData = await sugRes.json();

        setBooks([...recData, ...sugData]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const delay = setTimeout(() => {
      const filtered = books.filter((book) =>
        (book.title + book.author)
          .toLowerCase()
          .includes(query.toLowerCase())
      );

      setResults(filtered.slice(0, 5));
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, books]);

  return (
    <div className="topbar">

      <button className="burger" onClick={() => setMenuOpen(true)}>
        <HiOutlineMenu />
      </button>

      <div className="search__wrapper">
        <input
          type="text"
          placeholder="Search for books..."
          className="topbar__search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="search__btn">
          <IoSearch />
        </button>

        {(loading || results.length > 0) && query && (
          <div className="search__dropdown">
            {loading &&
              [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="search__item">
                  <div className="skeleton skeleton--img"></div>
                  <div className="skeleton__text">
                    <div className="skeleton skeleton--title"></div>
                    <div className="skeleton skeleton--author"></div>
                  </div>
                </div>
              ))}

            {!loading &&
              results.map((book) => (
                <Link
                  to={`/book/${book.id}`}
                  key={book.id}
                  className="search__item"
                >
                  <img src={book.imageLink} alt={book.title} />
                  <div>
                    <p className="search__title">{book.title}</p>
                    <p className="search__author">{book.author}</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="mobile__menu">
          <div className="mobile__menu-content">
            <button className="close" onClick={() => setMenuOpen(false)}>✕</button>

            <NavLink to="/for-you" onClick={() => setMenuOpen(false)}>
              <AiOutlineHome /> For You
            </NavLink>

            <NavLink to="/library" onClick={() => setMenuOpen(false)}>
              <IoBookmarkOutline /> My Library
            </NavLink>

            <NavLink to="/highlights" className="no--click" onClick={() => setMenuOpen(false)}>
              <RiBallPenLine /> Highlights
            </NavLink>

            <NavLink to="/settings" onClick={() => setMenuOpen(false)}>
              <HiOutlineCog /> Settings
            </NavLink>

            <NavLink to="/help" className="no--click" onClick={() => setMenuOpen(false)}>
              <BsQuestionCircle /> Help & Support
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;