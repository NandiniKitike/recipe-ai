import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/next";

const key = process.env.ARCJET_KEY || "ajkey_placeholder";

// Base Arcjet instance with global protections
export const aj = arcjet({
    key: key,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
    ],
});

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 10,
        interval: "30d",
        capacity: 10,
    })
);

// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 5,
        interval: "30d",
        capacity: 5,
    })
);

// Pro tier
export const proTierLimit = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 1000,
        interval: "1d",
        capacity: 1000,
    })
);