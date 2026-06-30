import Link from "next/link";

const links = [
  { href: "/", label: "Executive Summary" },
  { href: "/coverage", label: "Content Coverage" },
  { href: "/timeline", label: "Release Timeline" },
  { href: "/runway", label: "Content Runway" },
  { href: "/optimizer", label: "Release Optimizer" },
  { href: "/insights", label: "Strategic Insights" },
  { href: "/model-assumptions", label: "Model Assumptions" },
  { href: "/chat", label: "Ask the Director" }
];

export function SidebarNav() {
  return (
    <nav className="space-y-2">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pokémon GO</p>
        <h2 className="text-xl font-semibold">LiveOps Command Center</h2>
      </div>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
