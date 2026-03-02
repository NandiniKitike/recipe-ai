import arcjet from "@arcjet/next"
export const aj = arcjet({
    key: process.env.NEXT_PUBLIC_ARCJET_KEY
})

export const freePantryScans = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 5,
        interval: "30d",
        capacity: 5
    })
)