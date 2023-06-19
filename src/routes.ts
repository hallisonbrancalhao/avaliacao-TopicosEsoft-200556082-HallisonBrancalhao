import { Router } from "express";
import pokemonsController from "./pokemons/pokemons.controller";
import teamsController from "./team/teams.controller";

const routes = Router();

routes.get("/pokemons", pokemonsController.find);
routes.post("/pokemons", pokemonsController.save);
routes.get("/pokemons/:tipo", pokemonsController.findByTipo);
routes.get("/pokemons/:numDex", pokemonsController.findBynumDex);
routes.get("/pokemons/:nome", pokemonsController.findByName);

//CRUD TEAM
routes.post("/teams", teamsController.create);
routes.get("/teams", teamsController.list);
routes.get("/teams/:id", teamsController.find);
routes.get("/teams/:trainerName", teamsController.findByTrainer);
routes.put("/teams/:trainerName", teamsController.update);
routes.delete("/teams/:trainerName", teamsController.delete);

export default routes;
