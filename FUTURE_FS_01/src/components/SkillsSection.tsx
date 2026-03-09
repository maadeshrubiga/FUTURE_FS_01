import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend & Full-Stack",
    color: "primary",
    skills: [
      { name: "React.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Node.js", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Cybersecurity",
    color: "secondary",
    skills: [
      { name: "Network Security", level: 70 },
      { name: "Ethical Hacking", level: 65 },
      { name: "Linux Administration", level: 75 },
      { name: "Wireshark", level: 70 },
      { name: "OWASP", level: 60 },
    ],
  },
  {
    title: "Data Science",
    color: "accent",
    skills: [
      { name: "Python", level: 80 },
      { name: "Pandas / NumPy", level: 75 },
      { name: "Machine Learning", level: 65 },
      { name: "Data Visualization", level: 70 },
      { name: "SQL", level: 75 },
    ],
  },
];

const barColorMap: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

const tagColorMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            My <span className="text-gradient-primary">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15 }}
              className="p-6 rounded-2xl bg-background border border-border"
            >
              <h3 className={`text-xl font-bold font-display mb-6 ${tagColorMap[cat.color]}`}>
                {cat.title}
              </h3>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: ci * 0.15 + si * 0.08 }}
                        className={`h-full rounded-full ${barColorMap[cat.color]}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
