import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import "../component/movie.css";

const API = "https://jsonfakery.com/movies/simple-paginate";

const Movie = () => {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const getMovies = async (url = API, loadMore = false) => {
    try {
      setError("");

      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const res = await axios.get(url);

      const movies = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setData((prev) => loadMore ? [...prev, ...movies] : movies);
      setNextPage(res.data.next_page_url || null);
    } catch (err) {
      console.error("Movie API error:", err);
      setError("Unable to load movies. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="movie-message">
        <div className="loader"></div>
        <p>Discovering movies...</p>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="movie-message">
        <p>{error}</p>
        <button className="load-more" onClick={() => getMovies()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="movie-app">
      <header className="navbar">
        <a href="#" className="brand">
          CINE<span>VERSE</span>
        </a>

        <span className="navbar-label">MOVIE DISCOVERY</span>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            YOUR NEXT FAVORITE MOVIE AWAITS
          </span>

          <h1>
            Stories worth
            <br />
            <span>watching.</span>
          </h1>

          <p>
            Explore incredible movies, discover new stories,
            and find your next cinematic experience.
          </p>

          <a href="#movies" className="explore-button">
            Explore Collection <span>↓</span>
          </a>
        </div>

        <div className="hero-decoration">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="hero-symbol">C</div>
          <span className="hero-caption">CINEMA • STORIES • EMOTIONS</span>
        </div>
      </section>

      <section className="collection" id="movies">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED FOR YOU</span>
            <h2>Explore the collection<span>.</span></h2>
          </div>

          <div className="movie-count">
            <span className="count-dot"></span>
            {data.length} MOVIES LOADED
          </div>
        </div>

        {error && <p className="inline-error">{error}</p>}

        <div className="movie-grid">
          {data.map((movie, index) => (
            <Card
              key={movie.movie_id || movie.id || index}
              moviedata={movie}
            />
          ))}
        </div>

        {nextPage && (
          <div className="load-more-container">
            <button
              className="load-more"
              onClick={() => getMovies(nextPage, true)}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Discover More Movies"}
              {!loadingMore && <span> →</span>}
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        <a href="#" className="brand">
          CINE<span>VERSE</span>
        </a>
        <p>Made for people who love great stories.</p>
      </footer>
    </main>
  );
};

export default Movie;