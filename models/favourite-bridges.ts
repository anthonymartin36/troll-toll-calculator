export interface FavouriteBridge {
  id: number
  userId: number
  bridgeId: number
}

export interface NewFavouriteBridge {
  userId: number
  bridgeId: number
}

export interface RemoveFavouriteBridge {
  id: number
}