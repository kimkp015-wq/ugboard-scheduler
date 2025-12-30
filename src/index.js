export default {
  async fetch() {
    return new Response(
      JSON.stringify({
        status: "ok",
        message: "UG Board Scheduler Worker alive",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async scheduled(event, env, ctx) {
    console.log("UGBOARD SCHEDULER CRON FIRED");

    // For now, no downstream calls
    // This proves cron execution only
  },
};

