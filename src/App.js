import React, { useState } from "react";
import "./App.css";

function StarRating({ rating, onChange }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={value <= rating ? "star active" : "star"}
          onClick={() => onChange(value)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a movie title.");
      return;
    }

    onAddMovie({
      title: title.trim(),
      comment: comment.trim(),
      rating,
    });

    setTitle("");
    setComment("");
    setRating(0);
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter movie name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your review/comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="rating-section">
        <p>Choose rating:</p>
        <StarRating rating={rating} onChange={setRating} />
      </div>

      <button type="submit" className="add-btn">
        Add Movie
      </button>
    </form>
  );
}

function MovieCard({ movie, onRemove }) {
  const emojiStars = movie.rating > 0 ? "⭐".repeat(movie.rating) : "No stars yet";

  return (
    <div className="movie-card">
      <div className="movie-header">
        <h2>{movie.title}</h2>
        <button className="remove-btn" onClick={() => onRemove(movie.id)}>
          Remove
        </button>
      </div>

      <p>
        <strong>Review:</strong>{" "}
        {movie.comment ? movie.comment : "No review added."}
      </p>

      <p>
        <strong>Star Rating:</strong> {movie.rating}/5
      </p>

      <p>
        <strong>Emoji Stars:</strong> {emojiStars}
      </p>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);

  function addMovie(movie) {
    const newMovie = {
      id: Date.now() + Math.random(),
      ...movie,
    };

    setMovies((prevMovies) => [...prevMovies, newMovie]);
  }

  function removeMovie(id) {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  }

  const averageRating =
    movies.length > 0
      ? (
          movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="app">
      <div className="container">
        <h1>Movies Watch List</h1>
        <p className="subtitle">
          Save the movies you watched with your review and rating.
        </p>

        <MovieForm onAddMovie={addMovie} />

        <div className="summary">
          <span>Total Movies: {movies.length}</span>
          <span>Average Rating: {averageRating}</span>
        </div>

        <div className="movies-list">
          {movies.length === 0 ? (
            <p className="empty-message">No movies added yet.</p>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemove={removeMovie}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}