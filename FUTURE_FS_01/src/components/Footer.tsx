import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-8 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-muted-foreground text-sm">
        © 2026 <span className="text-primary font-semibold">Maadesh Rubiga</span>. All rights reserved.
      </p>
      <div className="flex gap-4">
        {[
          { icon: Github, href: "https://github.com/maadesh-rubiga" },
          { icon: Linkedin, href: "https://linkedin.com/in/maadesh-rubiga" },
          { icon: Mail, href: "mailto:maadesh@gmail.com" },
        ].map(({ icon: Icon, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
