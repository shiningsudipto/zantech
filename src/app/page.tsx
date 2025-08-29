import { categories } from "@/constants/importantLinks";
import Navbar from "../components/shared/Navbar";
import HeroSlider from "./_components/HeroSlider";
import Link from "next/link";
import { Menu } from "lucide-react";
import SectionTitle from "@/components/helper/SectionTitle";
const page = () => {
  return (
    <div>
      <Navbar />
      {/* hero section */}
      <div className="section-gap grid grid-cols-12 gap-16">
        <div className="col-span-3 flex flex-col">
          <p className="bg-primary text-white p-4 rounded-t-lg flex items-center gap-4 uppercase">
            <Menu /> Browse Categories
          </p>
          {categories.map((item, index) => {
            const isLast = index === categories.length - 1;
            return (
              <Link
                key={index}
                href={item.path}
                className={`py-2.5 px-4 border border-t-0 hover:bg-slate-100 ${
                  isLast ? "rounded-b-lg" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="col-span-9">
          <HeroSlider />
        </div>
      </div>
      <div className="text-center py-5 mt-10">
        <h2 className="text-5xl font-bold ">
          Awaken your hidden <span className="text-slate-500">Talent</span>
        </h2>
      </div>
      <div className="section-gap">
        <SectionTitle title="complete package" />
      </div>
    </div>
  );
};

export default page;
