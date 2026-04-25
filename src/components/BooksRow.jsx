import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosStarOutline } from "react-icons/io";
import "./BooksRow.css";

function BooksRow({ title, subtitle, status }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`
        );
        const data = await res.json();

        setTimeout(() => {
          setBooks(data);
          setLoading(false);
        }, 1500);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [status]);

  return (
    <div className="books__section">
      <h2 className="books__title">{title}</h2>
      <p className="books__subtitle">{subtitle}</p>

      <div className="books__list">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div className="book__card" key={index}>
                  <div className="book__image-wrapper">
                    <div className="skeleton skeleton--image"></div>
                  </div>

                  <div className="skeleton skeleton--text"></div>
                  <div className="skeleton skeleton--text short"></div>
                  <div className="skeleton skeleton--text"></div>

                  <div className="book__meta">
                    <div className="skeleton skeleton--meta"></div>
                    <div className="skeleton skeleton--meta"></div>
                  </div>
                </div>
              ))
          : books.map((book) => (
              <div
                className="book__card"
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className="book__image-wrapper">
                  {book.subscriptionRequired && (
                    <div className="book__pill">Premium</div>
                  )}

                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="book__image"
                  />
                </div>

                <h3 className="book__name">{book.title}</h3>
                <p className="book__author">{book.author}</p>
                <p className="book__subtitle">{book.subTitle}</p>

                <div className="book__meta">
                  <span className="book__duration">
                    {book.audioLength
                      ? `${Math.ceil(book.audioLength)} mins`
                      : ""}
                  </span>

                  <span className="book__rating">
                    <IoIosStarOutline className="book__star-icon" />
                    {book.averageRating}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BooksRow;