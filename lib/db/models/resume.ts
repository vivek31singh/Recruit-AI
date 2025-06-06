import mongoose, { Schema } from "mongoose";

const ResumeSchema = new Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  from: { type: String, required: true },
  body: { type: String, required: true },
  parsedResume: { type: Object, required: true }, 
});

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
