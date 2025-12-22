export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      // Health check
      if (url.pathname === "/health") {
        return new Response(
          JSON.stringify({
            status: "ok",
            service: "ugboard-scheduler",
            has_engine_url: !!env.ENGINE_BASE_URL
          }),
          { headers: { "content-type": "application/json" } }
        );
      }

      // Root welcome
      if (url.pathname === "/") {
        return new Response(
          JSON.stringify({
            status: "ok",
            message: "UG Board Scheduler Worker alive"
          }),
          { headers: { "content-type": "application/json" } }
        );
      }

      // Unknown route
      return new Response(
        JSON.stringify({ status: "not_found" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: "internal_worker_error"
        }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
  }
};