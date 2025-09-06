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
import { categories, navLinks } from "@/constants/importantLinks";
import Cart from "./Cart";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav>
      <TopBar />
      <div className="flex items-center justify-between section-gap gap-x-5 py-6">
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
        <SearchBar />

        {/* Auth + Cart */}
        <div className="justify-end flex items-center gap-4">
          <Link href="/sign-in" className="uppercase">
            Login
          </Link>
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
