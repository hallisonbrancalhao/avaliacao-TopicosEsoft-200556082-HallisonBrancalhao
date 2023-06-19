import pokemonsModel from "./pokemons.schema";
import { Pokemons } from "./types/pokemons.types";
import { readFile, writeFile } from "fs/promises";

class pokemonsService {
  //QUESTAO 4
  async findByTipo(tipo: string) {
    return await pokemonsModel.find().where("tipo", tipo);
  }

  //QUESTAO 5
  async findBynumDex(numDex: number) {
    return await pokemonsModel.findOne({ numDex });
  }

  async findByName(name: string) {
    return await pokemonsModel.find({ name });
  }

  async find() {
    const data: Pokemons[] | any = await fetch(
      "http://localhost:3000/pokemons-data"
    );
    const pokemons: Pokemons[] = JSON.parse(data).limit(10);
    return pokemons;
  }

  async findRandomMove(pokemon: Pokemons) {
    let movesSelecteds: any = [];

    while (movesSelecteds.length < 4) {
      let random = Math.floor(Math.random() * pokemon.moves?.length!);
      if (!movesSelecteds.includes(pokemon[random]))
        movesSelecteds.push(pokemon[random]);
    }
    return movesSelecteds;
  }

  async save() {
    const data = await this.find();
    const pokemons: Pokemons[] | any = data.map((pokemon) => ({
      nome: pokemon.nome,
      tipo: pokemon.tipo,
      status: pokemon.status,
      numDex: pokemon.numDex,
      altura: pokemon.altura,
      peso: pokemon.peso,
      moves: this.findRandomMove(pokemon),
    }));
    await this.write(pokemons);
    await this.savedb(pokemons);
    return pokemons;
  }

  async write(pokemons: Pokemons[]) {
    writeFile("pokemons.json", JSON.stringify(pokemons, null, 2));
  }

  async savedb(pokemons: Pokemons[]) {
    return await pokemonsModel.insertMany(pokemons);
  }

  //QUESTÃO 2 (REDUCE)
  async read() {
    const pokemons = await readFile("pokemons.json");
    const grupos = pokemons.reduce((grupos: any, pokemons: any) => {
      if (grupos[pokemons.numDex]) {
        grupos[pokemons.numDex].push(pokemons);
      } else {
        grupos[pokemons.numDex] = [pokemons];
      }
      return grupos;
    }, {});
    writeFile("pokemons-agrupados.json", JSON.stringify(pokemons, null, 2));
    return pokemons;
  }
}

export default new pokemonsService();
