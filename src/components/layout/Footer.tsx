import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Users } from "lucide-react";
import logo from "@/assets/diagnostics-hub-logo.png";

const WHATSAPP_NUMBER = "917649885936";
const WHATSAPP_GROUP = "https://wa.me/917649885936";
const INSTAGRAM_URL = "https://www.instagram.com/diagnostics_hub?igsh=MzNzanJpN2tlODhs";
const TELEGRAM_BOT = "https://t.me/HubPathologyLab_bot";
const EMAIL = "pathologyhubdiagnostics@gmail.com";
const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Diagnostics Hub Logo"
                className="h-12 w-12 rounded-lg object-cover shadow-sm"
                loading="lazy"
                decoding="async"
                width={48}
                height={48}
              />
              <div>
                <h3 className="text-xl font-bold text-foreground">Diagnostics Hub</h3>
                <p className="text-xs text-muted-foreground">Diagnostics Company</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Your trusted partner in diagnostic healthcare. NABL accredited laboratory providing accurate and timely test results.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-success hover:bg-success/90 flex items-center justify-center text-success-foreground transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-success/80 hover:bg-success/70 flex items-center justify-center text-success-foreground transition-colors"
                title="Join WhatsApp Group"
              >
                <Users className="h-5 w-5" />
              </a>
              <a
                href={TELEGRAM_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
                title="Telegram Bot"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-secondary hover:bg-secondary/90 flex items-center justify-center text-secondary-foreground transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Services</Link></li>
              <li><Link to="/tests" className="text-muted-foreground hover:text-primary transition-colors text-sm">Tests & Packages</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>In front of New Krishi Upaj Mandi, Beside Kotak Mahindra Bank, Karahiya No.1, Rewa (Madhya Pradesh) 486001</span>
              </li>
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+91 7649885936</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-success hover:text-success/80 text-sm font-medium">
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-success hover:text-success/80 text-sm">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>Join WhatsApp Group</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Mon-Sat: 7:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Diagnostics Hub. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/help" className="hover:text-primary transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
