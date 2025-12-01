import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
