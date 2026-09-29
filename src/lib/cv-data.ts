/**
 * CV DATA — Source of truth.
 * Extracted from Ahmed Farouk's CV. Do NOT invent info beyond this file.
 */

export const cv = {
  name: "Ahmed Farouk",
  role: "DevOps Engineer",
  location: "Egypt · Mansoura, Dakahlia",
  phone: "+20 114 707 9817",
  email: "a.faroukcx@gmail.com",
  github: "github.com/drift3",
  githubUrl: "https://github.com/drift3",
  linkedin: "linkedin.com/in/ahmed-faroukcx90",
  linkedinUrl: "https://linkedin.com/in/ahmed-faroukcx90",

  summary:
    "Information Systems graduate developing practical Cloud, DevOps, and DevSecOps skills through the NTI Cloud DevOps Accelerator, hands-on labs, and project work. Foundation in web applications and networking, now applied toward cloud infrastructure, container platforms, and automation.",

  positioning: [
    "Building cloud infrastructure.",
    "Automating delivery pipelines.",
    "Operating container platforms.",
  ],

  status: "TRAINING · BUILDING · DEPLOYING",

  education: [
    {
      institution: "Delta Higher Institute for Computer Science",
      place: "Mansoura, Egypt",
      period: "Sep 2019 — Jul 2023",
      degree: "BSc in Information Systems",
    },
  ],

  training: [
    {
      role: "Cloud DevOps Trainee",
      org: "NTI Cloud DevOps Accelerator",
      place: "National Telecommunication Institute (NTI) · The New Capital, Egypt",
      period: "Jul 2026 — Nov 2026",
      points: [
        "Hands-on labs and projects in Linux/RHEL, AWS, Docker, Kubernetes, OpenShift, and Ansible using VMs, simulation tools, and remote cloud labs.",
        "Practical exposure to CI/CD, cloud infrastructure, automation, and DevOps practices through guided labs and portfolio projects.",
      ],
    },
  ],

  /** Skills tree — used by the Infrastructure Map section. */
  skills: [
    {
      group: "CLOUD",
      root: "AWS",
      items: ["EC2", "S3", "IAM", "Lambda", "API Gateway", "SQS", "CloudWatch", "RDS", "VPC"],
    },
    {
      group: "OPERATING SYSTEMS",
      root: "LINUX",
      items: ["Linux", "RHEL", "Windows Server"],
    },
    {
      group: "CONTAINERS",
      root: "ORCHESTRATION",
      items: ["Docker", "Docker Compose", "Kubernetes", "OpenShift"],
    },
    {
      group: "AUTOMATION & IaC",
      root: "IaC",
      items: ["Bash", "Python", "Ansible", "Terraform", "systemd"],
    },
    {
      group: "CI/CD",
      root: "PIPELINES",
      items: ["GitHub Actions", "Tekton", "GitLab CI/CD"],
    },
    {
      group: "VERSION CONTROL",
      root: "GIT",
      items: ["Git", "GitHub"],
    },
    {
      group: "SECURITY",
      root: "DEVSECOPS",
      items: ["DevSecOps", "RBAC", "IAM", "NetworkPolicy", "Trivy", "container security"],
    },
    {
      group: "OBSERVABILITY",
      root: "MONITORING",
      items: ["CloudWatch", "Prometheus", "Grafana"],
    },
    {
      group: "NETWORKING",
      root: "NET",
      items: ["TCP/IP", "DNS", "SSH", "DHCP", "routing", "switching"],
    },
    {
      group: "WEB FOUNDATION",
      root: "APP",
      items: ["React", "Node.js", "Express", "MongoDB"],
    },
  ] as const,

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
  ],

  /** Pipeline stages — used by the DevOps Pipeline section. */
  pipeline: [
    { stage: "CODE", tools: ["Git", "GitHub"], note: "Source control & branching" },
    { stage: "BUILD", tools: ["Bash", "Python", "Docker"], note: "Container image build" },
    { stage: "TEST", tools: ["Trivy", "Unit tests"], note: "Security & functional checks" },
    { stage: "CONTAINER", tools: ["Docker", "Buildah"], note: "Image build & digest pinning" },
    { stage: "CI/CD", tools: ["GitHub Actions", "Tekton", "GitLab CI/CD"], note: "Pipeline orchestration" },
    { stage: "DEPLOY", tools: ["Kustomize", "Ansible"], note: "Manifest & config apply" },
    { stage: "ORCHESTRATE", tools: ["Kubernetes", "OpenShift"], note: "Cluster scheduling & rollout" },
    { stage: "OBSERVE", tools: ["Prometheus", "Grafana", "CloudWatch"], note: "Metrics, logs, traces" },
  ] as const,

  /** AWS architecture flow — used by the AWS Cloud section. */
  awsFlow: [
    { layer: "EDGE", service: "Route 53 / DNS", note: "Name resolution, hosted zones" },
    { layer: "EDGE", service: "CloudFront (concept)", note: "Content distribution boundary" },
    { layer: "NETWORK", service: "VPC", note: "Isolated network, subnets, route tables" },
    { layer: "NETWORK", service: "ALB / ELB", note: "Traffic distribution & TLS termination" },
    { layer: "SECURITY", service: "IAM", note: "Identities, roles, least-privilege" },
    { layer: "COMPUTE", service: "EC2 / Lambda", note: "Serverful & serverless compute" },
    { layer: "EVENTS", service: "API Gateway / SQS", note: "API front-door & async queueing" },
    { layer: "DATA", service: "RDS", note: "Managed relational database" },
    { layer: "STORAGE", service: "S3", note: "Object storage, event source" },
    { layer: "OBSERVE", service: "CloudWatch", note: "Metrics, logs, alarms" },
  ] as const,

  /** Kubernetes cluster — used by the Cluster Visualization section. */
  cluster: {
    name: "kind · OpenShift",
    nodes: [
      {
        name: "control-plane",
        role: "master",
        pods: ["api-server", "etcd", "scheduler", "controller-manager"],
      },
      {
        name: "worker-01",
        role: "worker",
        pods: ["frontend", "api-svc", "postgres-0", "prometheus"],
      },
      {
        name: "worker-02",
        role: "worker",
        pods: ["frontend-replica", "api-svc-replica", "grafana", "node-exporter"],
      },
    ],
    services: ["Ingress", "ClusterIP", "Headless", "HPA"],
  },

  projects: [
    {
      id: "p01",
      name: "Linux Services and Automation: systemd Units, Timers, and Bash",
      short: "Hardened systemd service running a Python health-check app with automated backup workflows.",
      role: "Author · Linux/RHEL engineer",
      challenge:
        "Run a Python health-check app as a hardened, recoverable system service with automated backups and zero manual intervention.",
      solution:
        "Hardened systemd unit (dedicated service user, NoNewPrivileges, ProtectSystem, PrivateTmp), restart policies, failure handling, journald logging, and systemd timer + rsync backup workflow in Bash.",
      stack: ["Linux", "RHEL", "systemd", "Bash", "Python", "rsync", "journald"],
      keywords: ["hardening", "timers", "recovery", "automation"],
    },
    {
      id: "p02",
      name: "AWS Serverless: Lambda, API Gateway, and Event-Driven Design",
      short: "Serverless status service with API-driven Lambda, S3 event processing, and SQS async workloads.",
      role: "Author · Cloud engineer",
      challenge:
        "Build an event-driven serverless platform that decouples API execution from asynchronous processing with strict least-privilege IAM.",
      solution:
        "API Gateway → Lambda for synchronous status queries, S3 event notifications triggering async processing, SQS for buffering workloads, CloudWatch observability, and IAM scoped to per-function permissions.",
      stack: ["AWS Lambda", "API Gateway", "S3", "SQS", "IAM", "CloudWatch", "Python", "AWS CLI"],
      keywords: ["event-driven", "serverless", "iam", "observability"],
    },
    {
      id: "p03",
      name: "OpenShift Development: Pipelines, Webhooks, and Developer Workflows",
      short: "OpenShift developer workflow with Tekton CI/CD, Buildah builds, webhook-triggered runs, and digest promotion.",
      role: "Author · Platform developer",
      challenge:
        "Automate image build and promotion on OpenShift with webhook-triggered pipelines and verifiable, immutable image digests.",
      solution:
        "Tekton EventListener + PipelineRun wired to GitHub webhooks, Buildah container image builds, digest-based image promotion, and RBAC scoped to the developer namespace.",
      stack: ["Red Hat OpenShift", "Kubernetes", "Tekton", "Buildah", "GitHub Webhooks", "RBAC", "Argo CD"],
      keywords: ["gitops", "webhooks", "immutable images", "rbac"],
    },
    {
      id: "p04",
      name: "One Product, Two Platforms: Kubernetes and OpenShift Capstone",
      short: "Same multi-service app deployed on Kubernetes (kind) and OpenShift via reusable Kustomize with platform comparison.",
      role: "Author · Platform engineer",
      challenge:
        "Ship identical multi-service application behavior across two Kubernetes-derivative platforms without forking manifests.",
      solution:
        "Reusable Kustomize overlays per platform, GitHub Actions CI/CD, Trivy scanning, NetworkPolicy, RBAC, digest pinning, and a side-by-side platform comparison.",
      stack: ["Kubernetes (kind)", "OpenShift", "Kustomize", "GitHub Actions", "Trivy", "NetworkPolicy", "RBAC"],
      keywords: ["kustomize", "platform-comparison", "security", "ci/cd"],
    },
    {
      id: "p05",
      name: "Production-Oriented Microservices Platform on Kubernetes",
      short: "kind-based microservices platform with health probes, StatefulSet Postgres, Ingress, HPA, and failure recovery.",
      role: "Author · Platform engineer",
      challenge:
        "Build a production-shaped microservices platform on a local cluster that survives node/pod failure and scales under load.",
      solution:
        "Health probes (liveness/readiness), ConfigMap and Secret management, Ingress networking, PostgreSQL on StatefulSets with persistent storage, HPA autoscaling with metrics-server, and chaos-style failure-recovery testing.",
      stack: ["Kubernetes (kind)", "Kustomize", "GitHub Actions", "metrics-server", "Prometheus", "Grafana", "NetworkPolicy", "Pod Security"],
      keywords: ["statefulsets", "hpa", "ingress", "resilience"],
    },
    {
      id: "p06",
      name: "OpenShift Administration: Operators, Authentication, and Platform Configuration",
      short: "OpenShift admin project: Operator lifecycle, OAuth/htpasswd identity, RBAC, quotas, and platform troubleshooting.",
      role: "Author · Platform administrator",
      challenge:
        "Operate an OpenShift cluster end-to-end: install Operators, configure authentication, enforce governance, and resolve administrative faults.",
      solution:
        "OperatorHub lifecycle management, OAuth with htpasswd identity provider, RBAC and project governance, ResourceQuota and LimitRange enforcement, Ingress/StorageClass configuration, and administrative troubleshooting playbooks.",
      stack: ["Red Hat OpenShift", "OAuth", "RBAC", "ResourceQuota", "LimitRange", "Ingress", "StorageClass"],
      keywords: ["operators", "authentication", "governance", "troubleshooting"],
    },
  ],

  /** Timeline / deployment history */
  timeline: [
    {
      version: "v1.0",
      label: "FOUNDATION",
      title: "BSc Information Systems",
      org: "Delta Higher Institute for Computer Science",
      period: "Sep 2019 — Jul 2023",
      detail:
        "Foundational education in information systems, web applications, and networking — establishing the engineering mindset that later moved toward infrastructure.",
      tags: ["education", "web", "networking"],
    },
    {
      version: "v2.0",
      label: "TRANSITION",
      title: "Cloud · DevOps · DevSecOps",
      org: "Self-study · Hands-on labs",
      period: "2024 — 2026",
      detail:
        "Direction shift toward cloud infrastructure, Linux/RHEL, containers, and automation. DevSecOps learning and hands-on labs through TryHackMe.",
      tags: ["linux", "aws", "devsecops", "self-study"],
    },
    {
      version: "v3.0",
      label: "SPECIALIZATION",
      title: "NTI Cloud DevOps Accelerator — Trainee",
      org: "National Telecommunication Institute · The New Capital, Egypt",
      period: "Jul 2026 — Nov 2026",
      detail:
        "Hands-on training and lab projects across Linux/RHEL, AWS, Docker, Kubernetes, OpenShift, and Ansible using VMs, simulation tools, and remote cloud labs.",
      tags: ["training", "kubernetes", "openshift", "iac"],
    },
  ],

  certifications: [
    {
      name: "DevSecOps",
      issuer: "TryHackMe",
      type: "Hands-on labs & learning path",
      domain: "Security · DevSecOps",
      status: "Verified",
      detail:
        "Practical DevSecOps learning through hands-on labs — applying security practices into the development and operations lifecycle.",
    },
  ],

  nav: [
    { id: "system", label: "SYSTEM" },
    { id: "about", label: "ABOUT" },
    { id: "stack", label: "STACK" },
    { id: "pipeline", label: "PIPELINE" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ],
} as const;
