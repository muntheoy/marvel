import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComicDetails } from "../apiMethods";
import { Comic } from "../types"; // Импортируем тип Comic
import { toast } from "react-toastify"; // Импортируем toast
import "react-toastify/dist/ReactToastify.css"; // Импортируем стили для уведомлений
import styles from "../styles/DetailsPage.module.scss";

const ComicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      getComicDetails(Number(id))
        .then((data) => {
          setComic(data);
        })
        .catch((error) => {
          const errorMessage = error instanceof Error ? error.message : "Failed to load comic details";
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

  if (!comic) {
    return <p className={styles.error}>Comic not found</p>;
  }

  return (
    <div className={styles.container}>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <div className={styles.info}>
        <div className={styles.title}>
          <h1>{comic.title}</h1>
          <p>{comic.description || "No description available."}</p>
        </div>

        <div className={styles.list}>
          <h2>Characters in this comic:</h2>
          <ul>
            {comic.characters.items.map((characterItem) => {
              const characterId = characterItem.resourceURI.split("/").pop(); 
              return (
                <li key={characterItem.resourceURI}>
                  <a href={`/characters/${characterId}`}>{characterItem.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComicDetails;
