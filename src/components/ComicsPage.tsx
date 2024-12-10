import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import styles from "../styles/ContentPage.module.scss";
import { textVariables } from "../textVariables";
import { observer } from "mobx-react-lite";
import comicStore from "../stores/comicStore.ts"; 
import debounce from 'lodash.debounce';

const ComicsPage: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    comicStore.fetchComics();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/comics/${id}`); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    comicStore.setSearchTerm(e.target.value); 
    debouncedFetchComic(e.target.value); 
  };

  const handleSearchButtonClick = () => {
    console.log("Search button clicked");
  };

  const debouncedFetchComic = debounce((searchTerm: string) => {
    comicStore.fetchComics(5, searchTerm); 
  }, 3000);
  
  if (comicStore.loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (comicStore.error) {
    return <div>{comicStore.error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{textVariables.comicsPageTitle}</h1>
        <h3 className={styles.cardCount}>({comicStore.filteredComic.length})</h3>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder={textVariables.comicsPlaceholder}
          value={comicStore.searchTerm}
          onChange={handleSearchChange}
          className={styles.input}
        />
        <button onClick={handleSearchButtonClick} className={styles.button}>
          {textVariables.searchButton}
        </button>
      </div>

      <hr className={styles.divider} />

      <div className={styles.cardList}>
        {comicStore.filteredComic.map((comic) => (
          <Card
            key={comic.id}
            imageUrl={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            title={comic.title}
            description={comic.description}
            onClick={() => handleCardClick(comic.id)}
          />
        ))}
      </div>
    </div>
  );
});

export default ComicsPage;
