import { Schema, model, models } from "mongoose";
import { IUser } from "./user";
import { Document } from "mongodb";

export interface IPrompt extends Document {
  creator: Schema.Types.ObjectId | IUser;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
