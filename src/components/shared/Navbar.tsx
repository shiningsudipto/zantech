import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "./TopBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { label: "Shop", path: "/shop" },
  { label: "Project", path: "/project" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const categories = [
  {
    label: "3D Solution",
    path: "/categories/3d-solution",
    desc: "Tools, printers, and materials for 3D prototyping.",
  },
  {
    label: "Accessories",
    path: "/categories/accessories",
    desc: "Cables, adapters, and essential add-ons.",
  },
  {
    label: "Battery",
    path: "/categories/battery",
    desc: "Rechargeable and non-rechargeable power sources.",
  },
  {
    label: "Basic Components",
    path: "/categories/basic-components",
    desc: "Resistors, capacitors, transistors, and more.",
  },
  {
    label: "Display",
    path: "/categories/display",
    desc: "LCD, LED, OLED, and touch screen modules.",
  },
  {
    label: "Microcontroller",
    path: "/categories/microcontroller",
    desc: "Arduino, Raspberry Pi, ESP32, and other boards.",
  },
  {
    label: "Project Kits",
    path: "/categories/project-kits",
    desc: "Ready-to-use electronics and robotics kits.",
  },
  {
    label: "Robotics",
    path: "/categories/robotics",
    desc: "Motors, chassis, and robotics development kits.",
  },
  {
    label: "Sensor",
    path: "/categories/sensor",
    desc: "Temperature, motion, distance, and other sensors.",
  },
  {
    label: "Starter Kits",
    path: "/categories/starter-kits",
    desc: "Beginner-friendly electronics and learning kits.",
  },
  {
    label: "Wireless",
    path: "/categories/wireless",
    desc: "Wi-Fi, Bluetooth, and RF communication modules.",
  },
];

const Navbar = () => {
  return (
    <nav>
      <TopBar />
      <div className="flex items-center justify-between section-gap gap-x-5 py-4">
        {/* Logo */}
        <Link href="/" className="uppercase">
          <Image
            src="/zantech-logo.png"
            alt="zantech-logo"
            width={200}
            height={100}
            priority
          />
        </Link>

        {/* Nav Links */}
        <div className="flex items-center">
          {/* Categories Dropdown */}
          <NavigationMenu className="p-0">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="uppercase text-base border-b-2 border-secondary rounded-b-none cursor-pointer">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <ul className="grid gap-4 p-2 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                    {categories.map((item, idx) => (
                      <li
                        key={idx}
                        className="hover:bg-slate-50 rounded-md group"
                      >
                        <Link
                          href={item.path}
                          className="flex flex-col rounded-md p-2"
                        >
                          <span className="uppercase text-primary group-hover:text-secondary font-medium">
                            {item.label}
                          </span>
                          <span className="text-xs">{item.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {navLinks.map((item, idx) => (
            <Link
              href={item.path}
              key={idx}
              className="uppercase p-2.5 hover:bg-neutral-100 rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            className="rounded-full h-11 border ps-4 pe-10 min-w-[350px]"
            placeholder="Query here..."
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Auth + Cart */}
        <div className="justify-end flex items-center gap-4">
          <Link href="/login" className="uppercase">
            Login
          </Link>
          <ShoppingCart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
