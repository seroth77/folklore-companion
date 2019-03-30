export interface ICharacterResources {
  Abilities?: string[];
  Archetype: string;
  Description: string;
  Equipment: {
    Weapon?: string;
  };
  Immunities?: string[];
  Limitations?: string[];
}

export interface IGameResources {
  Adventure: string;
  Characters: ICharacterResources[];
}
