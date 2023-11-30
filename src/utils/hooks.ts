"use client";
import { useEffect, useState } from "react";

export const useClientState = <T extends unknown>({
  default: defaultValue,
  getState,
}: {
  default: T;
  getState: () => T;
}): [T, (state: T) => void] => {
  const [value, setValue] = useState<T>(defaultValue);
  useEffect(() => {
    setValue(getState());
  }, []);
  return [value, setValue];
};

export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
