import { Container, getContainer, getRandom } from "@cloudflare/containers";
import { Hono, Context, Next } from "hono";

export class MyContainer extends Container<Env> {
  // Port the container listens on (default: 8080)
  defaultPort = 4096;
  // Time before container sleeps due to inactivity (default: 30s)
  sleepAfter = "1h";
  // Environment variables passed to the container
  envVars = {
    MESSAGE: "I was passed in via the container class!",
  };

  // Optional lifecycle hooks
  override onStart() {
    console.log("Container successfully started");
  }

  override onStop() {
    console.log("Container successfully shut down");
  }

  override onError(error: unknown) {
    console.log("Container error:", error);
  }
}

// Create Hono app with proper typing for Cloudflare Workers
const app = new Hono<{
  Bindings: Env;
}>();

const bearerAuth = (secret: string) => {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.text("Unauthorized", 401);
    }
    const token = authHeader.substring(7);
    if (token !== secret) {
      return c.text("Unauthorized", 401);
    }
    await next();
  };
};

app.use("*", bearerAuth("HELLO_DUSTY_hunter2"));

app.all("*", async (c) => {
  const container = getContainer(c.env.MY_CONTAINER);
  return await container.fetch(c.req.raw);
});

export default app;
