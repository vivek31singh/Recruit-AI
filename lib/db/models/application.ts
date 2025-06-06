import mongoose, { Schema } from "mongoose";

const ApplicationResponseSchema = new Schema({
  score: { type: Number, required: true },
  keyStrengths: { type: [{ type: String }], required: true },
  potentialWeaknesses: { type: [{ type: String }], required: true },
  goodMatch: { type: Boolean, required: true },
  followUpEmail: { type: String, required: true },
});


const ApplicationSchema = new Schema({
  subject: { type: String, required: true },
  from: { type: String, required: true },
  body: { type: String, required: true },
  parsedResume: { type: String, required: true }, 
  applicationResponse: { type: ApplicationResponseSchema, required: true },
});

export const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
