import { useState } from "react";
import { Home, Users, Menu, X, PlusIcon, Package, Truck, ShoppingCart, Package2Icon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside
            className={`bg-zinc-900 text-white transition-all duration-300 h-screen flex flex-col ${open ? "w-64" : "w-20"
                } p-4`}
        >
            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="mb-6 flex items-center justify-center w-full"
            >
                {open ? <X /> : <Menu />}
            </button>
            <nav className="flex flex-col gap-2 h-full">
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
                    <Link to="/produtos" className="flex items-center">
                        <Package size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Produtos</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/fornecedores" className="flex items-center">
                        <Truck size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Fornecedores</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/compras" className="flex items-center">
                        <ShoppingCart size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Compras</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/pedidos" className="flex items-center">
                        <Package2Icon size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Pedidos</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/funcionarios" className="flex items-center">
                        <Users size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Funcionários</span>}
                    </Link>
                </Button>

                <Button asChild variant="link" className={`text-zinc-400 hover:text-white justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <Link to="/clientes" className="flex items-center">
                        <Users size={20} className="shrink-0" />
                        {open && <span className="text-sm font-medium">Clientes</span>}
                    </Link>
                </Button>

                <Button variant="link" onClick={handleLogout} className={`mt-auto text-red-400 hover:text-red-300 justify-start w-full gap-3 ${!open ? "px-2 justify-center" : ""}`}>
                    <LogOutIcon size={20} className="shrink-0" />
                    {open && <span className="text-sm font-medium">Sair</span>}
                </Button>

            </nav>
        </aside>
    );
}
