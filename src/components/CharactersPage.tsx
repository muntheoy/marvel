import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import styles from "../styles/ContentPage.module.scss";
import { textVariables } from "../textVariables";
import charactersStore from "../stores/charactersStore.ts";
import { observer } from "mobx-react-lite";
import debounce from 'lodash.debounce';

const CharactersPage: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    charactersStore.fetchCharacters();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    charactersStore.setSearchTerm(e.target.value);
    debouncedFetchCharacters(e.target.value);
  };

  const debouncedFetchCharacters = debounce((searchTerm: string) => {
    charactersStore.fetchCharacters(charactersStore.searchTerm, (charactersStore.currentPage - 1) * charactersStore.limit);
  }, 300);

  const handleSearchButtonClick = () => {
    console.log("Search button clicked");
  };

  const handlePageChange = (page: number) => {
    charactersStore.setCurrentPage(page);
    charactersStore.fetchCharacters(charactersStore.searchTerm, (page - 1) * charactersStore.limit);
  };

  if (charactersStore.loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (charactersStore.error) {
    return <div>{charactersStore.error}</div>;
  }

  const { filteredCharacters, currentPage, totalPages } = charactersStore;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{textVariables.charactersPageTitle}</h1>
        <h3 className={styles.cardCount}>({filteredCharacters.length})</h3>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder={textVariables.characterPlaceholder}
          value={charactersStore.searchTerm}
          onChange={handleSearchChange}
          className={styles.input}
        />
        <button onClick={handleSearchButtonClick} className={styles.button}>
          {textVariables.searchButton}
        </button>
      </div>

      <hr className={styles.divider} />

      <div className={styles.cardList}>
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            imageUrl={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            title={character.name}
            description={character.description}
            onClick={() => handleCardClick(character.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'< Previous'}
          </button>
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={currentPage === page + 1 ? styles.active : ''}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'Next >'}
          </button> 
        </div>
      )}
    </div>
  );
});

export default CharactersPage;
