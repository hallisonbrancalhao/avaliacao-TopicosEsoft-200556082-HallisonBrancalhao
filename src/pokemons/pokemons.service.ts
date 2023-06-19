import { HttpServer, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entitiy';
import { CreatePokemonsDto } from './dtos/create-pokemons.dto';
import * as fs from 'fs/promises';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel('pokemons') private readonly pokemonsModel: Model<Pokemon>,
    private httpService: HttpServer,
  ) {}

  async findByTipo(tipo: string) {
    return await this.pokemonsModel.find().where('tipo', tipo);
  }

  async findBynumDex(numDex: number) {
    return await this.pokemonsModel.findOne({ numDex });
  }

  async findByName(name: string) {
    return await this.pokemonsModel.find({ name });
  }

  async find() {
    const response = await this.httpService
      .get('http://localhost:3000/pokemons-data')
      .toPromise();
    const pokemons: Pokemon[] = response.data.slice(0, 10);
    return pokemons;
  }

  async findRandomMove(pokemon: Pokemon) {
    const movesSelecteds: any = [];

    while (movesSelecteds.length < 4) {
      const random = Math.floor(Math.random() * pokemon.moves?.length);
      if (!movesSelecteds.includes(pokemon[random]))
        movesSelecteds.push(pokemon[random]);
    }
    return movesSelecteds;
  }

  async save(createPokemonsDto: CreatePokemonsDto) {
    const pokemon = new this.pokemonsModel(createPokemonsDto);
    return await pokemon.save();
  }

  async write(pokemons: Pokemon[]) {
    await fs.writeFile('pokemons.json', JSON.stringify(pokemons, null, 2));
  }

  async savedb(pokemons: Pokemon[]) {
    return await this.pokemonsModel.insertMany(pokemons);
  }

  async read() {
    const pokemons = JSON.parse(await fs.readFile('pokemons.json', 'utf-8'));
    const grupos = pokemons.reduce((grupos: any, pokemons: any) => {
      if (grupos[pokemons.numDex]) {
        grupos[pokemons.numDex].push(pokemons);
      } else {
        grupos[pokemons.numDex] = [pokemons];
      }
      return grupos;
    }, {});
    await fs.writeFile(
      'pokemons-agrupados.json',
      JSON.stringify(grupos, null, 2),
    );
    return grupos;
  }
}
