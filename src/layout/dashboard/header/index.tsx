import { MdMenu } from "react-icons/md"
import AccountInformation from "./AccountInformation"
import Drawer from "@/components/Drawer"
import { useEffect, useState } from "react"
import { BaseButton } from "@/components/Button"
import NavSection from "@/components/nav-section"
import navConfig from "../navbar/NavConfig"
import { useRouter } from "next/router"

const HeaderDashboard = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(false)
  }, [router])
    return (
      <div className="flex h-20 w-full flex-row items-center justify-between md:justify-end border-b border-gray-200 pl-5">
        <BaseButton className="md:hidden" onClick={() => setIsOpen(!isOpen)} variant="ghost">
          <MdMenu size={20} />
        </BaseButton>
        <AccountInformation />
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <h1 className="w-full text-center text-[30px] font-extrabold">
            LOGO
          </h1>
          <div className="w-full p-5">
            <NavSection navconfig={navConfig} />
          </div>
        </Drawer>
      </div>
    );
}

export default HeaderDashboard