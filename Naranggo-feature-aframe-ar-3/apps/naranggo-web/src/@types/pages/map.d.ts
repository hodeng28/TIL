interface ClusteredMarker {
  markerStory?: StoryItem[];
  markerId?: number;
  numberOfMarkers?: number;
  representative: string;
  lat: number;
  lng: number;
}

interface FilterItem {
  text: string;
  id: number;
  checked: boolean;
  filterType?: number;
}
