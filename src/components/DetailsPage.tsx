import React from "react";
import { useParams } from "react-router-dom";
import { characters, comics, Character, Comic } from "../data";
import styles from "../styles/DetailsPage.module.scss";

interface DetailsPageProps {
  entityType: "comics" | "character";
}

const DetailsPage: React.FC<DetailsPageProps> = ({ entityType }) => {
  const { id } = useParams<{ id: string }>();

  const data =
    entityType === "comics"
      ? comics.find((item) => item.id === Number(id)) 
      : characters.find((item) => item.id === Number(id)); 

  if (!data) {
    return <p className={styles.error}>Entity not found</p>;
  }

  const title = entityType === "comics" ? (data as Comic).title : (data as Character).name;

  return (
    <div className={styles.container}>

        <img src={data.imageUrl} alt={title} />

        <div className={styles.info}>
            <div className={styles.tide}>
                <h1>хуй</h1>
                <p>{data.description}</p>
            </div>
        

            {entityType === "character" && (
                <div className={styles.comicsList}>
                <h2>Comics featuring this character:</h2>
                <div className={styles.links}>
                    {(data as Character).comics.map((comicId) => {
                    const comic = comics.find((c) => c.id === comicId);
                    return (
                        comic && (
                            <a href={`/comics/${comic.id}`}>{comic.title}</a>
                        )
                    );
                    })}
                </div>
                </div>
            )}

            {/* If this is a comic, display the characters featured in it */}
            {entityType === "comics" && (
                <div className={styles.charactersList}>
                <h2>Characters in this comic:</h2>
                <ul>
                    {(data as Comic).characters.map((characterId) => {
                    const character = characters.find((c) => c.id === characterId);
                    return (
                        character && (
                        <li key={character.id}>
                            <a href={`/characters/${character.id}`}>{character.name}</a>
                        </li>
                        )
                    );
                    })}
                </ul>
                </div>
            )}
        </div>
    </div>
  );
};

export default DetailsPage;
