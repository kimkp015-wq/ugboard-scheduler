/**
 * UG Board Scheduler Worker
 * Runs weekly automation jobs (EAT timezone)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Health check
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          status: "ok",
          service: "ugboard-scheduler",
          timestamp: new Date().toISOString()
        }),
        { headers: { "Content-Type": "application/json" } }
      )
    }

    // Manual trigger (safe for testing)
    if (url.pathname === "/run") {
      return await runScheduler()
    }

    return new Response("Not found", { status: 404 })
  },

  // Cloudflare Cron trigger
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runScheduler())
  }
}

/**
 * Core scheduler logic
 * Billboard-style weekly window
 * Uses EAT timezone logic (handled by cron schedule)
 */
async function runScheduler() {
  try {
    // TODO (next step):
    // 1. Call Railway admin endpoint
    // 2. Publish regions (Eastern, Northern, Western)
    // 3. Lock snapshots

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Scheduler executed successfully",
        time: new Date().toISOString()
      }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        error: err.message
      }),
      { status: 500 }
    )
  }
}
