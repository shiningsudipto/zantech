import { MapPin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { socials } from "./TopBar";
import { legalLinks, navLinks } from "@/constants/importantLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200 text-primary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="uppercase">
              <Image
                src="/zantech-logo.png"
                alt="zantech-logo"
                width={200}
                height={100}
                priority
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Your partner in DIY robotics and high-quality electronic
              components. Built for makers, by makers.
            </p>
            <div className="mt-6 flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Important Links
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-base transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>
                  Barishal, Barisal Division
                  <br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <a
                  href="mailto:shiningsudipto@gmail.com"
                  className="transition-colors duration-300"
                >
                  shiningsudipto@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {currentYear} Zantech. All Rights Reserved.
          </p>
          <p className="text-sm mt-4 sm:mt-0">Made with ❤️ by Sudipta Das</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
