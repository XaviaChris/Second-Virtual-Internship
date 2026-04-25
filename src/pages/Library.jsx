import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./Library.css";
import { IoIosStarOutline } from "react-icons/io";
import { GoClock } from "react-icons/go";
import loginImage from "../assets/login.png";



function Library({ onLoginClick }) {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const booksRef = collection(
          db,
          "users",
          currentUser.uid,
          "books"
        );

        const snapshot = await getDocs(booksRef);

        const savedBooks = snapshot.docs.map((doc) => doc.data());
        setBooks(savedBooks);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="library">
      {!user ? (
        <div className="library__empty">
          <img className="login--img" src={loginImage} alt="login" />
          <h2>Log in to your account to see your library</h2>
              <button className="btn login__cta--btn"  onClick={onLoginClick}>Login</button>
           
        </div>
      ) : books.length === 0 ? (
        <div className="library__empty">
          <p>No saved books yet</p>
        </div>
      ) : (
        
        <div>
            <h2>Saved Books</h2>
            <p className="subtext">items</p>
            <div className="library__grid">
          {books.map((book) => (
            <div className="book__card" key={book.id}>
              <img className="library__book--img" src={book.imageLink} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="subtext">{book.author}</p>
              <p className="subtitle">{book.subTitle}</p>
              <div className="metrics"> 
                  <span className="book__duration">
                               <GoClock /> {book.audioLength ? `${Math.ceil(book.audioLength)} mins` : ""}
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
      )}
    </div>
  );
}

export default Library;