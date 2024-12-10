import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetails } from "../apiMethods";
import { Character } from "../types"; // Импортируем тип Character
import { toast } from "react-toastify"; // Импортируем toast
import "react-toastify/dist/ReactToastify.css"; // Импортируем стили для уведомлений
import styles from "../styles/DetailsPage.module.scss";

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      getCharacterDetails(Number(id))
        .then((data) => {
          setCharacter(data);
        })
        .catch((error) => {
          const errorMessage = error instanceof Error ? error.message : "Failed to load character details";
          setError(errorMessage);
          toast.error(errorMessage); // Показываем уведомление
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]); 
  if (loading) {
    return <p className={styles.loading}>Загрузка контента...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!character) {
    return <p className={styles.error}>Character not found</p>;
  }

  return (
    <div className={styles.container}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <div className={styles.info}>
        <div className={styles.title}>
          <h1>{character.name}</h1>
          <p>{character.description || "No description available."}</p>
        </div>

        <div className={styles.list}>
          <h2>Comics featuring this character:</h2>
          <ul>
            {character.comics.items.map((comicItem) => {
              const comicId = comicItem.resourceURI.split("/").pop(); 
              return (
                <li key={comicItem.resourceURI}>
                  <a href={`/comics/${comicId}`}>{comicItem.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
