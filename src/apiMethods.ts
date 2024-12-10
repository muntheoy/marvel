import instance from './api';
import { Character, Comic } from './types';
import { toast } from 'react-toastify';

const fetchData = async (endpoint: string, limit: number, filterValue: string = "", filterKey: string = "nameStartsWith") => {
  try {
    const params: { [key: string]: any } = { limit };
    if (filterValue) params[filterKey] = filterValue;
    
    console.log(`Fetching data from ${endpoint} with params:`, params);
    const response = await instance.get(endpoint, { params });
    return response.data.data.results;
  } catch (error: any) {
    console.error("Error details:", error);
    toast.error("Ошибка при загрузке данных: " + (error.message || "Неизвестная ошибка"));
    throw new Error("Ошибка при загрузке данных: " + (error.message || "Неизвестная ошибка"));
  }
};

export const getCharacters = async (limit: number = 24, nameStartsWith: string = ""): Promise<Character[]> => {
  return await fetchData('/characters', limit, nameStartsWith, "nameStartsWith");
};

export const getCharacterDetails = async (characterId: number): Promise<Character> => {
  try {
    const response = await instance.get(`/characters/${characterId}`);
    return response.data.data.results[0];
  } catch (error) {
    toast.error("Ошибка при загрузке данных о персонаже");
    throw new Error("Ошибка при загрузке данных о персонаже");
  }
};

export const getComics = async (limit: number = 24, titleStartsWith: string = ""): Promise<Comic[]> => {
  return await fetchData('/comics', limit, titleStartsWith, "titleStartsWith");
};

export const getComicDetails = async (comicId: number): Promise<Comic> => {
  try {
    const response = await instance.get(`/comics/${comicId}`);
    return response.data.data.results[0];
  } catch (error) {
    toast.error("Ошибка при загрузке данных о комиксе");
    throw new Error("Ошибка при загрузке данных о комиксе");
  }
};

