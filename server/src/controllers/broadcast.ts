import { Server } from "socket.io";
import { getQuizStatus } from "../lib";
import { EV_NAMES } from "../config/socket";

export const broadcast = (io: Server) => {
    let interval: NodeJS.Timeout;
    // Broadcast Quiz info to all visitors
    interval = setInterval(async () => {
      const time = await getQuizStatus();
      io.emit(EV_NAMES.BROADCAST, time);
      if (
        time.countdown.hours <= 0 &&
        time.countdown.minutes <= 0 &&
        time.countdown.seconds <= 0
      )
        clearInterval(interval);
    }, 1000);
}