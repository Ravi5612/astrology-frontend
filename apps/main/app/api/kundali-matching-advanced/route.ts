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
    const boy_dob = searchParams.get("boy_dob");
    const boy_lat = searchParams.get("boy_lat");
    const boy_lon = searchParams.get("boy_lon");
    const girl_dob = searchParams.get("girl_dob");
    const girl_lat = searchParams.get("girl_lat");
    const girl_lon = searchParams.get("girl_lon");

    if (
      !boy_dob ||
      !boy_lat ||
      !boy_lon ||
      !girl_dob ||
      !girl_lat ||
      !girl_lon
    ) {
      return NextResponse.json(
        { error: "Missing mandatory parameters for boy or girl" },
        { status: 400 }
      );
    }

    // 1. Get Access Token
    console.log("Token Request Initiated...");
    const tokenResponse = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Matching Auth Failed:", tokenData);
      return NextResponse.json(
        { error: "Failed to authenticate with Prokerala" },
        { status: 500 }
      );
    }
    console.log("Token Received Successfully");

    // 2. Fetch Advanced Kundli Matching Data
    const boyCoords = `${boy_lat},${boy_lon}`;
    const girlCoords = `${girl_lat},${girl_lon}`;

    const params = new URLSearchParams({
      ayanamsa: "1",
      boy_dob: boy_dob,
      boy_coordinates: boyCoords,
      girl_dob: girl_dob,
      girl_coordinates: girlCoords,
    });

    console.log(
      "Fetching Prokerala Advanced Matching with params:",
      params.toString()
    );

    const dataResponse = await fetch(
      `https://api.prokerala.com/v2/astrology/kundli-matching/advanced?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const result = await dataResponse.json();

    console.log("Prokerala API Response Status:", dataResponse.status);
    if (dataResponse.ok) {
      console.log(
        "Data Retrieved Successfully. Keys:",
        Object.keys(result.data || {})
      );
    }

    if (!dataResponse.ok) {
      console.error("Prokerala Advanced Matching Error Result:", result);
      return NextResponse.json(
        { error: result.errors?.[0]?.detail || "API request failed" },
        { status: dataResponse.status }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(
      "Advanced Kundli Matching API Error:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: "Failed to perform Advanced Kundli matching" },
      { status: 500 }
    );
  }
}


