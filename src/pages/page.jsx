import Sidebar from "@/components/Sidebar"

const Teste = () => {
    return (
        <div className="flex bg-zinc-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-zinc-800">Página Inicial</h1>
                <p className="text-zinc-500 mt-2">Bem-vindo ao sistema BM Metais.</p>
            </main>
        </div>
    )
}

export default Teste