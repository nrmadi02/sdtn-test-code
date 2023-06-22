import { NavConfig } from "@/layout/dashboard/navbar/NavConfig";
import Link from "next/link";
import { useRouter } from "next/router";

const getActive = (path: string, pathname: string, asPath: string) => {
  return pathname.includes(path) || asPath.includes(path);
}

interface Props {
  navconfig: NavConfig[];
}

const NavSection = ({ navconfig }: Props) => {

  const {pathname, asPath} = useRouter()
   
  return (
    <div className="w-full flex flex-col gap-3">
      {navconfig.map((item, idx) => {
        return (
          <div key={idx} className="flex w-full flex-col gap-1">
            <h2 className=" font-semibold">{item.subheader}</h2>
            {item.items.map((itm, idxs) => {
              const active = getActive(itm.rootPath, pathname, asPath);
              return (
                <Link key={idxs} href={itm.path}>
                  <div
                    className={`flex flex-row items-center gap-2 rounded-lg px-3  py-2 transition-all 
                  ${
                    active
                      ? "bg-emerald-600  text-white"
                      : "hover:bg-emerald-600 hover:text-white hover:bg-opacity-50"
                  }
                  `}
                  >
                    {itm.icon}
                    <p className="text-[14px] font-semibold">{itm.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default NavSection;
