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
    <footer className="bg-slate-950 border-t border-slate-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand & Social */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12 pb-12 border-b border-slate-900">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">
              Collo<span className="text-amber-500">Q</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Master your interviews with real-world practice and expert
              feedback.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
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
          <p className="text-sm text-slate-500">
            © {currentYear} ColloQ. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-800">•</span>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
