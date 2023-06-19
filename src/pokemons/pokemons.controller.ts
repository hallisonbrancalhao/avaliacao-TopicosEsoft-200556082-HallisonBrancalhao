import pokemonsService from "./pokemons.service";
import { Request, Response } from "express";

class pokemonsController {
  constructor() {}

  async find(req: Request, res: Response) {
    const pokemons = await pokemonsService.find();
    return res.status(200).json(pokemons);
  }

  async save(req: Request, res: Response) {
    return await pokemonsService.save();
  }

  async findByTipo(req: Request, res: Response) {
    return await pokemonsService.findByTipo(req.params.tipo);
  }

  async findBynumDex(req: Request, res: Response) {
    return await pokemonsService.findBynumDex(parseInt(req.params.tipo));
  }

  async findByName(req: Request, res: Response) {
    return await pokemonsService.findByName(req.params.nome);
  }
}

export default new pokemonsController();
