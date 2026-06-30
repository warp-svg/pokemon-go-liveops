import type { Metadata } from "next";
import "./globals.css";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Pokémon Go LiveOps",
  description: "A mock live operations command center"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
            <aside className="hidden w-72 shrink-0 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 lg:block">
              <SidebarNav />
            </aside>
            <main className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
