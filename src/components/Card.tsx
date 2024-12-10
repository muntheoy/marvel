import React from 'react';
import styles from '../styles/Card.module.scss'; // Подключаем модуль стилей

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, onClick }) => {
  return (
    <div className={styles.contanier} onClick={onClick}> {/* Используем класс 'contanier' */}
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
