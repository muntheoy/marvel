// stores/comicStore.ts
import { makeAutoObservable } from 'mobx';
import axios from './api'; // Ваш axios инстанс

interface ComicDetails {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  characters: number[]; // Список ID персонажей
}

class ComicStore {
  comics: ComicDetails[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для загрузки всех комиксов
  async fetchComics() {
    this.loading = true;
    try {
      const response = await axios.get('/comics');
      this.comics = response.data.data.results;
    } catch (error) {
      this.error = 'Ошибка загрузки данных';
    } finally {
      this.loading = false;
    }
  }
}

const comicStore = new ComicStore();
export default comicStore;
