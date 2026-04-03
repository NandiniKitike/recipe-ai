import { getAreas, getCategories, getRecipeOfTheDay } from "@/actions/mealdb.actions";
import { Button } from "@/components/ui/button";
import { getCategoryEmoji, getCountryFlag } from "@/lib/data";
import { ArrowRight, Badge, Flame, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react"
const Dashboard = async () => {
    const recipeData = await getRecipeOfTheDay()
    const categoriesData = await getCategories();
    const areasData = await getAreas();

    const recipOfTheDay = recipeData?.recipe
    const categories = categoriesData?.categories || []
    const areas = areasData?.areas || []
    return (
        <div className="min-h-screen bg-[#F7F5F2] py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mv-5">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#121212] mb-4 tracking-tight leading-tight">
                        Fresh Recipes, Servd Daily
                    </h1>
                    <p className="text-xl text-[#5B5B5B] font-light max-w-2xl">
                        Discover thousands of recipes from around the world. Cook, create, and savor

                    </p>
                </div>
                {/* //Recipe of the areasData */}
                {recipOfTheDay && (
                    <section className="mb-24 relative">
                        <div className="flex items-center gap-2 mb-6">
                            <Flame className="w-6 h-6 text-[#0FA3B1]" />
                            <h2 className="text-3xl font-serif font-bold text-[#121212]">
                                Recipe of the Day

                            </h2>

                        </div>
                        <Link href={`/recipe?cook=${encodeURIComponent(
                            recipOfTheDay.strMeal
                        )}`}>
                            <div className="relative bg-white/90 border border-black/10 overflow-hidden hover:shadow-[0_24px_60px_rgba(18,18,18,0.12)] transition-all duration-300 group cursor-pointer rounded-2xl">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="relative aspect-4/3 md:aspect-auto border-b md:border-b-0 md:border-r border-black/10">
                                        <Image
                                            src={recipOfTheDay.strMealThumb}
                                            alt={recipOfTheDay.strMeal}
                                            fill
                                            className="object-cover"
                                        />

                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <Badge
                                                variant="outline"
                                                className="border border-[#0FA3B1]/30 text-[#0FA3B1] bg-[#0FA3B1]/10 font-semibold"
                                            >
                                                {recipOfTheDay.strCategory}

                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="border border-black/10 text-[#5B5B5B] bg-white font-semibold"
                                            >
                                                <Globe className="w-3 h-3 mr-1" />
                                                {recipOfTheDay.strArea}

                                            </Badge>

                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-bold text-[#121212] mb-4 group-hover:text-[#0FA3B1] transition-colors leading-tight">
                                            {recipOfTheDay.strMeal}

                                        </h3>
                                        <p className="text-[#5B5B5B] mb-6 line-clamp font-light text-lg">
                                            {recipOfTheDay.strInstructions?.substring(0, 200)}

                                        </p>
                                        <Button variant="primary" size="lg" className="bg-[#0FA3B1] hover:bg-[#0D8F9B]">
                                            Start Cooking <ArrowRight className="w-5 h-5 ml-2" />

                                        </Button>


                                    </div>

                                </div>

                            </div>

                        </Link>

                    </section>
                )}

                <section className="mb-24">
                    <div className="">
                        <h2 className="text-[#5B5B5B] text-lg font-light">Browse by Category</h2>
                        <p className="text-[#5B5B5B] text-lg font-light">
                            Find recipes that match your mood

                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.strCategory}
                                href={`/recipes/category/${category.strCategory.toLowerCase()}`}
                            >
                                <div className="bg-white/90 p-6 border border-black/10 hover:shadow-[0_18px_36px_rgba(18,18,18,0.12)] transition-all text-center group cursor-pointer rounded-2xl">
                                    <div className="text-4xl mb-3">
                                        {getCategoryEmoji(category.strCategory)}

                                    </div>
                                    <h3 className="font-semibold text-[#121212] group-hover:text-[#0FA3B1] transition-colors text-sm">
                                        {category.strCategory}

                                    </h3>

                                </div>


                            </Link>
                        ))}
                    </div>
                </section>
                <section className="mb-25">
                    <div className="mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#121212] mb-2">
                            Explore World Cuisines
                        </h2>
                        <p className="text-[#5B5B5B] text-lg font-light">
                            Travel the globe through food
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {areas.map((area) => (
                            <Link key={area.strArea} href={`/recipes/category/${area.strArea.toLowerCase().replace(/\s+/g, "-")}`}>
                                <div className="bg-white/90 p-6 border border-black/10 hover:shadow-[0_18px_36px_rgba(18,18,18,0.12)] transition-all text-center group cursor-pointer flex gap-3 items-center justify-center rounded-2xl">
                                    <span className="text-3xl">
                                        {getCountryFlag(area.strArea)}
                                    </span>
                                    <span className="font-semibold text-[#121212] group-hover:text-[#0FA3B1] transition-colors text-sm">
                                        {area.strArea}
                                    </span>
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>
            </div>
        </div>
    )
}
export default Dashboard
