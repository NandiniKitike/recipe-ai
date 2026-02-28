"use server"

const { GoogleGenerativeAI } = require("@google/generative-ai");

const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
export async function scanPantryImage(formData) {
    try {
        const image = formData.get("image");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    }
}