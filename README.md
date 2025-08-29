# Healthcare Shift API

A RESTful API for managing healthcare shifts, including authentication, role-based access, and booking functionality.

## Features
- JWT Authentication
- Role-based access (Admin, Nurse)
- CRUD operations for shifts
- Booking system
- MongoDB (Atlas) integration

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- JWT & Bcrypt
- Postman (for API testing)

## Installation
```bash
git clone https://github.com/<your-username>/healthcare-shift-api.git
cd healthcare-shift-api
npm install
```

## Usage
Start the development server:
```bash
npm run dev
```

## API Endpoints
### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token

### Shifts
- `POST /api/shifts` — Create a shift (admin only)
- `GET /api/shifts` — Get all shifts
- `GET /api/shifts/:id` — Get a single shift
- `PUT /api/shifts/:id` — Update a shift (admin only)
- `DELETE /api/shifts/:id` — Delete a shift (admin only)
- `PATCH /api/shifts/:id/book` — Book a shift (nurse only)

## Testing
Use Postman or similar tools to test endpoints. For protected routes, add `Authorization: Bearer <token>` header.

## Deployment
- Use Docker, Render, or Heroku for hosting.
- Use MongoDB Atlas for cloud database.

## License
MIT
