import "./movie.css";

const Card = ({ moviedata }) => {
  const title =
    moviedata.title ||
    moviedata.original_title ||
    "Untitled Movie";

  const poster =
    moviedata.poster_path ||
    moviedata.poster ||
    moviedata.poster_url ||
    moviedata.image ||
    moviedata.backdrop_path;

  const rating =
    moviedata.vote_average ??
    moviedata.rating;

  const releaseDate =
    moviedata.release_date ||
    moviedata.releaseDate;

  const description =
    moviedata.overview ||
    moviedata.description ||
    moviedata.synopsis ||
    "No description is available for this movie.";

  const genres = Array.isArray(moviedata.genres)
    ? moviedata.genres
        .map((genre) =>
          typeof genre === "string" ? genre : genre.name
        )
        .filter(Boolean)
    : [];

  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      })
    : "Release date unavailable";

  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="movie-poster"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="poster-fallback"
          style={{ display: poster ? "none" : "flex" }}
        >
          <span>🎬</span>
          <p>Poster unavailable</p>
        </div>

        <div className="poster-overlay"></div>

        <div className="rating-badge">
          <span>★</span>
          {rating != null ? Number(rating).toFixed(1) : "N/A"}
        </div>

        {moviedata.original_language && (
          <span className="language-badge">
            {moviedata.original_language.toUpperCase()}
          </span>
        )}
      </div>

      <div className="card-content">
        <div className="movie-meta">
          <span>{formattedDate}</span>

          {moviedata.runtime && (
            <>
              <span className="meta-separator">•</span>
              <span>{moviedata.runtime} min</span>
            </>
          )}
        </div>

        <h3 className="movie-title" title={title}>
          {title}
        </h3>

        {genres.length > 0 && (
          <div className="genre-list">
            {genres.slice(0, 2).map((genre, index) => (
              <span className="genre-tag" key={`${genre}-${index}`}>
                {genre}
              </span>
            ))}
          </div>
        )}

        <p className="movie-description">
          {description}
        </p>

        {moviedata.vote_count != null && (
          <p className="vote-count">
            {Number(moviedata.vote_count).toLocaleString()} votes
          </p>
        )}

        <div className="card-bottom">
          <span className="card-label">MOVIE DETAILS</span>

          <button
            className="details-button"
            aria-label={`Show details for ${title}`}
            onClick={() => {
              window.alert(
                `${title}\n\nRelease date: ${formattedDate}\n\n${description}`
              );
            }}
          >
            ↗
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;