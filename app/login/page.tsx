import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthPageClient } from "./components/AuthPageClient";
import { ROUTES } from "../routes";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token?.value) {
    redirect(ROUTES.DASHBOARD);
  }

  return <AuthPageClient />;
}