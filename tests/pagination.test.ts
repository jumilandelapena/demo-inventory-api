import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { paginate } from "../src/utils.js";

describe("pagination (issue #1)", () => {
  it("paginate returns at most 'limit' items", () => {
    expect(paginate([1, 2, 3, 4, 5], 0, 2)).toEqual([1, 2]);
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
    expect(paginate([1, 2, 3, 4, 5], 0, 0)).toEqual([]);
  });

  it("GET /items?limit=N returns N items and pages do not overlap", async () => {
    const app = createApp();
    const first = await request(app).get("/items").query({ limit: 2 });
    expect(first.status).toBe(200);
    expect(first.body.limit).toBe(2);
    expect(first.body.items).toHaveLength(2);
    const second = await request(app).get("/items").query({ offset: 2, limit: 2 });
    expect(second.body.items).toHaveLength(2);
    const ids = [...first.body.items, ...second.body.items].map((i: { id: number }) => i.id);
    expect(new Set(ids).size).toBe(4);
  });
});
