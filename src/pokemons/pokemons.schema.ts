import { Schema, model } from "mongoose";

const pokemonsSchema = new Schema(
  {
    nome: {
      type: "string",
      require: true,
    },
    tipo: {
      type: "string",
      require: true,
    },
    status: {
      type: "string",
      require: true,
    },
    numDex: {
      type: "string",
      require: true,
    },
    altura: {
      type: "string",
      require: true,
    },
    peso: {
      type: "string",
      require: true,
    },
    moves: [
      {
        name: String,
      },
    ],
  },
  { timestamps: true }
);

export default model("pokemons", pokemonsSchema);
