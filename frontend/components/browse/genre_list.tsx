import React, { useRef, useState, useCallback, useEffect } from 'react';
import MovieDetail from './movie_detail';
import type { Movie, Genre, Tag, ListItem } from '../../types';

interface Props {
  movies: Record<number, Movie>;
  genres: Genre[];
  tags: Tag[];
  myList: ListItem[];
  currentProfileId: number | null;
  genreId: number | null;
  /** When provided, override genre/myList selection with an explicit ordered id list. */
  movieIds?: number[];
  createListItem: (args: { movieId: number; profileId: number }) => void;
  deleteListItem: (listId: number) => void;
}

const GenreList: React.FC<Props> = ({
  movies, genres, tags, myList, currentProfileId, genreId, movieIds, createListItem, deleteListItem,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const selectMovies = useCallback((): Movie[] => {
    if (movieIds) {
      return movieIds
        .map((id) => movies[id])
        .filter((m): m is Movie => m !== undefined);
    }
    if (!genreId) {
      return myList
        .map((item) => movies[item.movie_id])
        .filter((m): m is Movie => m !== undefined);
    }
    const selectedTags = tags.filter((tag) => tag.genre_id === genreId);
    return selectedTags
      .map((tag) => movies[tag.movie_id])
      .filter((m): m is Movie => m !== undefined);
  }, [movies, tags, myList, genreId, movieIds]);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const renderMovies = selectMovies();
  if (renderMovies.length === 0) return null;

  return (
    <div className="carousel">
      {canScrollLeft && (
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      <div className="carousel-slider" ref={sliderRef}>
        {renderMovies
          .filter((movie) => movie && movie.id)
          .map((movie) => (
            <MovieDetail
              key={movie.id}
              movie={movie}
              tags={tags}
              genres={genres}
              myList={myList}
              currentProfileId={currentProfileId}
              createListItem={createListItem}
              deleteListItem={deleteListItem}
            />
          ))}
      </div>

      {canScrollRight && (
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GenreList;
