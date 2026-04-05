import React, { useState } from 'react';
import MovieDetail from './movie_detail';
import type { Movie, Genre, Tag, ListItem } from '../../types';

interface Props {
  movies: Record<number, Movie>;
  genres: Genre[];
  tags: Tag[];
  myList: ListItem[];
  currentProfileId: number | null;
  genreId: number | null;
  createListItem: (args: { movieId: number; profileId: number }) => void;
  deleteListItem: (listId: number) => void;
}

const GenreList: React.FC<Props> = ({
  movies, genres, tags, myList, currentProfileId, genreId, createListItem, deleteListItem,
}) => {
  const [xoffset, setXoffset] = useState(80);
  const [leftArrow, setLeftArrow] = useState(-100);
  const [rightArrow, setRightArrow] = useState(80);
  const delta = 200;

  const selectMovies = (): Movie[] => {
    if (!genreId) {
      return myList
        .map((item) => movies[item.movie_id])
        .filter((m): m is Movie => m !== undefined);
    }
    const selectedTags = tags.filter((tag) => tag.genre_id === genreId);
    return selectedTags
      .map((tag) => movies[tag.movie_id])
      .filter((m): m is Movie => m !== undefined);
  };

  const scrollLeft = (e: React.MouseEvent) => {
    const lastItem = (e.currentTarget.parentElement as HTMLElement).lastElementChild?.previousElementSibling as HTMLElement;
    if (!lastItem) return;
    const location = lastItem.getBoundingClientRect();
    if (window.innerWidth - location.right >= 20) return;
    setXoffset((prev) => prev - delta);
    setLeftArrow((prev) => prev + delta);
    setRightArrow((prev) => prev - delta);
  };

  const scrollRight = () => {
    if (xoffset === 80) return;
    setXoffset((prev) => prev + delta);
    setRightArrow((prev) => prev + delta);
    setLeftArrow((prev) => prev - delta);
  };

  const renderMovies = selectMovies();
  const display = renderMovies
    .filter((movie) => movie && movie.id)
    .map((movie) => (
      <MovieDetail
        myList={myList}
        currentProfileId={currentProfileId}
        createListItem={createListItem}
        deleteListItem={deleteListItem}
        key={movie.id}
        movie={movie}
        tags={tags}
        genres={genres}
      />
    ));

  return (
    <div
      className="genre-list"
      style={{ position: 'relative', left: `${xoffset}px` }}
    >
      <p
        id="left-arrow"
        style={{ left: `${leftArrow}px` }}
        onClick={scrollRight}
      >&#8249;</p>
      {display}
      <p
        id="right-arrow"
        onClick={scrollLeft}
        style={{ right: `${rightArrow}px` }}
      />
    </div>
  );
};

export default GenreList;
