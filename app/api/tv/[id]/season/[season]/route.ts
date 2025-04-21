import { NextResponse } from "next/server";
import { tvApi } from "@/services/tmdbClient";
import type { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string; season: string }> }
) {
    const { id, season } = await context.params; // ✅ await here
    const tvId = Number(id);
    const seasonNum = Number(season);

    try {
        const data = await tvApi.getTvSeasonDetails(tvId, seasonNum);
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.error();
    }
}
