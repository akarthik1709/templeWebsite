import { useEffect, useRef, useState } from "react";
import "./App.css";

const images = [
  "/sringeri.webp",
  "/adhistana.jpeg",
  "/shankaracharya.webp"
];

function CarouselComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const slideRef = useRef<HTMLDivElement>(null);

  const TOTAL_SLIDES = images.length;
  const extendedImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === TOTAL_SLIDES) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentSlide(0);
      }, 700);
      return () => clearTimeout(timeout);
    } else {
      setIsAnimating(true);
    }
  }, [currentSlide]);

  return (
    <div className="carousel-container">
      <div
        ref={slideRef}
        className="carousel-track"
        style={{
          transform: `translateX(-${currentSlide * (100 / extendedImages.length)}%)`,
          width: `${extendedImages.length * 100}%`,
          transition: isAnimating ? "transform 0.7s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((src, idx) => (
          <div
            key={idx}
            className="carousel-slide"
            style={{ width: `${100 / extendedImages.length}%` }}
          >
            <img src={src} alt={`slide-${idx}`} className="carousel-image" />
          </div>
        ))}
      </div>

      <div className="nav-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlide(idx);
              setIsAnimating(true);
            }}
            className={`nav-dot ${
              currentSlide % TOTAL_SLIDES === idx ? "active" : ""
            }`}
          />
        ))}
      </div>

      <button
        className="nav-button left"
        onClick={() => {
          setIsAnimating(true);
          setCurrentSlide((prev) =>
            prev === 0 ? TOTAL_SLIDES - 1 : prev - 1
          );
        }}
      >
        Prev
      </button>
      <button
        className="nav-button right"
        onClick={() => {
          setIsAnimating(true);
          setCurrentSlide((prev) => prev + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default CarouselComponent;
