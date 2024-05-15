import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) notFound();
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await (
    await fetch(accessTokenURL, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  if ("error" in accessTokenResponse) {
    return new Response(null, { status: 400 });
  }
  return Response.json(accessTokenResponse);
};
