"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsDarkMode } from "@/state/index";

const ThemeInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    dispatch(setIsDarkMode(prefersDark));
  }, [dispatch]);

  return null;
};

export default ThemeInitializer;
