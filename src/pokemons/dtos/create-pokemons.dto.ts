/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class MoveDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreatePokemonsDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  numDex: number;

  @IsNumber()
  @IsNotEmpty()
  altura: number;

  @IsNumber()
  @IsNotEmpty()
  peso: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MoveDto)
  moves: MoveDto[];
}
