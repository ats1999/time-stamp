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
    };

    data.timeSeries = timers.map((timer) => {
      const totalMs = timer.timerTags.reduce(
        (total, cur) => total + cur.time,
        0
      );

      return [timer.timeStamp, Number((totalMs / (1000 * 60 * 60)).toFixed(2))];
    });
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server error");
  }
}
