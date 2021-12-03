import Timers from "modals/Timers";
import DB from "lib/db";
import { getSession } from "next-auth/react";

export default async function tag(req, res) {
  try {
    await DB();
    const session = await getSession({ req });
    if (!session) return res.status(401).send("Login first!");
    const userId = session.user._id;

    const timers = await Timers.find({ userId });

    const data = {
      timeSeries: [],
      totalDays: timers.length,
    };

    // track the total hours each day
    data.timeSeries = timers.map((timer) => {
      const totalMs = timer.timerTags.reduce(
        (total, cur) => total + cur.time,
        0
      );

      return [timer.timeStamp, Number((totalMs / (1000 * 60 * 60)).toFixed(2))];
    });

    // total hours worked since started
    data.totalHours = data.timeSeries
      .reduce((total, cur) => {
        return total + cur[1];
      }, 0)
      .toFixed(2);

    // avg hours each day
    data.avgHours = (data.totalHours / data.totalDays).toFixed(2);

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server error");
  }
}
