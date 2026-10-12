import {
  Bell,
  ChevronDown,
  Code2,
  LogOut,
} from "lucide-react";
import authService from "../../Services/AuthService";


export default function Navbar() {
  async function logout(){
    await authService.logout();
    localStorage.clear();
    window.location.href= "/login"
  }

  return (
    <nav className="sticky top-0 z-50 h-[72px] border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
            <Code2
              size={21}
              strokeWidth={2.2}
              className="text-white"
            />
          </div>

          <div className="hidden sm:block">
            <div className="text-[17px] font-bold tracking-tight text-black">
              CodeLens
            </div>

            <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
              Code Intelligence
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-1 rounded-xl bg-neutral-100 p-1">
          <NavItem label="Projects" active />
          <NavItem label="Reviews" />
          <NavItem label="Team" />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Repository */}
        

          {/* Notifications */}
          <button
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl text-neutral-500
              transition hover:bg-neutral-100
              hover:text-black
            "
          >
            <Bell size={19} />

            <span
              className="
                absolute right-2 top-2
                h-1.5 w-1.5
                rounded-full bg-black
                ring-2 ring-white
              "
            />
          </button>

          {/* Profile */}
          <div className="relative group">

            <button
              className="
                flex items-center gap-2
                rounded-xl p-1.5 pr-2
                transition hover:bg-neutral-100
              "
            >
              <img
                src="https://i.pravatar.cc/80"
                alt="Profile"
                className="
                  h-9 w-9 rounded-lg
                  object-cover grayscale
                "
              />

              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-black">
                  Ahmed
                </div>

            
              </div>

              <ChevronDown
                size={14}
                className="hidden xl:block text-neutral-400"
              />
            </button>

            {/* Dropdown */}
            <div
              className="
                invisible absolute right-0 top-full mt-2
                w-48 rounded-xl border border-neutral-200
                bg-white p-1.5 shadow-lg
                opacity-0 transition-all duration-150
                group-hover:visible group-hover:opacity-100
              "
            >
              <button
                onClick={async() => await logout()}
                className="
                  flex w-full items-center gap-3
                  rounded-lg px-3 py-2.5
                  text-sm font-medium text-neutral-700
                  transition
                  hover:bg-neutral-100
                  hover:text-black
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

/* Navigation Item */

function NavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`
        relative rounded-lg px-5 py-2
        text-sm font-medium transition

        ${
          active
            ? "bg-white text-black shadow-sm"
            : "text-neutral-500 hover:bg-white/70 hover:text-black"
        }
      `}
    >
      {label}

      {active && (
        <span
          className="
            absolute bottom-0 left-1/2
            h-[2px] w-5
            -translate-x-1/2
            rounded-full bg-black
          "
        />
      )}
    </button>
  );
}
