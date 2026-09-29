# Ahmed Farouk — DevOps Engineer // Command Center

A futuristic, infrastructure-themed DevOps engineer portfolio built from my CV.

**Live:** https://drift3.github.io/ahmed-devops/

## Tech Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4 + shadcn/ui
- Framer Motion + GSAP + Lenis smooth scroll
- Three.js / React Three Fiber (custom 3D hero scene)
- Custom cursor, magnetic buttons, scramble-text reveals
- Statically exported for GitHub Pages

## Sections
1. Hero — 3D infrastructure scene with cluster core, orbiting nodes, particle field
2. Identity Module — duotone portrait + ID-card overlay + professional narrative
3. Infrastructure Map — interactive skills tree (AWS, Linux, Containers, IaC, CI/CD, Security, Observability, Networking)
4. Delivery Pipeline — 8-stage CI/CD workflow
5. Operations Terminal — fully interactive Linux shell (`help`, `kubectl`, `systemctl`, `aws`, etc.)
6. Cluster Topology — Kubernetes/OpenShift visualization
7. Cloud Architecture — AWS reference diagram
8. Deployment History — career timeline (v1.0 → v3.0)
9. Case Files — 6 cinematic project case studies
10. Credentials Vault — verified certifications
11. Establish Connection — contact section with animated network diagram

## Development
```bash
bun install
bun run dev          # http://localhost:3000
bun run lint
bun run build:pages  # static export → ./out/
```

## Deploy
The site auto-deploys to GitHub Pages via the workflow at `.github/workflows/deploy.yml` on every push to `main`.

---

Built from CV source-of-truth — no invented jobs, certifications, or achievements.
