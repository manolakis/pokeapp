type NamedAPIResource = {
  /** The name of the referenced resource. */
  name: string;
  /** The URL of the referenced resource. */
  url: string;
};

type NamedAPIResourceList = {
  /** The total number of resources available from this API. */
  count: number;
  /** The URL for the next page in the list. */
  next: string;
  /** The URL for the previous page in the list. */
  previous: string;
  /** A list of named API resources. */
  results: Array<NamedAPIResource>;
};

type VersionGameIndex = {
  /** The internal id of an API resource within game data. */
  game_index: number;
  /** The version relevant to this game index. */
  version: NamedAPIResource;
};

type PokemonAbility = {
  /** Whether or not this is a hidden ability. */
  is_hidden: boolean;
  /** The slot this ability occupies in this Pokemon species. */
  slot: number;
  /** The ability the Pokemon may have. */
  ability: NamedAPIResource;
};

type PokemonHeldItem = {
  /** The item the referenced Pokemon holds. */
  item: NamedAPIResource;
  /** The details of the different versions in which the item is held. */
  version_details: Array<PokemonHeldItemVersion>;
};

type PokemonHeldItemVersion = {
  /** The version in which the item is held. */
  version: NamedAPIResource;
  /** How often the item is held. */
  rarity: number;
};

type PokemonMove = {
  /** The move the Pokemon can learn. */
  move: NamedAPIResource;
  /** The details of the version in which the Pokemon can learn the move. */
  version_group_details: Array<PokemonMoveVersion>;
};

type PokemonMoveVersion = {
  /** The method by which the move is learned. */
  move_learn_method: NamedAPIResource;
  /** The version group in which the move is learned. */
  version_group: NamedAPIResource;
  /** The minimum level to learn the move. */
  level_learned_at: number;
};

type PokemonSprites = {
  /** The default depiction of this Pokemon from the front in battle. */
  front_default: string | null;
  /** The shiny depiction of this Pokemon from the front in battle. */
  front_shiny: string | null;
  /** The female depiction of this Pokemon from the front in battle. */
  front_female: string | null;
  /** The shiny female depiction of this Pokemon from the front in battle. */
  front_shiny_female: string | null;
  /** The default depiction of this Pokemon from the back in battle. */
  back_default: string | null;
  /** The shiny depiction of this Pokemon from the back in battle. */
  back_shiny: string | null;
  /** The female depiction of this Pokemon from the back in battle. */
  back_female: string | null;
  /** The shiny female depiction of this Pokemon from the back in battle. */
  back_shiny_female: string | null;
  other: {
    dream_world: {
      /** The default depiction of this Pokemon from the front in battle. */
      front_default: string | null;
      /** The female depiction of this Pokemon from the front in battle. */
      front_female: string | null;
    };
  };
};

type PokemonStat = {
  /** The stat the Pokemon has. */
  stat: NamedAPIResource;
  /** The effort points (EV) the Pokemon has in the stat. */
  effort: number;
  /** The base value of the stat. */
  base_stat: number;
};

type PokemonType = {
  /** The order the Pokemon's types are listed in. */
  slot: number;
  /** The type the referenced Pokemon has. */
  type: NamedAPIResource;
};

export type Pokemon = {
  /** The identifier of this resource */
  id: number;
  /** The name of this resource */
  name: string;
  /** the base experience gained for defeating this Pokemon */
  base_experience: number;
  /** The height of this Pokemon in decimetres */
  height: number;
  /** Order for sorting. Almost national order, except families are grouped together. */
  order: number;
  /** The weight of this Pokemon in hectograms. */
  weight: number;
  /** A list of abilities this Pokemon could potentially have. */
  abilities: Array<PokemonAbility>;
  /** A list of forms this Pokemon can take on. */
  forms: NamedAPIResource;
  /** A list of game indices relevant to Pokemon item by generation. */
  game_indices: Array<VersionGameIndex>;
  /** A list of items this Pokemon may be holding when encountered. */
  held_items: Array<PokemonHeldItem>;
  /** A link to a list of location areas, as well as encounter details pertaining to specific versions. */
  location_area_encounters: string;
  /** A list of moves along with learn methods and level details pertaining to specific version groups. */
  moves: Array<PokemonMove>;
  /** A set of sprites used to depict this Pokemon in the game. */
  sprites: PokemonSprites;
  /** The species this Pokemon belongs to. */
  species: NamedAPIResource;
  /** A list of base stat values for this Pokemon. */
  stats: Array<PokemonStat>;
  /** A list of details showing types this Pokemon has. */
  types: Array<PokemonType>;
};
