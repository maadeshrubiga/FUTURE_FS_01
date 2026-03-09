import { motion } from "framer-motion";
import { Code2, Shield, BarChart3, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Full-Stack Dev", color: "text-primary", desc: "React, Node.js, TypeScript" },
  { icon: Shield, label: "Cybersecurity", color: "text-secondary", desc: "Network Security, Ethical Hacking" },
  { icon: BarChart3, label: "Data Science", color: "text-accent", desc: "Python, ML, Analytics" },
  { icon: Zap, label: "Problem Solver", color: "text-gold", desc: "Creative & Analytical" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Passionate <span className="text-gradient-primary">Developer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            I'm a versatile developer with a deep curiosity for cybersecurity and data science.
            I love building products that are not just functional, but secure and data-driven.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold font-display mb-1">{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
