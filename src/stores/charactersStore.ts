import { makeAutoObservable } from "mobx";
import { getCharacters } from "../apiMethods";
import { Character } from "../types";
import { toast } from "react-toastify";

class CharactersStore {
  characters: Character[] = [];
  searchTerm: string = "";
  loading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  limit: number = 18; // Maximum number of cards per page

  constructor() {
    makeAutoObservable(this);
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
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

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  async fetchCharacters(nameStartsWith: string = "", offset: number = (this.currentPage - 1) * this.limit) {
    this.setLoading(true);
    this.setError(null);
  
    // Ensure offset is a number before passing it to getCharacters
    const parsedOffset = parseInt(offset.toString(), 10);
  
    try {
      const characters = await getCharacters(this.limit, nameStartsWith, parsedOffset);
      this.setCharacters(characters);
    } catch (error) {
      this.setError("Ошибка при загрузке данных");
      toast.error("Ошибка при загрузке данных");
    } finally {
      this.setLoading(false);
    }
  }

  get filteredCharacters() {
    return this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.characters.length / this.limit);
  }
}

const charactersStore = new CharactersStore();
export default charactersStore;
