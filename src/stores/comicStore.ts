import { makeAutoObservable } from "mobx";
import { Comic } from "../types"; 
import { getComics } from "../apiMethods";
import { toast } from "react-toastify"; 

class ComicStore {
  comics: Comic[] = [];
  searchTerm: string = "";
  loading: boolean = true;
  error: string | null = null;
  fetchCharacters: any;

  constructor() {
    makeAutoObservable(this);
  }

  setComics(comics: Comic[]) {
    this.comics = comics;
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  async fetchComics(limit: number = 5, nameStartsWith: string = "") {
    this.setLoading(true);
    this.setError(null); 
    try {
      const comics = await getComics(limit, nameStartsWith); 
      this.setComics(comics);
    } catch (error) {
      this.setError("Ошибка при загрузке данных");
      toast.error("Ошибка при загрузке данных"); 
    } finally {
      this.setLoading(false);
    }
  }

  get filteredComic() {
    return this.comics.filter((comics) =>
      comics.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

const comicStore = new ComicStore();
export default comicStore;
