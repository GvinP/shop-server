import request from "supertest";
import { app } from "../../index";

describe("/auth", () => {
  it("should return 200 and user", async () => {
    const user = {
      username: 'user',
      email: 'user@mail.com',
      password: '12345678'
    }

    await request(app)
    .post("/api/auth/registration")
    .send(user)
    .expect(200, user);
  });
});
