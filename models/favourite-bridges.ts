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
  userId: number
  bridgeId: number
}

export interface UserFavouriteBridge {
  bridgeId: number
  imageUrl: string
  name: string
}