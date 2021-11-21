import Timers from "modals/Timers";
import DB from "lib/db";
import { getSession } from "next-auth/react";

export default async function tag(req, res) {
  await DB();
  const session = await getSession({ req });

  if (!session) return res.status(401).send("Login first!");

  const userId = session.user._id;
  const { time, tag } = req.body;

  if (req.method === "POST") {
    const latestTimer = await Timers.findOne({
      userId: userId,
      date: new Date().toLocaleDateString(),
    });

    // create a timer for today
    if (!latestTimer) {
      const timer = new Timers({
        userId,
        date: new Date().toLocaleDateString(),
        timeStamp: Date.now(),
        timerTags: [{ tag, time }],
      });

      await timer.save();
    } else {
      // check if the current tag is already present or not
      const curTagIdx = latestTimer.timerTags.findIndex(
        (timer) => timer.tag == tag
      );

      if (curTagIdx != -1) {
        latestTimer.timerTags[curTagIdx].time += time;
      } else {
        latestTimer.timerTags.push({ tag, time });
      }

      await Timers.findOneAndUpdate(
        { _id: latestTimer._id },
        { $set: { timerTags: latestTimer.timerTags } }
      );
    }
    res.send("OK");
  } else {
    const latestTimer = await Timers.findOne({
      userId: userId,
      date: new Date(req.query.date).toLocaleDateString(),
    });
    res.send(latestTimer?.timerTags || []);
  }
}
