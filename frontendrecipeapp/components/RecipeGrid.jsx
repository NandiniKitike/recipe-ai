import useFetch from "@/hooks/use-fetch";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react"
import RecipeCard from "./RecipeCard";
const RecipeGrid = ({
    type,
    value,
    fetchAction,
    backLink = "/dashboard",

}) => {
    const { data, loading, fn: fetchMeals } = useFetch(fetchAction)
    useEffect(() => {
        if (value) {
            const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
            fetchMeals(formattedValue)
        }
    }, [value])
    const meals = data?.meals || []
    const dispalyName = value?.replace(/-/g, " ")
    return (
        <div className="min-h-screen bg-stone pt-14 pb-16 px-4">

            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <Link
                        href={backLink}
                        className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold text-stone-900 capitalize tracking-tight leading-tight">
                        {dispalyName}{" "}
                        <span className="text-orange-600">
                            {type === "cuisine" ? "Cuisine" : "Recipes"}
                        </span>
                    </h1>
                    {!loading && meals.length > 0 && (
                        <p className="text-stone-600 mt-2">
                            {meals.length} delicious {dispalyName}{" "}
                            {type === "cuisine" ? "dishes" : "recipes"} to try

                        </p>
                    )}
                </div>
                {loading && (
                    <div className="flex flex-col justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-orange-600 animate-spin mb-4" />
                        <p className="text-stone-500">Loading recipes...</p>
                    </div>
                )}
                {!loading && meals.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {meals.map((meal) => (
                            <RecipeCard key={meal.idMeal} recipe={meal} variant="grid" />




                            // <Link
                            //     key={meal.idMeal}
                            //     href={`/recipes/${meal.idMeal}`}
                            //     className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden group"
                            // >
                            //     <div className="overflow-hidden">
                            //         <img
                            //             src={meal.strMealThumb}
                            //             alt={meal.strMeal}
                            //             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            //         />
                            //     </div>

                            //     <div className="p-4">
                            //         <h3 className="font-semibold text-stone-900 group-hover:text-orange-600 transition-colors">
                            //             {meal.strMeal}
                            //         </h3>
                            //     </div>
                            // </Link>
                        ))}
                    </div>
                )}
                {!loading && meals.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold">
                            No recipes found
                        </h3>

                        <p className="text-stone-500 mb-6">
                            We couldn&apos;t find any {dispalyName}{" "}
                            {type === "cuisine" ? "dishes" : "recipes"}

                        </p>
                        <Link href={backLink}>
                            <span className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold">
                                <ArrowLeft className="w-4 h-4" />
                                go back to explore more
                            </span>
                        </Link>
                    </div>
                )}




            </div>

        </div>
    )

}
export default RecipeGrid;
