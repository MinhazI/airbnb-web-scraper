"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="py-2">
        <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-5 h-5 animate-pulse"></div>
      </div>
    );
  if (theme === "dark") {
    return (
      <div className="py-2">
        <FiSun size={25} onClick={() => setTheme("light")} />
      </div>
    );
  }

  if (theme === "light") {
    return (
      <div className="py-2">
        <FiMoon size={25} onClick={() => setTheme("dark")} />
      </div>
    );
  }
};

export default ThemeToggle;
