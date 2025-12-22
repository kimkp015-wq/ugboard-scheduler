export default {
  async fetch(request, env) {
    try {
      // Only allow GET (simple safety)
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      // Build secure request to Railway engine
      const response = await fetch(
        `${env.ENGINE_BASE_URL}/admin/scheduler/run`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-ENGINE-TOKEN": env.ENGINE_SECRET_TOKEN,
          },
        }
      );

      if (!response.ok) {
        return new Response(
          JSON.stringify({ status: "engine_error" }),
          { status: 502 }
        );
      }

      const data = await response.json();

      return new Response(
        JSON.stringify({ status: "ok", data }),
        { headers: { "Content-Type": "application/json" } }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({ status: "worker_error" }),
        { status: 500 }
      );
    }
  },
};