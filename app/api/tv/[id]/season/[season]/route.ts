import { NextResponse } from "next/server";
import { tvApi } from "@/services/tmdbClient";

export async function GET(
    _req: Request,
    { params }: { params: { id: string; season: string } }
) {
    const tvId = Number(params.id);
    const seasonNum = Number(params.season);
    try {
        const data = await tvApi.getTvSeasonDetails(tvId, seasonNum);
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.error();
    }
}
