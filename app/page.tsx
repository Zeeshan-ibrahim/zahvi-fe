import { cookies } from "next/headers";
import HomeClient from "@/components/home/HomeClient";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isLogin = Boolean(token?.value);

  return <HomeClient isLogin={isLogin} />;
}
