import { NextResponse } from "next/server";

import { auth } from "@acme/auth";

export default auth((req) => {
  if (req.auth?.user.role !== "admin") {
    return NextResponse.redirect("/");
  }
});
export const config = {
  matcher: ["/dashboard/*"],
};
