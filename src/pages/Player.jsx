import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Player.css";
import { IoPlay, IoPause } from "react-icons/io5";
import { RiReplay10Fill, RiForward10Fill } from "react-icons/ri";

function Player({ fontSize }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await res.json();
      setBook(data);
    };

    fetchBook();
  }, [id]);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const handleRewind = () => {
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoaded = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!book) return null;

  return (
    <div className="player">
      <div className="player__content">
        <h1 className="player__title">{book.title}</h1>
        <hr className="line__divider" />

        <div
            className="player__summary"
            style={{ fontSize: `${fontSize}px` }}
          >
            {book.summary?.split("\n\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
      </div>

      <div className="player__bar">
        <img
          src={book.imageLink}
          alt={book.title}
          className="player__bar-img"
        />

        <div className="player__info">
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </div>

        <div className="player__controls">
          <button onClick={handleRewind}>
            <RiReplay10Fill />
          </button>

          <button onClick={handlePlay}>
            {playing ? <IoPause /> : <IoPlay />}
          </button>

          <button onClick={handleForward}>
            <RiForward10Fill />
          </button>
        </div>

        <div className="player__timeline">
          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
      />
    </div>
  );
}

export default Player;