import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

// Regression test for issue #4: search must be case-insensitive.
describe("GET /items?q= case-insensitive search", () => {
  it.each(["desk", "DESK", "Desk", "dEsK"])("q=%s returns both desk items", async (q) => {
    const res = await request(createApp()).get("/items").query({ q });
    expect(res.status).toBe(200);
    expect(res.body.items.map((i: { name: string }) => i.name)).toEqual(["Desk Lamp", "Standing Desk"]);
  });
});
