import { User } from "../../../store.mjs";

export async function get(req, res) {
  let user = await User.findOne({ email: req.params.user_id });
  if (user == null) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(302, { Location: user.avatar });
  res.end();
}
