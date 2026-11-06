import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("PUT /items/:id persistence (issue #3)", () => {
  it("persists the updated quantity for subsequent GETs", async () => {
    const app = createApp();
    const put = await request(app).put("/items/3").send({ quantity: 5 });
    expect(put.status).toBe(200);
    expect(put.body.quantity).toBe(5);

    const get = await request(app).get("/items/3");
    expect(get.status).toBe(200);
    expect(get.body.quantity).toBe(5);

    const list = await request(app).get("/items");
    const listed = list.body.items.find((i: { id: number }) => i.id === 3);
    expect(listed.quantity).toBe(5);
  });

  it("persists a rename and its new slug", async () => {
    const app = createApp();
    const put = await request(app).put("/items/3").send({ name: "Spiral Notebook" });
    expect(put.status).toBe(200);
    expect(put.body.slug).toBe("spiral-notebook");

    const get = await request(app).get("/items/3");
    expect(get.body.name).toBe("Spiral Notebook");
    expect(get.body.slug).toBe("spiral-notebook");
  });
});
