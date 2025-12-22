export default {
  async fetch() {
    return new Response("Scheduler online");
  },

  async scheduled(event, env, ctx) {
    console.log("Scheduler fired");

    ctx.waitUntil(
      fetch("https://ugboard-engine.kimkp015.workers.dev/run", {
        method: "POST",
      })
    );
  },
};
