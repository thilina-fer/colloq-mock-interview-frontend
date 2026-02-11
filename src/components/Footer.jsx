import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Enterprise"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Docs", "API", "Support", "Community"],
    Legal: ["Privacy", "Terms", "Cookies", "Contact"],
  };

  return (
    <footer className="bg-steel-surface border-t border-steel-border">
      {/* Main Footer */}
      <div className="section-container py-16">
        {/* Brand & Social */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12 pb-12 border-b border-steel-soft-2">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-steel-text-primary mb-2">
              ColloQ
            </h3>
            <p className="text-sm text-steel-text-muted leading-relaxed">
              Master your interviews with real-world practice and expert
              feedback.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="p-2 bg-steel-soft-1 rounded-lg text-steel-text-primary hover:bg-steel-soft-2 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-steel-soft-1 rounded-lg text-steel-text-primary hover:bg-steel-soft-2 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-steel-soft-1 rounded-lg text-steel-text-primary hover:bg-steel-soft-2 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-steel-text-primary mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-steel-text-muted hover:text-steel-text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-steel-text-muted">
            © {currentYear} ColloQ. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-sm text-steel-text-muted hover:text-steel-text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-steel-soft-3">•</span>
            <a
              href="#"
              className="text-sm text-steel-text-muted hover:text-steel-text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
