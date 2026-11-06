import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("search is case-insensitive (issue #4)", () => {
  for (const q of ["desk", "DESK", "Desk"]) {
    it(`q=${q} returns both desk items`, async () => {
      const res = await request(createApp()).get("/items").query({ q });
      expect(res.status).toBe(200);
      expect(res.body.items.map((i: { name: string }) => i.name)).toEqual(["Desk Lamp", "Standing Desk"]);
    });
  }
});
