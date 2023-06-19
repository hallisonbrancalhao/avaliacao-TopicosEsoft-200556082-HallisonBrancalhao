import { Request, Response } from "express";
import { teamsService } from "./teams.service";

class teamController {
  async create(req: Request, res: Response) {
    const team = await new teamsService().create(req.body);
    return res.status(200).json(team);
  }

  async list(req: Request, res: Response) {
    const teams = await new teamsService().list();
    if (teams) return res.status(200).json(teams);
    return res.status(400).json("team not found");
  }
  async update(req: Request, res: Response) {
    const updatedteam = await new teamsService().update(
      req.params.trainerName,
      req.body
    );
    return res.status(200).json(updatedteam);
  }
  async delete(req: Request, res: Response) {
    return await new teamsService().delete(req.params.trainerName);
  }

  async findByName(req: Request, res: Response) {}

  async findByTrainer(req: Request, res: Response) {
    return await new teamsService().findByTrainer(req.params.trainerName);
  }

  async find(req: Request, res: Response) {
    return await new teamsService().find(req.params.id);
  }
}

export default new teamController();
