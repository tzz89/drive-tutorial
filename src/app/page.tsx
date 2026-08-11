"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Clock3,
  File,
  FileText,
  Folder,
  FolderOpen,
  Grid2X2,
  HardDrive,
  HelpCircle,
  List,
  Menu,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

const folders = [
  {
    name: "Product design",
    owner: "Me",
    modified: "Today, 10:42 AM",
    items: "18 items",
    color: "blue",
  },
  {
    name: "Q3 marketing launch",
    owner: "Me",
    modified: "Yesterday",
    items: "42 items",
    color: "purple",
  },
  {
    name: "Team resources",
    owner: "Shared with me",
    modified: "Jul 28, 2026",
    items: "9 items",
    color: "green",
  },
  {
    name: "Brand assets",
    owner: "Me",
    modified: "Jul 25, 2026",
    items: "126 items",
    color: "orange",
  },
  {
    name: "Client projects",
    owner: "Shared with me",
    modified: "Jul 21, 2026",
    items: "24 items",
    color: "pink",
  },
  {
    name: "Archive",
    owner: "Me",
    modified: "Jul 12, 2026",
    items: "84 items",
    color: "slate",
  },
];

const files = [
  {
    name: "Project brief — Atlas",
    type: "Google Docs",
    size: "1.2 MB",
    modified: "Today, 9:18 AM",
    owner: "Me",
    icon: FileText,
    color: "blue",
  },
  {
    name: "Launch timeline",
    type: "Google Sheets",
    size: "842 KB",
    modified: "Yesterday",
    owner: "Me",
    icon: FileText,
    color: "green",
  },
  {
    name: "Homepage exploration.fig",
    type: "Figma file",
    size: "24.6 MB",
    modified: "Jul 29, 2026",
    owner: "Ava Chen",
    icon: File,
    color: "purple",
  },
];

const colorClasses: Record<string, string> = {
  blue: "text-sky-400 bg-sky-400/10",
  purple: "text-violet-400 bg-violet-400/10",
  green: "text-emerald-400 bg-emerald-400/10",
  orange: "text-orange-400 bg-orange-400/10",
  pink: "text-pink-400 bg-pink-400/10",
  slate: "text-slate-400 bg-slate-400/10",
};

export default function Page() {
  const [activeNav, setActiveNav] = useState("My Drive");
  const [query, setQuery] = useState("");
  const [isGrid, setIsGrid] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const filteredFolders = useMemo(
    () =>
      folders.filter((folder) =>
        folder.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center gap-4 border-b border-border px-4 md:px-7">
        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <HardDrive size={17} />
          </span>
          <span className="hidden sm:inline">
            Drive<span className="text-primary">space</span>
          </span>
        </div>
        <div className="ml-auto flex max-w-xl flex-1 items-center rounded-xl border border-input bg-card px-3 py-2 text-muted-foreground shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Search size={18} />
          <input
            aria-label="Search in Drive"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search in Drive"
            className="ml-3 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
            ⌘ K
          </kbd>
        </div>
        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          aria-label="Help"
        >
          <HelpCircle size={19} />
        </button>
        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          aria-label="Settings"
        >
          <Settings size={19} />
        </button>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          JD
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden w-60 shrink-0 border-r border-border p-4 md:block">
          <div className="relative mb-6">
            <button
              onClick={() => setShowNew(!showNew)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/10 transition hover:opacity-90"
            >
              <Plus size={18} /> New <ChevronDown size={15} />
            </button>
            {showNew && (
              <div className="absolute left-0 right-0 top-14 z-20 rounded-xl border border-border bg-popover p-1.5 shadow-2xl">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
                  <Upload size={16} /> File upload
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
                  <Folder size={16} /> New folder
                </button>
              </div>
            )}
          </div>
          <nav className="space-y-1 text-sm">
            {[
              ["My Drive", FolderOpen],
              ["Shared with me", Users],
              ["Recent", Clock3],
              ["Starred", Star],
              ["Trash", Trash2],
            ].map(([label, Icon]) => (
              <button
                key={label as string}
                onClick={() => setActiveNav(label as string)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${activeNav === label ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <Icon size={17} />
                <span>{label as string}</span>
              </button>
            ))}
          </nav>
          <div className="mt-8 border-t border-border pt-6">
            <div className="mb-2 flex items-center justify-between px-3 text-xs font-medium text-muted-foreground">
              <span>Storage</span>
              <span>68%</span>
            </div>
            <div className="mx-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
            <p className="mt-3 px-3 text-xs leading-5 text-muted-foreground">
              6.8 GB of 10 GB used
            </p>
            <button className="mt-3 px-3 text-xs font-medium text-primary hover:underline">
              Get more storage
            </button>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <button className="hover:text-foreground">My Drive</button>
                  <ChevronRight size={15} />
                  <span className="font-medium text-foreground">
                    {activeNav === "My Drive" ? "Workspace" : activeNav}
                  </span>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {activeNav}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGrid(false)}
                  className={`rounded-lg p-2 ${!isGrid ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-muted"}`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setIsGrid(true)}
                  className={`rounded-lg p-2 ${isGrid ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-muted"}`}
                  aria-label="Grid view"
                >
                  <Grid2X2 size={18} />
                </button>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">
                Folders{" "}
                <span className="ml-1 text-xs text-muted-foreground/70">
                  {filteredFolders.length}
                </span>
              </h2>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                Last modified <ChevronDown size={13} />
              </button>
            </div>
            {isGrid ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFolders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => setSelected(folder.name)}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition hover:border-primary/40 hover:bg-accent"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${colorClasses[folder.color]}`}
                    >
                      <Folder size={19} fill="currentColor" fillOpacity={0.2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {folder.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {folder.items} · {folder.owner}
                      </span>
                    </span>
                    <MoreVertical
                      size={17}
                      className="text-muted-foreground opacity-0 transition group-hover:opacity-100"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="hidden grid-cols-[minmax(0,1fr)_160px_110px_150px_48px] items-center gap-4 border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground sm:grid">
                  <span>Name</span>
                  <span>Owner</span>
                  <span>Items</span>
                  <span>Modified</span>
                  <span />
                </div>
                <div className="divide-y divide-border">
                  {filteredFolders.map((folder) => (
                    <button
                      key={folder.name}
                      onClick={() => setSelected(folder.name)}
                      className="group grid w-full grid-cols-[minmax(0,1fr)_48px] items-center gap-4 px-4 py-4 text-left transition hover:bg-accent sm:grid-cols-[minmax(0,1fr)_160px_110px_150px_48px]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${colorClasses[folder.color]}`}
                        >
                          <Folder
                            size={19}
                            fill="currentColor"
                            fillOpacity={0.2}
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">
                            {folder.name}
                          </span>
                          <span className="mt-1 block truncate text-xs text-muted-foreground sm:hidden">
                            {folder.owner} · {folder.items}
                          </span>
                        </span>
                      </span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:block">
                        {folder.owner}
                      </span>
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        {folder.items}
                      </span>
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        {folder.modified}
                      </span>
                      <span className="flex justify-end">
                        <MoreVertical
                          size={17}
                          className="text-muted-foreground opacity-0 transition group-hover:opacity-100"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4 mt-10 flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">
                Files{" "}
                <span className="ml-1 text-xs text-muted-foreground/70">
                  {files.length}
                </span>
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="hidden grid-cols-[minmax(0,1fr)_160px_110px_150px_48px] items-center gap-4 border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground sm:grid">
                <span>Name</span>
                <span>Type</span>
                <span>Size</span>
                <span>Modified</span>
                <span />
              </div>
              <div className="divide-y divide-border">
                {files.map((file) => {
                  const Icon = file.icon;
                  return (
                    <button
                      key={file.name}
                      onClick={() => setSelected(file.name)}
                      className="group grid w-full grid-cols-[minmax(0,1fr)_48px] items-center gap-4 px-4 py-4 text-left transition hover:bg-accent sm:grid-cols-[minmax(0,1fr)_160px_110px_150px_48px]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${colorClasses[file.color]}`}
                        >
                          <Icon size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">
                            {file.name}
                          </span>
                          <span className="mt-1 block truncate text-xs text-muted-foreground sm:hidden">
                            {file.type} · {file.size}
                          </span>
                        </span>
                      </span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:block">
                        {file.type}
                      </span>
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        {file.size}
                      </span>
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        {file.modified}
                      </span>
                      <span className="flex items-center justify-end gap-3">
                        <Share2
                          size={16}
                          className="text-muted-foreground opacity-0 transition group-hover:opacity-100"
                        />
                        <MoreVertical
                          size={17}
                          className="text-muted-foreground opacity-0 transition group-hover:opacity-100"
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              {selected
                ? `Selected “${selected}”`
                : "You’re viewing a mock Drive workspace"}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
