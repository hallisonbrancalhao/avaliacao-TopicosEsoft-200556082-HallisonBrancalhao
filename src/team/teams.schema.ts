import { Schema, model } from "mongoose";

const teamsSchema = new Schema(
  {
    trainerName: String,
    team: [
      {
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("teams", teamsSchema);
