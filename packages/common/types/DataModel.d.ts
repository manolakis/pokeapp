export type Pokemon = {
  /** The name for this resource. */
  name: string;
  /** URL of the Pokemon image */
  sprite: string | null;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
};

export type PokemonDetails = {
  /** The identifier for this resource. */
  id: number;
  /** The name for this resource. */
  name: string;
  /** The height of this Pokémon in decimetres. */
  height: number;
  /** The weight of this Pokémon in hectograms. */
  weight: number;
  /** Stats values for this Pokemon. */
  stats: PokemonStats;
};
