import { Teams } from "./types/teams.type";
import teamModel from "./teams.schema";
import { readFile, writeFile } from "fs/promises";
import { Pokemons } from "src/pokemons/types/pokemons.types";
import pokemonsModel from "src/pokemons/pokemons.schema";
import pokemonsService from "src/pokemons/pokemons.service";

export class teamsService {
  constructor() {}

  async create(teams: Teams) {
    const pokemonsSquad = teams.team;
    if (pokemonsSquad.length < 6)
      return "São necessarios 6 pokenos para criar o time";

    let pokemonsList: any = [];
    pokemonsSquad.forEach(async (namePokemon) => {
      const pokemon: any = await pokemonsService.findByName(namePokemon.name);
      if (!pokemon) return;

      pokemonsList.push({
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        status: pokemon.status,
        numDex: pokemon.numDex,
        altura: pokemon.altura,
        peso: pokemon.peso,
      });
    });

    return await teamModel.insertMany(pokemonsList);
  }

  async list() {
    const listedteams = await teamModel.find();
    return listedteams;
  }

  async findByTrainer(trainerName: string) {
    return await teamModel.findOne({ trainerName });
  }

  async find(id: string) {
    return await teamModel.findById(id);
  }

  async update(trainerName: string, data: Pokemons) {
    const updatedteam = await teamModel.findOneAndUpdate(
      { trainerName },
      {
        nome: data.nome,
        tipo: data.tipo,
        status: data.status,
        numDex: data.numDex,
        altura: data.altura,
      },
      { new: true }
    );

    return updatedteam;
  }

  async delete(trainerName: string) {
    await teamModel.findOneAndDelete({ trainerName });
    return "Successfully deleted";
  }
}
