import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { SuccessFulAuthentication } from "../../Models/AuthResponse";

interface Props {
  children: ReactNode;
}

export default function Protected({ children }: Props) {

    const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  let parsed: SuccessFulAuthentication | null = null;
  try {
    parsed = JSON.parse(user);
  } catch {
    parsed = null;
  }

  if (!parsed || !parsed.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}