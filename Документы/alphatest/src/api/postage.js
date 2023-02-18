export const charactersLink = new URL('/api/character','https://rickandmortyapi.com');
charactersLink.searchParams.set('page', '1');
export const favoriteLink = new URL(`/api/character/${localStorage.getItem('favorites')}` ,'https://rickandmortyapi.com');