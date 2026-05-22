export interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "stable";
}

export interface Node {
  id: string;
  name: string;
  type: "user" | "balancer" | "node" | "database" | "cache" | "queue" | "gateway";
  status: "active" | "warning" | "idle";
}

export interface Edge {
  from: string;
  to: string;
  latencyMs: number;
}

export interface ArchitectureDiagram {
  nodes: Node[];
  edges: Edge[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  metrics: Metric[];
  architecture: ArchitectureDiagram;
  systemLogs: string[];
  benchmarkScore: number;
  longDescription: string;
}

export interface TechStackItem {
  name: string;
  category: "languages" | "frameworks" | "infrastructure" | "databases";
  proficiency: number; // 0 to 100
  metric: string;
}

export interface NetworkHost {
  id: string;
  name: string;
  region: string;
  ip: string;
  status: "online" | "degraded" | "offline";
  pingTime: number;
  cpuLoad: number;
  memoryLoad: number;
}
