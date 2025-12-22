export default {
  fetch(request, env, ctx) {
    return new Response("Cloudflare Worker is responding", {
      status: 200,
      headers: {
        "content-type": "text/plain",
      },
    });
  },
};
