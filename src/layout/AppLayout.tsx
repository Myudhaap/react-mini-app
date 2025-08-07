import { Outlet } from "react-router-dom";

export const AppLayout = () => {
    return (
        <div className="flex flex-col h-dvh">
            <header className="bg-blue-500 p-4 text-center">
                <h3 className="text-3xl font-bold text-white">Mini APP</h3>
            </header>
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    )
}