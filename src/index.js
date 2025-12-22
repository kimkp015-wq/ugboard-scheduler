export default {
  // HTTP entry (health + manual trigger)
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(JSON.stringify({
        status: "ok",
        service: "ugboard-scheduler",
        time: new Date().toISOString()
      }), { headers: { "Content-Type": "application/json" } });
    }

    if (url.pathname === "/run") {
      await runScheduler("manual");
      return new Response(JSON.stringify({
        status: "success",
        trigger: "manual"
      }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response("Not Found", { status: 404 });
  },

  // CRON entry
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runScheduler("cron"));
  }
};

// Core scheduler logic (single source of truth)
async function runScheduler(trigger) {
  console.log("UG Board scheduler running:", trigger);

  // 🚧 placeholder (next step we connect Railway / engine)
  // fetch("https://your-railway-service/run-weekly", { ... })

  return true;
}
