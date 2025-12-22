export default {
  async scheduled(event, env, ctx) {
    try {
      const now = new Date();

      // Convert UTC → EAT (UTC+3)
      const eatHour = (now.getUTCHours() + 3) % 24;
      const day = now.getUTCDay(); // 0 = Sunday

      // Billboard-style logic:
      // Monday–Thursday publishing window
      const isPublishingDay = day >= 1 && day <= 4;

      if (!isPublishingDay) {
        console.log("Not a publishing day. Skipping.");
        return;
      }

      console.log("UG Board weekly automation running");
      console.log("EAT hour:", eatHour);

      // TODO:
      // - lock previous chart
      // - recalc scores
      // - publish Top 100
      // - write audit log

    } catch (err) {
      console.error("Scheduler failed:", err);
    }
  }
};
export default {
  fetch() {
    return new Response("UG Board Scheduler is live");
  }
};
