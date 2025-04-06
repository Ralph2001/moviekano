// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = req.query.url as string;

    if (!url || !url.startsWith("http")) {
        return res.status(400).send("Invalid URL");
    }

    try {
        const response = await axios.get(url, {
            responseType: 'text',
            headers: {
                'User-Agent': 'Mozilla/5.0', // Optional: some servers block empty user agents
            },
        });

        const html = response.data;

        // Sanitize HTML to remove scripts/popups
        const cleanHtml = DOMPurify.sanitize(html, {
            ADD_TAGS: ['iframe'],
        });

        res.setHeader('Content-Type', 'text/html');
        res.send(cleanHtml);
        console.log(cleanHtml)
    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).send("Failed to fetch content");
    }
}
