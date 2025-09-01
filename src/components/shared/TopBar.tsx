import { legalLinks } from "@/constants/importantLinks";
import Link from "next/link";
import { FaFacebookF, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

export const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "facebook" },
  {
    icon: FaInstagramSquare,
    href: "https://instagram.com",
    label: "instagram",
  },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "linkedin" },
];

const TopBar = () => {
  return (
    <div className="bg-primary">
      <div className="h-[42px] section-gap text-white flex items-center justify-between text-sm uppercase">
        {/* Internal Page Links */}
        <div className="flex items-center h-full border border-slate-500 border-t-0 border-b-0 px-4 w-fit space-x-4 text-xs">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-slate-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center h-full border border-slate-500 border-t-0 border-b-0 px-4 w-fit space-x-4">
          {socials.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
