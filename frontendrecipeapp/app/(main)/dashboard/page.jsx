import { getAreas, getCategories, getRecipeOfTheDay } from "@/actions/mealdb.actions";
import React from "react"
const Dashboard = async () => {
    const recipeData = await getRecipeOfTheDay()
    const categoriesData = await getCategories();
    const areasData = await getAreas();

    const recipOfTheDay = recipeData?.recipe
    const categories = categoriesData?.categories || []
    const areas = areasData?.areas || []
    return (
        <div className="min-h-screen bg-stone-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mv-5">
                    <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">
                        Fresh Recipes, Servd Daily 🔥
                    </h1>
                    <p className="text-xl text-stone-600 font-light max-w-2xl">
                        Discover thousands of recipes from around the world. Cook, create, and savor

                    </p>
                </div>
                {/* //Recipe of the areasData */}
                {recipeOfTheDay && (
                    <section className="mb-24 relative">
                        <div className="flex items-center gap-2 mb-06">
                            <Flame className="w-6 h-6 text-orange-600" />
                            <h2 className="text-3xl font-serif fongt-bold text-stone-900">
                                Recipe od the Day

                            </h2>

                        </div>

                    </section>
                )}

            </div>
        </div>
    )
}
export default Dashboard