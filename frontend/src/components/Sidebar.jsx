import { useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  FileCheck2,
  Stamp,
  Activity,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Proofs",
      path: "/certificate",
      icon: FileCheck2,
    },
    {
      name: "Stamp Work",
      path: "/uploads",
      icon: Stamp,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: Activity,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-[280px] shrink-0 flex-col bg-[#123C34] text-white">

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="px-8 pb-10 pt-9">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-5 text-left"
        >

          {/* Logo Mark */}

          <div
            className="
              flex
              h-[60px]
              w-[50px]
              shrink-0
              items-center
              justify-center
              border
              border-[#C39A5B]
              [clip-path:polygon(50%_0%,92%_22%,92%_76%,50%_100%,8%_76%,8%_22%)]
            "
          >

            <span className="font-serif text-[30px] text-[#C39A5B]">
              A
            </span>

          </div>


          {/* Brand */}

          <div>

            <div className="text-[24px] font-medium tracking-[0.25em]">
              ASTITVA
            </div>

            <div className="mt-2 text-[8px] tracking-[0.32em] text-[#C39A5B]">
              PROOF OF CREATION
            </div>

          </div>

        </button>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 px-5">

        <div className="space-y-2.5">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-[6px]
                  px-5
                  py-4
                  text-left
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#C49A5B] text-[#17352F] shadow-sm"
                      : "text-[#C7D2CD] hover:bg-[#1B4A40] hover:text-white"
                  }
                `}
              >

                <Icon
                  size={20}
                  strokeWidth={1.6}
                  className={
                    isActive
                      ? "text-[#17352F]"
                      : "text-[#B8C6C0] group-hover:text-white"
                  }
                />


                <span className="text-[14px] font-medium">
                  {item.name}
                </span>

              </button>
            );

          })}

        </div>

      </nav>


      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div className="px-6 pb-8">

        {/* Divider */}

        <div className="mb-6 h-px bg-white/10" />


        {/* Protection Status */}

        <div className="mb-7 flex items-center gap-3 px-2">

          <ShieldCheck
            size={20}
            strokeWidth={1.5}
            className="shrink-0 text-[#C39A5B]"
          />


          <div>

            <p className="text-[10px] font-medium tracking-[0.08em] text-[#91A59D]">
              PROTECTION ACTIVE
            </p>


            <p className="mt-1 text-[10px] text-[#D0D9D4]">
              Your proofs are secured
            </p>

          </div>

        </div>


        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-[6px]
            px-4
            py-3.5
            text-[#C7D2CD]
            transition-all
            duration-200
            hover:bg-[#1B4A40]
            hover:text-white
          "
        >

          <LogOut
            size={20}
            strokeWidth={1.6}
          />


          <span className="text-[14px] font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;