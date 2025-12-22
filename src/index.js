async function publishRegions(env) {
  const regions = ["Eastern", "Northern", "Western"];
  const results = [];

  for (const region of regions) {
    try {
      const res = await fetch(
        `${env.ENGINE_BASE_URL}/admin/regions/${region}/publish`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.ENGINE_SECRET_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );

      const text = await res.text();

      results.push({
        region,
        status: res.status,
        response: text
      });

    } catch (err) {
      results.push({
        region,
        status: "error",
        error: err.message
      });
    }
  }

  return results;
}

export default {
  // -------------------------
  // Health & manual trigger
  // -------------------------
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({ status: "ok", service: "ugboard-scheduler" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Manual trigger (secured)
    if (url.pathname === "/run-now" && request.method === "POST") {
      const auth = request.headers.get("Authorization");

      if (auth !== `Bearer ${env.ENGINE_SECRET_TOKEN}`) {
        return new Response(
          JSON.stringify({ error: "unauthorized" }),
          { status: 401 }
        );
      }

      const results = await publishRegions(env);

      return new Response(
        JSON.stringify({ status: "executed", results }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "not_found" }),
      { status: 404 }
    );
  },

  // -------------------------
  // Weekly cron
  // -------------------------
  async scheduled(event, env, ctx) {
    const results = await publishRegions(env);
    console.log("Weekly publish results:", results);
  }
};