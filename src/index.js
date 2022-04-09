import express from 'express';
import movies from './movies.js';

const moviesSimplified = movies.map((movie) => ({
  id: movie.id,
  title: movie.title,
  url: movie.url,
  posterUrl: movie.posterUrl,
  genres: movie.genres,
  year: movie.year,
}));

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.redirect(301, 'https://czechitas-podklady-web.github.io/filmove-api');
});

app.get("/movies", (req, res) => {
  const genre = req.query.genre ? String(req.query.genre) : null;
  const year = req.query.year ? Number(req.query.year) : null;

  if (genre === null && year === null) {
    res.status(200).json(moviesSimplified);
    return;
  }

  if (genre !== null && year !== null) {
    const filtered = moviesSimplified.filter((movie) => {
      return movie.genres.includes(genre.toLowerCase()) && movie.year === year;
    });
    res.status(200).json(filtered);
    return;
  }

  if (genre !== null) {
    const filtered = moviesSimplified.filter((movie) => {
      return movie.genres.includes(genre.toLowerCase());
    });
    res.status(200).json(filtered);
    return;
  }

  const filtered = moviesSimplified.filter((movie) => {
    return movie.year === year;
  });
  res.status(200).json(filtered);
});

app.listen(port, () => console.log(`Listening on ${port}`));
