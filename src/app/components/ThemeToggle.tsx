"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        height={36}
        width={36}
        alt="Loading dark or light theme"
        priority={false}
        title="Loading dark or light theme"
        className="absolute top-6 right-32"
      />
    );
  if (theme === "dark") {
    return (
      <FiSun
        size={25}
        className="absolute top-6 right-32"
        onClick={() => setTheme("light")}
      />
    );
  }

  if (theme === "light") {
    return (
      <FiMoon
        size={25}
        className="absolute top-6 right-32"
        onClick={() => setTheme("dark")}
      />
    );
  }
};

export default ThemeToggle;
