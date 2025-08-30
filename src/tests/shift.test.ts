import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app";


// This makes the test independent by:
// Creating an admin user.
// Logging in to get a fresh JWT token.
// Using that token to create a shift.


let token: string;
// Use uniqueEmail in your registration and login requests
const uniqueEmail = `admin_${Date.now()}@example.com`;

beforeAll(async () => {
  // Register a new admin user
  await request(app)
    .post("/api/auth/register")
    .send({ name: "admin", email: uniqueEmail, password: "pass123", role: "admin" });

  // Login to get JWT
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: uniqueEmail, password: "pass123" });

  token = loginRes.body.token;
});

describe("Shift API", () => {
  it("should create a new shift when authenticated as admin", async () => {
    const response = await request(app)
      .post("/api/shifts")
      .set("Authorization", `Bearer ${token}`)
      .send({ facility: "Clinic A", role: "Nurse", date: "2025-09-01", payRate: 50 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });
});