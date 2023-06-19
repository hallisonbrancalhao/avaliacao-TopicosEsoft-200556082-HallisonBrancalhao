export interface Pokemons {
  nome: string;
  tipo: string;
  status: string;
  numDex: number;
  altura: number;
  peso: number;
  moves?: [nome: string];
}
