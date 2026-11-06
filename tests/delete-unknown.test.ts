import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("DELETE /items/:id with an unknown id (issue #5)", () => {
  it("returns 404 and leaves the store unchanged", async () => {
    const app = createApp();
    const res = await request(app).delete("/items/999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "item not found" });
    const list = await request(app).get("/items");
    expect(list.body.total).toBe(5);
    const cable = await request(app).get("/items/5");
    expect(cable.status).toBe(200);
    expect(cable.body.name).toBe("USB-C Cable");
  });
});
