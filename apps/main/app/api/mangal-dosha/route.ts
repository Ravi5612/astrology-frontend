import { NextResponse } from "next/server";
import { prokeralaLimiter, rateLimitResponse } from "@/lib/rateLimit";

const CLIENT_ID = process.env.PROKERALA_CLIENT_ID || "0997d99e-d015-4a29-9cbb-a802a37acef5";
const CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET || "QhRT3LPzVOhQQ5MMf3eOx8wdpJo164Djwadd3Uw9";

export async function GET(request: Request) {
  // ── Rate limiting: max 10 requests per minute per IP ──────────────────────
  const limit = prokeralaLimiter(request);
  if (!limit.success) return rateLimitResponse(limit);

  try {
    const { searchParams } = new URL(request.url);
    const dob = searchParams.get("dob");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const la = searchParams.get("la") || "en";

    console.log("=== Mangal Dosha API Request Started ===");
    console.log("Parameters Received:", { dob, lat, lon, la });

    if (!dob || !lat || !lon) {
      console.error("Missing mandatory parameters");
      return NextResponse.json(
        { error: "Missing mandatory parameters: dob, lat, lon" },
        { status: 400 }
      );
    }

    // 1. Get Access Token
    console.log("Step 1: Fetching Access Token...");
    const tokenResponse = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("Token Response Status:", tokenResponse.status);

    if (!tokenData.access_token) {
      console.error("Mangal Dosha Auth Failed:", tokenData);
      return NextResponse.json(
        { error: "Failed to authenticate with Prokerala" },
        { status: 500 }
      );
    }
    console.log("Token acquired successfully.");

    // 2. Fetch Mangal Dosha Data
    const coordinates = `${lat},${lon}`;

    const params = new URLSearchParams({
      ayanamsa: "1",
      datetime: dob,
      coordinates: coordinates,
      la: la,
    });
    const apiUrl = `https://api.prokerala.com/v2/astrology/mangal-dosha/advanced?${params.toString()}`;
    console.log("Step 2: Calling Prokerala API...");
    console.log("API URL:", apiUrl);

    const dataResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/json",
      },
    });

    const result = await dataResponse.json();

    console.log("Prokerala API Response Status:", dataResponse.status);

    if (!dataResponse.ok) {
      console.error("Prokerala Mangal Dosha Error Result:", result);
      return NextResponse.json(
        { error: result.errors?.[0]?.detail || "API request failed" },
        { status: dataResponse.status }
      );
    }

    console.log("API Request Successful. Returning result.");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error(
      "Mangal Dosha API Error:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: "Failed to perform Mangal Dosha analysis" },
      { status: 500 }
    );
  }
}


