import request from "supertest";
import { app } from "../../index";

describe("/login", () => {
  it("should return 200 and user", async () => {
    const user = {
      email: 'user@mail.com',
      password: '12345678'
    }

    const response = await request(app)
    .post("/api/auth/login")
    .send(user)
    .expect(200)

    const {username, email} = response.body

    expect(username).toBe('user')
    expect(email).toBe('user@mail.com')
  });
});
