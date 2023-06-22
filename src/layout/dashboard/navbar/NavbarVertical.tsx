import NavSection from "@/components/nav-section";
import navConfig from "./NavConfig";

const NavbarVertival = () => {
    return (
      <div className="float-left hidden h-full  min-h-max w-[250px] flex-col overflow-y-auto border-r-[1px] border-gray-200 pt-[20px] md:flex">
        <h1 className="w-full text-center text-[30px] font-extrabold">LOGO</h1>
        <div className="w-full p-5">
          <NavSection navconfig={navConfig} />
        </div>
      </div>
    );
}

export default NavbarVertival