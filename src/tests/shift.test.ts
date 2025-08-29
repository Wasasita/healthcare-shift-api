import request from "supertest";
import app from "../app";
import { describe, it } from "node:test";

describe("Shift API", () => {
  it("should create a new shift", async () => {
    const res = await request(app)
      .post("/api/shifts")
      .send({ facility: "Clinic A", role: "Nurse", date: "2025-09-01", payRate: 40 });
    expect(res.status).toBe(201);
    expect(res.body.facility).toBe("Clinic A");
  });
});
function expect(received: any) {
    return {
        toBe(expected: any) {
            if (received !== expected) {
                throw new Error(`Expected ${received} to be ${expected}`);
            }
        }
    };
}

