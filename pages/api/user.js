import DB from "lib/db";
import User from "modals/User";
export default async function handler(req, res) {
  await DB();
  if (req.method === "POST") {
    res.send("You are post");
  } else {
    const user = new User({ email: "rkt" });
    await user.save();
    res.send(user);
  }
}
