import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = mongoose.Schema(
  {
    firebaseId: { type: String, unique: true },
    email: String,
    name: String,
    avatar: String,
  },
  { timestamps: true }
);
export const User = mongoose.model("User", UserSchema);

const ArticleSchema = mongoose.Schema(
  {
    author: String,
    title: String,
    text: String,
    published: Boolean,
  },
  { timestamps: true }
);
ArticleSchema.index({ title: "text", text: "text" });//index the db by title (for search)
export const Article = mongoose.model("Article", ArticleSchema);

