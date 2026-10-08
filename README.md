👑 Royal Collection | Full-Stack E-Commerce Platform

Live Demo: https://royal-collection-eta.vercel.app

A full-stack e-commerce platform built with Next.js 16 App Router, React, TypeScript, MongoDB, and Stripe. The project includes authentication, persistent cart state, checkout, payment processing, and a protected admin dashboard.

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, TypeScript
- **State Management:** Zustand (Persist Middleware)
- **Backend:** Next.js Server Actions, Next.js Middleware
- **Validation:** Zod (`z.infer`)
- **Database:** MongoDB, Mongoose, Aggregation
- **Authentication:** JWT Authentication
- **Payments:** Stripe Checkout, Webhooks, Signature Verification
- **Deployment:** Vercel

## 🔥 Key Features

- **Persistent Cart:** Cart items are stored using Zustand Persist and remain available after page reloads and browser sessions.

- **Secure Checkout:** Integrated Stripe Checkout with Webhooks and signature verification for secure payment confirmation and order processing.

- **Protected Admin Dashboard:** Admin routes are protected using Next.js Middleware and JWT authentication.

- **MongoDB Aggregation:** Used MongoDB Aggregation for admin statistics such as total inventory value and average/max price.

- **Form Validation:** Used Zod for runtime validation with TypeScript types through `z.infer`.

- **Responsive UI:** Built a responsive e-commerce interface using Tailwind CSS with skeleton loading states.
- 

  <img width="1166" height="706" alt="Architecture" src="https://github.com/user-attachments/assets/96e180b8-9c80-4064-891d-0d2928640748" />


## 📂 Project Flow

### Customer Flow

Product → Cart → Checkout → Zod Validation → Stripe Checkout → Webhook → Order Confirmation

### Authentication Flow

Login → Authentication → Middleware → Protected Route → Authorized Access

### Admin Flow

Admin Login → Protected Dashboard → Orders & Data → MongoDB Aggregation

## 🛠️ Local Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
