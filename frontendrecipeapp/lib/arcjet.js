import arcjet from "@arcjet/next"
export const aj = arcjet({
    key: process.env.NEXT_PUBLIC_ARCJET_KEY,
    rules: []
})

export const freePantryScans = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 5,
        interval: "30d",
        capacity: 10
    })
)
export const freeMealRecommendations = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 5,
        interval: "30d",
        capacity: 10
    })
)