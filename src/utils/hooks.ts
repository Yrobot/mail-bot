"use client";
import { useEffect, useState } from "react";

export const useClientState = <T extends unknown>({
  default: defaultValue,
  getState,
}: {
  default: T;
  getState: () => T;
}) => {
  const [value, setValue] = useState<T>(defaultValue);
  useEffect(() => {
    setValue(getState());
  }, []);
  return [value, setValue];
};
