/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  tipo: string;

  @Prop()
  status: number;

  @Prop({ required: true })
  numDex: number;

  @Prop({ required: true })
  altura: number;

  @Prop({ required: true })
  peso: number;

  @Prop({ required: false })
  moves: [nome: string];
}

export const UserSchema = SchemaFactory.createForClass(Pokemon);
