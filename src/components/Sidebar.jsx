import { useState } from "react";
import { Home, Users, Settings, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { name: "home", label: "Home", icon: <Home size={20} /> },
        { name: "categoria-produto", label: "Categorias", icon: <Settings size={20} /> },
        { name: "users", label: "Users", icon: <Users size={20} /> },
        { name: "settings", label: "Settings", icon: <Settings size={20} /> },
    ];

    return (
        <aside
            className={`bg-zinc-900 text-white transition-all duration-300 h-screen ${open ? "w-64" : "w-20"
                } p-4`}
        >
            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="mb-6 flex items-center justify-center w-full"
            >
                {open ? <X /> : <Menu />}
            </button>

            {/* Menu */}
            <ul className="space-y-4">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === `/${item.name}`;

                    return (
                        <li key={index}>
                            <Link
                                to={`/${item.name}`}
                                className={`flex items-center gap-4 p-2 rounded-xl cursor-pointer transition ${isActive ? "bg-zinc-800" : "hover:bg-zinc-800"
                                    }`}
                            >
                                {item.icon}
                                {open && <span className="text-sm">{item.label}</span>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
