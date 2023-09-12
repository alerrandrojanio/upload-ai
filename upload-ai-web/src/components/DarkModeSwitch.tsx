"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { MdLightMode } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";

export function DarkModeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      {mounted && currentTheme === "dark" ? (
        <MdLightMode
          className="cursor-pointer text-xl text-muted-foreground hover:text-primary"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BsFillMoonFill
          className="cursor-pointer text-xl text-muted-foreground hover:text-primary"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
}
