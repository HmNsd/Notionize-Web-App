import ThemeToggle from "./ThemeToggler";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex justify-between items-center mb-6"><div className=" flex flex-col">
      <h1 className="text-4xl font-bold">Notionize</h1>
      <span>from BrewnCode 👋</span>
      </div>
      <div>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
}
