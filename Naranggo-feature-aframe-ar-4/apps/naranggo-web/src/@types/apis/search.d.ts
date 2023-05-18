interface MapSearchData {
  text: string;
  address: string;
}

interface SearchData extends StoryItem {
  matchScore: number;
  userinfo: string;
}
