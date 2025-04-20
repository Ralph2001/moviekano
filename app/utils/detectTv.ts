// utils/detectTv.ts

/**
 * Check if the current device is a Smart TV or an Android TV.
 * Uses a combination of TV-specific keywords in the user agent string.
 */
export function isTvDevice(userAgent: string): boolean {
    const ua = userAgent.toLowerCase();

    // Common TV identifiers (prioritized)
    const tvKeywords = [
        "smart-tv",
        "smarttv",
        "android tv",  // Catches "Android TV" explicitly
        "crkey",       // Chromecast devices
        "googletv",
        "philipstv",
        "hbbtv",       // Hybrid Broadcast Broadband TV
        "opera tv",    // Opera TV Store apps
        "tv;",         // Common in Sony/Philips (e.g., "BRAVIA TV")
        "tvhome",      // Android TV Home Launcher
        "atv",         // Short for Android TV (e.g., in model names)
        "bravia",      // Sony TVs
        "nettv",       // LG/Others
        "inettv",      // Samsung
    ];

    // Avoid overly generic terms like "tv" alone to reduce false positives
    return tvKeywords.some(keyword => ua.includes(keyword));
}