import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  edited: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Message = models.Message || model("Message", MessageSchema);