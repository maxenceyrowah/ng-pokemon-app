export class Pokemon {
  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<string>;
  created: Date;

  constructor(
    name: string = 'Entrer un nom...',
    hp: number = 100,
    cp: number = 10,
    types: string[] = ['Normal'],
    picture: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png",
    created: Date = new Date()
  ) {
    this.name = name;
    this.cp = cp;
    this.hp = hp;
    this.types = types;
    this.picture = picture;
    this.created = created;
  }
}
