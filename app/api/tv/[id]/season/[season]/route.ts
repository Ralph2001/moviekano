import { NextResponse } from "next/server";
import { tvApi } from "@/services/tmdbClient";
import type { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: { id: string; season: string } }
) {
    const tvId = Number(context.params.id);
    const seasonNum = Number(context.params.season);
    try {
        const data = await tvApi.getTvSeasonDetails(tvId, seasonNum);
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.error();
    }
}
