import './blog.css';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import news1 from '../assets/news1.jpeg';
import news2 from '../assets/news2.jpg';
import news3 from '../assets/news3.jpg';
import d1 from '../assets/d1.jpg';
import d2 from '../assets/d2.jpg';
import d3 from '../assets/d3.jpg';
import d4 from '../assets/d4.webp';
import pic from '../assets/pic.jpeg';
import hero from '../assets/hero.png';

const photos = [
  { id: 1, src: news1, caption: 'Community Blood Drive — Addis Ababa' },
  { id: 2, src: d1,    caption: 'Volunteer Donors at the Central Bank' },
  { id: 3, src: d2,    caption: 'Life-Saving Moments'},
  { id: 4, src: news2, caption: 'Annual Blood Donation Event 2025'},
  { id: 5, src: d3,    caption: 'Medical Team in Action' },
  { id: 6, src: pic,   caption: 'A Hero Among Us'},
  { id: 7, src: d4,    caption: 'Youth Donation Campaign'},
  { id: 8, src: news3, caption: 'Record-Breaking Drive — 500 Units'},
  { id: 9, src: hero,  caption: 'Every Drop Counts'},
];


export default function Blog() {
  const [lightbox, setLightbox] = useState(null);


  const currentIndex = photos.findIndex((p) => p.id === lightbox?.id);

  const prev = () => {
    const i = (currentIndex - 1 + photos.length) % photos.length;
    setLightbox(photos[i]);
  };

  const next = () => {
    const i = (currentIndex + 1) % photos.length;
    setLightbox(photos[i]);
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     setLightbox(null);
  };

  return (
    <>
      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-text">
          <h1>Photo Gallery</h1>
          <p>Moments from our blood donation campaigns, events, and community drives</p>
        </div>
      </section>

      {/* Filter */}
      
      {/* Grid */}
      <section className="gallery-grid-section">
        <div className="gallery-grid">
          {photos.map((photo) => (
            <div
              className="gallery-item"
              key={photo.id}
              onClick={() => setLightbox(photo)}
            >
              <img src={photo.src} alt={photo.caption} />
              <div className="gallery-overlay">
                <ZoomIn size={28} className="zoom-icon" />
                <span
                  className="gallery-tag"
                >
                  {photo.tag}
                </span>
                <p className="gallery-caption">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}>
              <X size={22} />
            </button>
            <button className="lb-nav lb-prev" onClick={prev}>&#8249;</button>
            <img src={lightbox.src} alt={lightbox.caption} />
            <button className="lb-nav lb-next" onClick={next}>&#8250;</button>
            <div className="lb-footer">
              <span
                className="gallery-tag"
              >
                {lightbox.tag}
              </span>
              <p>{lightbox.caption}</p>
              <span className="lb-counter">{currentIndex + 1} / {photos.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
