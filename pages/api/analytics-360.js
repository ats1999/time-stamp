import Timers from "modals/Timers";
import User from "modals/User";
import DB from "lib/db";
import { getSession } from "next-auth/react";
import { msToHr } from "lib/util";

export default async function tag(req, res) {
  try {
    await DB();
    const session = await getSession({ req });
    if (!session) return res.status(401).send("Login first!");
    const userId = session.user._id;

    const timers = await Timers.find({ userId });
    const tags = await User.findOne({ _id: userId }, { tags: 1 }).then(
      (user) => user.tags
    );

    const data = {
      timeSeries: [],
      totalDays: timers.length,
      //tags: [...tags, "total", "avg"],
      tags
    };

    const timeSeries = timers.map((timer) => {
      const op = { timeStamp: timer.timeStamp };

      let totalTimeCurDay = 0;
      // for each tag, find the number of hours spended on current day
      tags.forEach((tag) => {
        const time = timer.timerTags.find((timer) => timer.tag == tag)?.time;
        totalTimeCurDay += time || 0;
        op[tag] = time ? msToHr(time) : 0;
      });

      op.total = msToHr(totalTimeCurDay);
      op.avg = msToHr(totalTimeCurDay / timer.timerTags.length);
      return op;
    });

    data.timeSeries = timeSeries.reverse();
    data.totalHours = data.timeSeries
      .reduce((total, cur) => total + cur.total, 0)
      .toFixed(2);
    data.avgHours = (data.totalHours / data.totalDays).toFixed(2);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server error");
  }
}
