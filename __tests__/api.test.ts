import request from "supertest";
import { app } from "../src/index";

describe("/api", () => {
  it("should return 200 and hello", async () => {
    await request(app).get("/").expect(200, "APP IS RUNNING");
  });
});
