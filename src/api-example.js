// Example fetch calls (relative /api - proxied by Vite in dev)

// Status
const status = await fetch("/api/status").then((r) => {
  if (!r.ok) throw new Error("Status failed");
  return r.json();
});

// Specs
const specs = await fetch("/api/specs?limit=5").then((r) => {
  if (!r.ok) throw new Error("Specs failed");
  return r.json();
});

// Generate
const result = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    goal: "Build a todo app",
    users: "Developers",
    constraints: "Mobile-first",
    template: "web",
  }),
}).then((r) => {
  if (!r.ok) return r.json().then((d) => Promise.reject(new Error(d.error || "Generation failed")));
  return r.json();
});
