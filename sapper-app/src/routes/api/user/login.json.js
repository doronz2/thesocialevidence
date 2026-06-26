import { User } from "../../../store.mjs";

export async function post(req, res) {
  let user = await User.findOne({ firebaseId: req.body.firebaseId });
  if (user == null) {
    user = new User({ firebaseId: req.body.firebaseId });
  }
  user.email = req.body.email;
  user.avatar = req.body.avatar;
  user.name = req.body.name;
  await user.save();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user, null, 2));
}
