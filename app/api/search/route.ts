import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const mediaType = searchParams.get("mediaType") || "movie";
    const page = searchParams.get("page") || "1";

    if (!query) {
        return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const response = await fetch(`https://api.themoviedb.org/3/search/${mediaType}?query=${encodeURIComponent(query)}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return NextResponse.json(data);
}
