import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app";

let token: string;

// Use uniqueEmail in your registration and login requests
const uniqueEmail = `admin_${Date.now()}@example.com`;

describe("Auth API", () => {
  it("should register a new admin user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "admin", email: uniqueEmail, password: "pass123", role: "admin" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered");
  });

  it("should login and receive a JWT token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: uniqueEmail, password: "pass123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });
});

// beforeAll(async () => {
//   // Register a new admin user
//   await request(app)
//     .post("/api/auth/register")
//     .send({ name: "admin", email: uniqueEmail, password: "pass123", role: "admin" });

//   // Login to get JWT
//   const loginRes = await request(app)
//     .post("/api/auth/login")
//     .send({ email: uniqueEmail, password: "pass123" });

//   token = loginRes.body.token;
// });

// describe("Shift API", () => {
//   it("should create a new shift when authenticated as admin", async () => {
//     const response = await request(app)
//       .post("/api/shifts")
//       .set('Authorization', `Bearer ${token}`)
//       .send({ facility: "Clinic A", role: "Nurse", date: "2025-09-01", payRate: 50 });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("_id");
//   });
// });

