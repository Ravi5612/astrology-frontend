// app/api/horoscope/route.ts
import { NextResponse } from "next/server";

const CLIENT_ID = "0997d99e-d015-4a29-9cbb-a802a37acef5";
const CLIENT_SECRET = "QhRT3LPzVOhQQ5MMf3eOx8wdpJo164Djwadd3Uw9";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sign = searchParams.get("sign");

  if (!sign)
    return NextResponse.json({ error: "Sign is required" }, { status: 400 });

  try {
    // 1. Get Access Token (Server-side)
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

    // 2. Fetch Horoscope Data
    const today = new Date().toISOString();
    const lang = searchParams.get("lang") || "en"; // default English
    const dataResponse = await fetch(
      `https://api.prokerala.com/v2/horoscope/daily/advanced?sign=${sign}&datetime=${today}&type=all&lang=${lang}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const result = await dataResponse.json();

    // 3. Fallback Translation if lang=hi (Prokerala advanced doesn't return Hindi text)
    if (lang === "hi" && result.data && result.data.daily_predictions) {
      try {
        const translateText = async (text: string) => {
          const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(
              text
            )}`
          );
          const json = await res.json();
          return json[0].map((item: any) => item[0]).join("");
        };

        const predictions = result.data.daily_predictions[0].predictions;
        for (let i = 0; i < predictions.length; i++) {
          predictions[i].prediction = await translateText(predictions[i].prediction);
          if (predictions[i].seek) predictions[i].seek = await translateText(predictions[i].seek);
          if (predictions[i].challenge) predictions[i].challenge = await translateText(predictions[i].challenge);
          if (predictions[i].insight) predictions[i].insight = await translateText(predictions[i].insight);
        }
      } catch (translateError) {
        console.error("Translation failed, falling back to English:", translateError);
      }
    }

    // Response with CORS headers for safety
    return NextResponse.json(result, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cosmic data" },
      { status: 500 }
    );
  }
}


