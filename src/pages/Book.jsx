import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Book.css";
import { IoIosStarOutline } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SlBookOpen } from "react-icons/sl";
import { IoMicOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [saved, setSaved] = useState(false);
  const [duration, setDuration] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBook(data);

        const audio = new Audio(data.audioLink);
        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const checkIfSaved = async () => {
      const user = auth.currentUser;
      if (!user || !id) return;

      const bookRef = doc(db, "users", user.uid, "books", id);
      const docSnap = await getDoc(bookRef);

      setSaved(docSnap.exists());
    };

    checkIfSaved();
  }, [id]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user || !book) return;

    const bookRef = doc(db, "users", user.uid, "books", book.id);

    if (saved) {
      await deleteDoc(bookRef);
      setSaved(false);
    } else {
      await setDoc(bookRef, { ...book });
      setSaved(true);
    }
  };

  function formatDuration(seconds) {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book">
      <div className="book__wrapper">
        <div className="book__right">
          <h1 className="book__title">{book.title}</h1>
          <p className="book__author">{book.author}</p>
          <h3 className="book__subtitle">{book.subTitle}</h3>
          <hr className="line__divider" />

          <div className="book__meta">
            <div className="meta--top">
              <span className="book__meta-item">
                <IoIosStarOutline className="meta__icon" />
                {book.averageRating}{" "}
                <span className="book__rating-count">
                  ({book.totalRating} ratings)
                </span>
              </span>

              <span className="book__meta-item-top">
                <LuClock className="meta__icon clock "  />
                {duration ? formatDuration(duration) : "--:--"}
              </span>
            </div>

            <div className="meta--bottom">
              <span className="book__meta-item-bottom">
                <IoMicOutline className="meta__icon" />
                Audio & Text
              </span>

              <span className="book__meta-item-bottom">
                <HiOutlineLightBulb className="meta__icon" />
                {book.keyIdeas} <span className="key">Key Ideas</span>
              </span>
            </div>
          </div>

          <hr className="line__divider" />

          <p className="book__description">{book.description}</p>

          <div className="book__actions">
            <button
              className="book__btn book__btn--primary"
              onClick={() => navigate(`/player/${book.id}`)}
            >
              <SlBookOpen className="button--icons" /> Read
            </button>

            <button
              className="book__btn book__btn--secondary"
              onClick={() => navigate(`/player/${book.id}`)}
            >
              <IoMicOutline className="button--icons" /> Listen
            </button>
          </div>
        </div>

        <div className="book__left">
          <img src={book.imageLink} alt={book.title} />
        </div>
      </div>

      <button
        type="button"
        className={`book__save ${saved ? "is-saved" : ""}`}
        onClick={handleSave}
        aria-pressed={saved}
      >
        {saved ? (
          <>
            <FaBookmark className="book__save-icon" />
            Saved in My Library
          </>
        ) : (
          <>
            <CiBookmark className="book__save-icon" />
            Add Title to My Library
          </>
        )}
      </button>

      <div className="book__description">
        <h2 className="book__description-heading">What's it about?</h2>

        <div className="book__tags">
          {book.tags?.slice(0, 2).map((tag, index) => (
            <button className="book__tag" key={index}>
              {tag}
            </button>
          ))}
        </div>

        <div>{book.bookDescription}</div>

        <h2 className="book__description-heading">About the author</h2>
        <div>{book.authorDescription}</div>
      </div>
    </div>
  );
}

export default Book;