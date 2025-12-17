import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ImageContent } from "./ImageContent";
import { ROUTES } from "../routes";

export default async function dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <ImageContent />
  )
  
  
}