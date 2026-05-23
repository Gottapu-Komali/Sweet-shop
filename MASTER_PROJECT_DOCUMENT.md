# Seethaiah Home Foods - Master Project Document

## Overview
This document serves as the Single Source of Truth and the Master Prompt for the **Seethaiah Home Foods** e‑commerce platform. It provides the necessary context, technical specifications, and design philosophy for any AI coding assistant to contribute effectively to this project.

---

🚀 **Project Master Prompt**
> "You are an expert full‑stack developer working on **'Seethaiah Home Foods'**, a premium digital storefront for traditional Telugu sweets and savories. The project is a monorepo consisting of a **React + Vite** frontend (`sweets-shop`) and a **Spring Boot** backend (`sweets-backend`). The design language is **'Modern Luxury Heritage'**, utilizing a palette of **Maroon, Gold, and Cream**. Your goal is to maintain a high‑end, responsive UI while ensuring robust backend connectivity for order processing, product management, and user authentication. Always prioritize mobile responsiveness, smooth animations (Framer Motion), and a seamless user experience that reflects the premium quality of the food."

---

## 🏛️ Project Architecture

### 1. Frontend (`sweets-shop`)
- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS (Custom Theme)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Management:** React Context API (Auth, Cart, Products)
- **Key Routes:**
  - `/` – Hero section with featured categories
  - `/menu` – Categorized product list (Sweets, Savories, Pickles, Powders)
  - `/festivals` – Curated seasonal collections
  - `/gifting` – Premium gift boxes and packaging
  - `/track-order` – Real‑time order status
  - `/admin` – Inventory and order management dashboard

### 2. Backend (`sweets-backend`)
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** H2 (In‑memory for development)
- **Persistence:** Spring Data JPA
- **Utilities:** Lombok
- **API:** RESTful endpoints for **Products**, **Orders**, and **Users**

---

## 🎨 Design System (Modern Luxury)
| Element   | Color / Style |
|-----------|----------------|
| **Primary**   | Maroon (`#800000`) – Represents heritage and richness |
| **Accent**    | Gold (`#D4AF37`) – Represents premium quality |
| **Background**| Cream (`#FDF5E6`) – Provides a warm, classic feel |
| **Typography**| Elegant Serif for headings, Clean Sans‑serif for body |
| **Cards**     | Glassmorphism effects with subtle gold borders |

---

## 📂 Directory Structure
```
seethaiah-home-foods/
├── sweets-shop/            # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Global state (Auth, Cart)
│   │   ├── pages/           # Main view components
│   │   └── index.css        # Global styles & Tailwind config
├── sweets-backend/         # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/      # Business logic, Controllers, Models
│   │   └── resources/      # Configuration & H2 DB setup
```

---

## 🛠️ Development Workflow
### Frontend
```bash
cd sweets-shop
npm install
npm run dev
```
### Backend
```bash
cd sweets-backend
./mvnw spring-boot:run
```

---

## 📝 Current Objectives
1. **UI/UX Refinement** – Ensure all pages meet the "Premium" aesthetic.
2. **API Integration** – Connect the frontend Context providers to the Spring Boot REST endpoints.
3. **Content Management** – Update product descriptions and images for the authentic Telugu delicacy catalog.
4. **Checkout Flow** – Finalize the payment gateway simulation and order confirmation.

---

*End of Document*
