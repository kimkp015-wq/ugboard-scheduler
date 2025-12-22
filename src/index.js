export default {
  /**
   * Runs automatically via Cloudflare Cron
   */
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runScheduler(env, "cron"));
  },

  /**
   * Optional manual trigger (protected)
   * GET /run
   */
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/run") {
      return new Response("Not found", { status: 404 });
    }

    const token = request.headers.get("Authorization");
    if (token !== `Bearer ${env.SCHEDULER_TOKEN}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    await runScheduler(env, "manual");
    return new Response("Scheduler executed");
  }
};

async function runScheduler(env, source) {
  const ENGINE_URL = "https://YOUR-ENGINE-URL/admin/regions/publish-weekly";

  const res = await fetch(ENGINE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.ENGINE_SECRET_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source,
      triggered_at: new Date().toISOString()
    })
  });

  if (!res.ok) {
    console.error("Scheduler failed", await res.text());
  }
}
