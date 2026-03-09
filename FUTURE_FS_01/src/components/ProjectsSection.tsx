import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

type Category = "all" | "frontend" | "cybersecurity" | "datascience";

const filters: { label: string; value: Category }[] = [
  { label: "All Projects", value: "all" },
  { label: "Frontend & Full-Stack", value: "frontend" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Data Science", value: "datascience" },
];

const projects = [
  {
    title: "E-Commerce Dashboard",
    desc: "Full-stack dashboard with real-time analytics, user management, and payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    category: "frontend" as Category,
    color: "primary",
  },
  {
    title: "Portfolio Website",
    desc: "Interactive portfolio with chatbot, animated sections, and responsive design.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    category: "frontend" as Category,
    color: "primary",
  },
  {
    title: "Network Vulnerability Scanner",
    desc: "Automated tool for scanning network vulnerabilities and generating detailed reports.",
    tags: ["Python", "Nmap", "Linux"],
    category: "cybersecurity" as Category,
    color: "secondary",
  },
  {
    title: "Phishing Detection System",
    desc: "ML-powered system to detect and classify phishing emails and URLs.",
    tags: ["Python", "scikit-learn", "NLP"],
    category: "cybersecurity" as Category,
    color: "secondary",
  },
  {
    title: "Sales Forecasting Model",
    desc: "Predictive analytics model for retail sales forecasting using time-series data.",
    tags: ["Python", "Pandas", "TensorFlow"],
    category: "datascience" as Category,
    color: "accent",
  },
  {
    title: "Sentiment Analysis Tool",
    desc: "Real-time social media sentiment analysis with visualization dashboard.",
    tags: ["Python", "NLTK", "Plotly", "Flask"],
    category: "datascience" as Category,
    color: "accent",
  },
];

const colorMap: Record<string, { border: string; tag: string }> = {
  primary: { border: "hover:border-primary/40", tag: "bg-primary/15 text-primary" },
  secondary: { border: "hover:border-secondary/40", tag: "bg-secondary/15 text-secondary" },
  accent: { border: "hover:border-accent/40", tag: "bg-accent/15 text-accent" },
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [overlayOpen, setOverlayOpen] = useState(false);

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Projects</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Featured <span className="text-gradient-primary">Work</span>
            </h2>
            <button
              onClick={() => setOverlayOpen(true)}
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              View All Projects →
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-card border border-border ${colorMap[project.color].border} transition-all group cursor-pointer`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Github size={16} className="text-muted-foreground" />
                  <ExternalLink size={16} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-mono ${colorMap[project.color].tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full projects overlay */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold font-display">All Projects</h2>
                <button
                  onClick={() => setOverlayOpen(false)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === f.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-6 rounded-2xl bg-card border border-border ${colorMap[project.color].border} transition-all`}
                    >
                      <h3 className="text-xl font-bold font-display mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-mono ${colorMap[project.color].tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
