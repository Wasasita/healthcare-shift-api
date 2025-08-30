import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

const adminCredentials = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin"
};

describe("Shift API", () => {
  it("should create a new shift", async () => {
    const res = await request(app)
      .post("/api/shifts")
      .send({ facility: "Clinic A", role: "Nurse", date: "2025-09-01", payRate: 40 });
    expect(res.status).toBe(201);
    expect(res.body.facility).toBe("Clinic A");
  });
    let token: string;

    it("should register an admin user", async () => {
      await request(app)
        .post("/api/auth/register")
        .send(adminCredentials)
        .expect(201);
    });

    it("should login and get a JWT token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: adminCredentials.email, password: adminCredentials.password });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      token = res.body.token;
    });

    it("should create a new shift when authenticated as admin", async () => {
      const res = await request(app)
        .post("/api/shifts")
        .set("Authorization", `Bearer ${token}`)
        .send({ facility: "Clinic A", role: "Nurse", date: "2025-09-01", payRate: 40 });
      expect(res.status).toBe(201);
      expect(res.body.facility).toBe("Clinic A");
    });
});