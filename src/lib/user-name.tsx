import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { user } from "@/lib/data";

const DEFAULT_FULL_NAME = `${user.name} Mehta`;
const STORAGE_KEY = "healthify:name";

type Ctx = { fullName: string; firstName: string; setFullName: (n: string) => void };

const UserNameContext = createContext<Ctx>({
  fullName: DEFAULT_FULL_NAME,
  firstName: user.name,
  setFullName: () => {},
});

export function UserNameProvider({ children }: { children: ReactNode }) {
  const [fullName, setName] = useState(DEFAULT_FULL_NAME);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setName(stored);
  }, []);

  const setFullName = (n: string) => {
    const clean = n.trim() || DEFAULT_FULL_NAME;
    setName(clean);
    localStorage.setItem(STORAGE_KEY, clean);
  };

  return (
    <UserNameContext.Provider
      value={{ fullName, firstName: fullName.split(" ")[0] ?? fullName, setFullName }}
    >
      {children}
    </UserNameContext.Provider>
  );
}

export function useUserName() {
  return useContext(UserNameContext);
}
