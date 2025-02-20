import ThemeToggle from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="bg-blue-500 dark:bg-gray-800 w-full py-4 px-5 text-white text-center flex flex-row justify-between">
      <h1 className="text-left md:text-3xl font-bold">News Listings</h1>
      <ThemeToggle />
    </header>
  );
};
