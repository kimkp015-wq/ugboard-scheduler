export default {
  async fetch(request, env, ctx) {
    return new Response("Cloudflare Worker is responding", {
      status: 200,
    });
  },

  async scheduled(event, env, ctx) {
    // This runs automatically based on the cron schedule
    console.log("UG Board scheduler triggered");

    // Placeholder for future logic
    // Example (later):
    // await fetch("https://ugboard-engine.yourdomain/work");

    return;
  },
};
