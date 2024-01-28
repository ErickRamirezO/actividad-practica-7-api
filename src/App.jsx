// App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { MagicMotion } from 'react-magic-motion';
import getYouTubeResults from './youtubeApi';
import logo from '../public/logo.png';

import './App.css';

export default function App() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const lyricsResponse = await axios.get(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
      );

      const youtubeResults = await getYouTubeResults(artist, title);

      setLyrics(lyricsResponse.data.lyrics);
      setYoutubeResults(youtubeResults);
      setError('');
    } catch (error) {
      setLyrics('');
      setYoutubeResults([]);
      setError('Lyrics not found');
      console.error('Error fetching lyrics:', error);
    }
  };

  return (
    
    <div className='container-general'>
      <MagicMotion>
        <div className="navbar">
          <img src={logo} alt="Mi Imagen" className='logo' />
          <nav>
            <ul>
              <li><a href="#">Encuentra tu ritmo, encuentra tus palabras</a></li>
            </ul>
          </nav>
        </div>
        <h1 className="mb-4 formartoLyris"><center>Buscador de letras de musicas</center></h1>
        <div className="container mt-5">
          <div className="content-wrapper">
            <div className='letra'>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Artist:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <center><button type="submit" className="btn btn-primary">Buscar</button></center>
              </form>
              {lyrics && (
                <div className="mt-4">
                  <h2 className="mb-3"><center>{artist} - {title}</center>
                  </h2>
                  <p className='letramusica'><center><pre>{lyrics}</pre></center></p>
                </div>
              )}
            </div>
            <div className="video">
              {youtubeResults.length > 0 && (
                <div className="mt-4 containerYoutube">
                  <h2 className="mb-3 centered-text musicauwu"></h2>
                  <div className="youtube-results">
                    {youtubeResults.map((result) => (
                      <div key={result.id.videoId} className="youtube-result centered-text">
                        <h3>{result.snippet.title}</h3>
                        <iframe
                          title={result.snippet.title}
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${result.id.videoId}`}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <p className="text-danger mt-4">{error}</p>}
        </div>
      </MagicMotion>
    </div>
  );
}