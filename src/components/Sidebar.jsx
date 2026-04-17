import { useState } from "react";
import { Home, Users, Settings, Menu, X, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Sidebar() {
    const [open, setOpen] = useState(true);

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
            <nav className="flex flex-col gap-2">
                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/" className="flex items-center">
                        <Home size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Home</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/categoria-produto" className="flex items-center">
                        <PlusIcon size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Categorias</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/users" className="flex items-center">
                        <Users size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Usuários</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/settings" className="flex items-center">
                        <Settings size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Configurações</span>}
                    </Link>
                </Button>
            </nav>
        </aside>
    );
}
