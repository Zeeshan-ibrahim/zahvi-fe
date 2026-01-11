import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "../routes";
import { MapsLandingPage } from "./components/Maps";
import { NavBar } from "./components/navbar";

export default async function dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    redirect(ROUTES.LOGIN);
  }

  return (

    // we need omething simpler to land on and than shift toward landing page
    // we also need notification and some maintance page
    // lets start with uploading picture and trying to add location, private and public message
    // maps main page
    <div className="h-full relative">
      <NavBar />
      {/* sometimes maps are not loaded we need to reload the page - better approach */}
      <MapsLandingPage />
    </div>
  )
}