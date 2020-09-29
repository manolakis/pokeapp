export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
};

export type Pokemon = {
  /** The identifier for this resource. */
  id: number;
  /** The name for this resource. */
  name: string;
  /** The height of this Pokemon in decimetres. */
  height: number;
  /** The weight of this Pokemon in hectograms. */
  weight: number;
  /** URL of the Pokemon image */
  sprite: string | null;
  /** Stats values for this Pokemon. */
  stats: PokemonStats;
};
