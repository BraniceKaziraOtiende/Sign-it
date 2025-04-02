export interface Video {
  id: string;
  url: string;
  word: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface SearchHistory {
  id: string;
  word: string;
  timestamp: number;
  videoId: string;
}