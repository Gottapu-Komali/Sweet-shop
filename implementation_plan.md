# Premium Telecom Analytics Dashboard
**Goal**  
Add a high‑density, enterprise‑grade analytics dashboard that matches the visual language you described (ultra‑light gray background, white cards, restrained palette, modular layout) using React, Tailwind CSS, Shadcn UI, Recharts, and Framer Motion.
## User Review Required
- **Dependencies**: `react-router-dom`, `recharts`, `@radix-ui/react-icons`, `@radix-ui/react-tooltip`, `framer-motion`, `class-variance-authority`, `clsx`, `shadcn/ui` (or the component library you prefer).  
  Approve installing them before we run any `npm install` commands.  
- **Design scope**: The plan includes placeholder/mock data for all charts & tables. If you have real API endpoints you want wired up, let me know after the dashboard is visible.
## Open Questions
> [!IMPORTANT]  
> *Do you want the navigation rail on the **left** (vertical) or on the **top** (horizontal)?*  
> *Do you need dark‑mode support in addition to the light theme?*  
> *Will the dashboard be the default landing page (`/`) or should it live under `/dashboard`?*
## Proposed Changes  
### 1️⃣ Add Tailwind custom palette  
**File:** `tailwind.config.js` (overwrite / extend)  
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F7FA",
        card: "#FFFFFF",
        border: "#E5E7EB",
        "text-primary": "#111827",
        "text-secondary": "#6B7280",
        green: "#10B981",
        red: "#EF4444",
        orange: "#F59E0B",
        blue: "#3B82F6",
        slate: "#334155",
      },
      borderRadius: {
        md: "0.5rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
```
### 2️⃣ Install required packages (once you approve)  
```bash
npm i react-router-dom recharts framer-motion @radix-ui/react-icons @radix-ui/react-tooltip class-variance-authority clsx
```
If you are using shadcn/ui, run the installer according to its docs (`npm i -D @shadcn/ui` and `npx shadcn-ui@latest init`).

### 3️⃣ Routing & Layout
**File:** `src/App.tsx`
```tsx
/* src/App.tsx */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout with navigation rail */}
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          {/* Add more top‑level routes here if needed */}
        </Route>
        <Route path="*" element={<div className="p-8">404 – Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
```
**File:** `src/components/Layout.tsx`
```tsx
/* src/components/Layout.tsx */
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
export default function Layout() {
  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```
### 4️⃣ Navigation Rail
**File:** `src/components/Sidebar.tsx`
```tsx
/* src/components/Sidebar.tsx */
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Settings, AlertCircle } from "lucide-react";
const items = [
  { to: "/dashboard", label: "Overview", icon: Home },
  { to: "/dashboard/revenue", label: "Revenue", icon: BarChart2 },
  { to: "/dashboard/operations", label: "Operations", icon: BarChart2 },
  { to: "/dashboard/customers", label: "Customers", icon: BarChart2 },
  { to: "/dashboard/billing", label: "Billing", icon: BarChart2 },
  { to: "/dashboard/vendors", label: "Vendors", icon: BarChart2 },
  { to: "/dashboard/reports", label: "Reports", icon: BarChart2 },
  { to: "/dashboard/alerts", label: "Alerts", icon: AlertCircle },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];
export default function Sidebar() {
  return (
    <nav className="w-64 flex flex-col bg-card border-r border-border shadow-card">
      <div className="flex h-16 items-center justify-center border-b border-border">
        <span className="font-display text-xl text-text-primary">SHF</span>
      </div>
      <ul className="flex-1 p-4 space-y-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md py-2 px-3 text-sm transition-colors ${
                  isActive
                    ? "bg-blue/5 text-blue"
                    : "text-text-secondary hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
### 5️⃣ Executive Header
**File:** `src/components/Header.tsx`
```tsx
/* src/components/Header.tsx */
import { Calendar, RefreshCw, Download } from "lucide-react";
export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl text-text-primary">
          Telecom Operations Dashboard
        </h1>
        <span className="text-sm text-text-secondary">
          Q3 2026 • Executive Overview
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-text-secondary hover:bg-gray-200">
          <Calendar className="w-4 h-4" /> Today
        </button>
        <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-text-secondary hover:bg-gray-200">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
        <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-text-secondary hover:bg-gray-200">
          <Download className="w-4 h-4" /> Export
        </button>
        <div className="relative">
          <span className="inline-flex h-3 w-3 rounded-full bg-green animate-pulse" />
          <span className="ml-2 text-sm text-text-primary">Live</span>
        </div>
      </div>
    </header>
  );
}
```
### 6️⃣ Core UI primitives
**File:** `src/components/KpiCard.tsx`
```tsx
/* src/components/KpiCard.tsx */
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
type Props = {
  title: string;
  value: string;
  trend: number;
  period?: string;
};
export default function KpiCard({ title, value, trend, period }: Props) {
  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const trendColor = isPositive ? "text-green" : "text-red";
  return (
    <div className="flex-1 min-w-[200px] rounded-md bg-card shadow-card border border-border p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <p className="text-sm text-text-secondary">{title}</p>
      <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
      <div className="mt-2 flex items-center gap-1 text-sm">
        <TrendIcon className={`w-4 h-4 ${trendColor}`} />
        <span className={trendColor}>{Math.abs(trend)}%</span>
        {period && <span className="text-text-secondary">vs {period}</span>}
      </div>
    </div>
  );
}
```
### 7️⃣ Mock data
**File:** `src/data/mockData.ts`
```ts
/* src/data/mockData.ts */
export const kpis = [
  { title: "Revenue", value: "$12.4M", trend: 8.2, period: "YoY" },
  { title: "EBITDA", value: "$3.1M", trend: 5.4, period: "YoY" },
  { title: "Gross Margin", value: "71%", trend: 1.2, period: "YoY" },
  { title: "Delivery Success", value: "98.7%", trend: 0.5, period: "MoM" },
  { title: "Active Accounts", value: "4,523", trend: 2.1, period: "MoM" },
  { title: "Churn Rate", value: "1.4%", trend: -0.3, period: "MoM" },
  { title: "Outstanding Receivables", value: "$2.3M", trend: 4.0, period: "YoY" },
  { title: "Default Accounts", value: "12", trend: -0.8, period: "MoM" },
];
export const revenueSeries = [
  { month: "Jan", target: 1.0, collected: 0.9 },
  { month: "Feb", target: 1.2, collected: 1.0 },
  { month: "Mar", target: 1.5, collected: 1.3 },
  { month: "Apr", target: 1.8, collected: 1.6 },
  { month: "May", target: 2.0, collected: 1.9 },
  { month: "Jun", target: 2.2, collected: 2.0 },
];
export const serviceRevenue = [
  { service: "SMS", value: 4.2 },
  { service: "WhatsApp", value: 3.1 },
  { service: "MMS", value: 2.5 },
  { service: "Voice", value: 2.6 },
];
export const alerts = [
  {
    severity: "critical",
    title: "Network outage in Mumbai",
    service: "SMS",
    impact: "$250k",
    time: "10 min ago",
  },
  {
    severity: "watch",
    title: "Latency spikes on VoIP",
    service: "Voice",
    impact: "$85k",
    time: "45 min ago",
  },
  {
    severity: "stable",
    title: "Billing system operating normally",
    service: "Billing",
    impact: "-",
    time: "1 h ago",
  },
];
```
### 8️⃣ Dashboard page (assembly)
**File:** `src/pages/Dashboard.tsx`
```tsx
/* src/pages/Dashboard.tsx */
import { motion } from "framer-motion";
import KpiCard from "../components/KpiCard";
import { kpis, revenueSeries, serviceRevenue, alerts } from "../data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} />
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Revenue Intelligence</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Target vs. Collected</h3>
            <ResponsiveContainer height={200}>
              <LineChart data={revenueSeries}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="target" stroke="#3B82F6" name="Target" />
                <Line type="monotone" dataKey="collected" stroke="#10B981" name="Collected" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Service‑wise Revenue</h3>
            <ResponsiveContainer height={200}>
              <BarChart data={serviceRevenue}>
                <XAxis dataKey="service" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Critical Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`rounded-md border p-4 shadow-card ${
                a.severity === "critical"
                  ? "border-red/30 bg-red/5"
                  : a.severity === "watch"
                  ? "border-orange/30 bg-orange/5"
                  : "border-green/30 bg-green/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-text-primary">{a.title}</h3>
                <span className="text-xs uppercase text-text-secondary">{a.severity}</span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{a.service}</p>
              <p className="mt-2 text-sm font-medium text-text-primary">Impact: {a.impact}</p>
              <p className="mt-1 text-xs text-text-secondary">{a.time}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Profitability Intelligence</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Margin Contribution</h3>
            <div className="h-32 bg-gradient-to-r from-green to-blue rounded-md" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Service Mix Heatmap</h3>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-sm ${
                    i % 3 === 0 ? "bg-green/30" : i % 3 === 1 ? "bg-blue/30" : "bg-slate/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Cash & Receivables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card overflow-x-auto">
            <h3 className="text-sm font-medium text-text-secondary mb-2">A/R Aging</h3>
            <table className="w-full text-sm text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="pb-2">Bucket</th>
                  <th className="pb-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-1">0‑30 days</td>
                  <td className="py-1 text-green"> $1.2 M</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-1">31‑60 days</td>
                  <td className="py-1 text-orange"> $0.6 M</td>
                </tr>
                <tr>
                  <td className="py-1">61‑90 days</td>
                  <td className="py-1 text-red"> $0.3 M</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-text-secondary">Collection Efficiency</p>
              <p className="text-3xl font-bold text-text-primary">92%</p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Customer Health & Churn</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Churn Trend (Last 12 mo)</h3>
            <ResponsiveContainer height={180}>
              <LineChart data={[
                { month: "Jan", churn: 1.5 },
                { month: "Feb", churn: 1.4 },
                { month: "Mar", churn: 1.6 },
                { month: "Apr", churn: 1.3 },
                { month: "May", churn: 1.2 },
                { month: "Jun", churn: 1.4 },
              ]}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="churn" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card overflow-x-auto">
            <h3 className="text-sm font-medium text-text-secondary mb-2">At‑Risk Accounts</h3>
            <table className="w-full text-sm text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="pb-2">Account</th>
                  <th className="pb-2">Risk</th>
                  <th className="pb-2">Revenue Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-1">Acme Corp.</td>
                  <td className="py-1"><span className="px-2 py-0.5 rounded bg-red/20 text-red text-xs">High</span></td>
                  <td className="py-1 text-red">$120 k</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-1">Beta Ltd.</td>
                  <td className="py-1"><span className="px-2 py-0.5 rounded bg-orange/20 text-orange text-xs">Medium</span></td>
                  <td className="py-1 text-orange">$45 k</td>
                </tr>
                <tr>
                  <td className="py-1">Gamma Inc.</td>
                  <td className="py-1"><span className="px-2 py-0.5 rounded bg-green/20 text-green text-xs">Low</span></td>
                  <td className="py-1 text-green">$8 k</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Operations & Delivery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card flex flex-col items-center">
            <p className="text-sm text-text-secondary mb-1">Delivery Success Rate</p>
            <p className="text-3xl font-bold text-text-primary">98.7%</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card flex flex-col items-center">
            <p className="text-sm text-text-secondary mb-1">Error Percentage</p>
            <p className="text-3xl font-bold text-red">0.9%</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-md bg-card border border-border p-4 shadow-card">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Network Uptime</h3>
            <ResponsiveContainer height={150}>
              <LineChart data={[
                { day: "Mon", up: 99.9 },
                { day: "Tue", up: 99.7 },
                { day: "Wed", up: 99.8 },
                { day: "Thu", up: 99.9 },
                { day: "Fri", up: 99.6 },
              ]}>
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis domain={[99, 100]} stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="up" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
```
### 9️⃣ Global styles (optional)
You already have `src/index.css`; add these CSS variables for easy referencing:
```css
/* src/index.css – after Tailwind imports */
:root {
  --bg: #F5F7FA;
  --card: #FFFFFF;
  --border: #E5E7EB;
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --green: #10B981;
  --red: #EF4444;
  --orange: #F59E0B;
  --blue: #3B82F6;
  --slate: #334155;
}
```
Then in JSX you can reference `bg-[var(--bg)]`, `border-[var(--border)]`, etc.

### 10️⃣ Run & verify
```bash
npm run dev
```
Open `http://localhost:5173` – you should see the left navigation rail, the executive header, and the assembled dashboard with mock data.

All components are built from reusable primitives (`KpiCard`, chart containers, tables) so you can swap in real API data later.

✅ Next Steps
- Approve the plan (and answer the open questions above).
- I’ll create the files in your workspace (or you can copy the snippets).
- After the files exist, run `npm install …` (if you gave the go‑ahead) and start the dev server.
- Let me know how you’d like to proceed!
