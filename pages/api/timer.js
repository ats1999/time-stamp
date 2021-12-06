import Timers from "modals/Timers";
import DB from "lib/db";
import { getSession } from "next-auth/react";

// return dd/mm/yyyy
const getDateString = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default async function tag(req, res) {
  await DB();
  const session = await getSession({ req });

  if (!session) return res.status(401).send("Login first!");

  const userId = session.user._id;
  const { time, tag, date } = req.body;
  if (req.method === "POST") {
    const latestTimer = await Timers.findOne({
      userId: userId,

      // if user prodided the back date, then insert into back date
      // otherwise insert into current date
      date: getDateString(date ? Number(date) : new Date()),
    });

    // create a timer for today
    if (!latestTimer) {
      const timer = new Timers({
        userId,
        date: getDateString(date ? Number(date) : new Date()),
        timeStamp: Date.now(),
        timerTags: [{ tag:tag?.toLowerCase(), time }],
      });

      await timer.save();
    } else {
      // check if the current tag is already present or not
      const curTagIdx = latestTimer.timerTags.findIndex(
        (timer) => timer.tag == tag?.toLowerCase()
      );

      if (curTagIdx != -1) {
        latestTimer.timerTags[curTagIdx].time += time;
      } else {
        latestTimer.timerTags.push({ tag:tag?.toLowerCase(), time });
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
      date: getDateString(Number(req.query.date)),
    });
    res.send(latestTimer?.timerTags || []);
  }
}
