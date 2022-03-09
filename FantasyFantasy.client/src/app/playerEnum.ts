export enum Race {
  Elf = 'QB',
  Human = 'WR',
  Dwarf = 'HB',
  Gnome = 'RB',
  HalfOrc = 'TE',
  Halfling = 'DEF',
}

export namespace Race {
  export const members: Race[] = [
    Race.Elf,
    Race.Human,
    Race.Dwarf,
    Race.Gnome,
    Race.HalfOrc,
    Race.Halfling,
  ];

  export function toString(race: Race): string {
    switch (race) {
      case Race.Elf:
        return 'Elf';
      case Race.Human:
        return 'Human';
      case Race.Dwarf:
        return 'Dwarf';
      case Race.Gnome:
        return 'Gnome';
      case Race.HalfOrc:
        return 'HalfOrc';
      case Race.Halfling:
        return 'Halfling';
    }
  }
}
