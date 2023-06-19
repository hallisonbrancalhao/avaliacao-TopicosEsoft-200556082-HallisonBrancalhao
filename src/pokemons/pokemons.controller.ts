/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonsDto } from './dtos/create-pokemons.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async find() {
    return await this.pokemonsService.find();
  }

  @Post()
  async save(@Body() createPokemonsDto: CreatePokemonsDto) {
    return await this.pokemonsService.save(createPokemonsDto);
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string) {
    const pokemon = await this.pokemonsService.findByTipo(tipo);
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }

  @Get('numDex/:numDex')
  async findBynumDex(@Param('numDex') numDex: number) {
    const pokemon = await this.pokemonsService.findBynumDex(numDex);
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }

  @Get('nome/:nome')
  async findByName(@Param('nome') nome: string) {
    const pokemon = await this.pokemonsService.findByName(nome);
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }
}
export { PokemonsService };
