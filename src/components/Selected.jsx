import "./Selected.css";
import { useEffect, useState } from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function Selected() {
  const [book, setBook] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchBook = async () => {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await res.json();

        const selectedBook = data[0];

        const audio = new Audio(selectedBook.audioLink);
        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });

        setTimeout(() => {
          setBook(selectedBook);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  function formatDuration(seconds) {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="selected">
      <h1 className="selected__title">Selected just for you</h1>

      <div className="card--wrapper">
        {loading ? (
          <div className="selected__card">
            <div className="selected__row">
              <div className="selected__subtitle">
                <div className="skeleton skeleton--text short"></div>
              </div>

              <div className="selected__divider"></div>

              <div className="selected__content">
                <div className="skeleton skeleton--image"></div>

                <div className="selected__text">
                  <div className="skeleton skeleton--title"></div>
                  <div className="skeleton skeleton--text short"></div>

                  <div className="selected__duration-wrapper">
                    <div className="skeleton skeleton--icon"></div>
                    <div className="skeleton skeleton--meta"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link to={`/book/${book.id}`} className="selected__card">
            <div className="selected__row">
              <div className="selected__subtitle">
                <p>{book.subTitle}</p>
              </div>

              <div className="selected__divider"></div>

              <div className="selected__content">
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="selected__image"
                />

                <div className="selected__text">
                  <h2>{book.title}</h2>
                  <p className="selected__author">{book.author}</p>

                  <div className="selected__duration-wrapper">
                    <IoIosPlayCircle className="duration" />
                    <span className="duration__text">
                      {duration ? formatDuration(duration) : "--:--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Selected;