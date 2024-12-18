export default function Welcome() {
    return (
    <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-sans mb-4">Welcome to Fast Cat</h1>
        <p className="text-lg font-mono">
            This is a Among Us Mod Manager
        </p>
        <p className="text-lg font-mono">
            Use Tauri + React + Vite + Tailwind CSS + TypeScript.
        </p>
        <div className="icons flex">
            <a href="https://tauri.app" target="_blank" rel="noopener">
                <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
            </a>
            <a href="https://reactjs.org" target="_blank" rel="noopener">
                <img src="/react.svg" className="logo react" alt="React logo" />
            </a>
            <a href="https://vitejs.dev" target="_blank" rel="noopener">
                <img src="/vite.svg" className="logo vite" alt="Vite logo" />
            </a>
        </div>
        
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <button className="color-sky" type="submit">Next</button>
        </form>
    </div>
    )
}