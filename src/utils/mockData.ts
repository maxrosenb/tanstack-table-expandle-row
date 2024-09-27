import { faker } from "@faker-js/faker";

export interface Song {
  id: string;
  title: string;
  duration: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  coverArt: string;
  trackCount: number;
  songs: Song[];
}

export function createRandomAlbum(): AlbumItem {
  const trackCount = faker.number.int({ min: 1, max: 20 });

  const songs: Song[] = Array.from({ length: trackCount }, () => ({
    id: faker.string.uuid(),
    title: faker.music.songName(),
    duration: `${faker.number.int({ min: 2, max: 5 })}:${faker.number
      .int({ min: 0, max: 59 })
      .toString()
      .padStart(2, "0")}`,
  }));

  return {
    id: faker.string.uuid(),
    title: faker.music.songName(),
    artist: faker.person.fullName(),
    releaseDate: faker.date.past().toISOString().split("T")[0],
    genre: faker.music.genre(),
    coverArt: faker.image.url(),
    trackCount,
    songs,
  };
}

export function createRandomAlbums(numAlbums: number = 50): AlbumItem[] {
  return Array.from({ length: numAlbums }, createRandomAlbum);
}
