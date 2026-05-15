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
  /** Optional explicit ordered id list (overrides genre/myList selection). */
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
      return movieIds.map((id) => movies[id]).filter((m): m is Movie => m !== undefined);
    }
    if (!genreId) {
      return myList
        .map((item) => movies[item.movie_id])
        .filter((m): m is Movie => m !== undefined);
    }
    const selectedTags = tags.filter((t) => t.genre_id === genreId);
    return selectedTags
      .map((t) => movies[t.movie_id])
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

  useEffect(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft = 0;
  }, [genreId, movieIds]);

  const scroll = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const renderMovies = selectMovies();
  if (renderMovies.length === 0) return null;

  return (
    <div className="rail">
      {canScrollLeft && (
        <button type="button" className="rail-arrow left" onClick={() => scroll('left')} aria-label="Scroll left">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4 6 10l6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
      <div className="rail-scroller" ref={sliderRef}>
        {renderMovies
          .filter((movie) => movie && movie.id)
          .map((movie, i) => (
            <div key={movie.id} className="rail-cell">
              <MovieDetail
                movie={movie}
                tags={tags}
                genres={genres}
                myList={myList}
                currentProfileId={currentProfileId}
                createListItem={createListItem}
                deleteListItem={deleteListItem}
                index={i + 1}
              />
            </div>
          ))}
      </div>
      {canScrollRight && (
        <button type="button" className="rail-arrow right" onClick={() => scroll('right')} aria-label="Scroll right">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
    </div>
  );
};

export default GenreList;
