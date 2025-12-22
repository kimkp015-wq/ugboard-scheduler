export default {
  async fetch(request, env, ctx) {
    return new Response(
      JSON.stringify({ status: "ok", service: "ugboard-scheduler" }),
      { headers: { "Content-Type": "application/json" } }
    );
  },

  async scheduled(event, env, ctx) {
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
        // NEVER crash the worker
        results.push({
          region,
          status: "error",
          error: err.message
        });
      }
    }

    // Log for Cloudflare observability
    console.log("Weekly region publish results:", results);
  }
};