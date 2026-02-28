import Link from "next/link";
import React from "react"
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
const RecipeCard = ({ recipe, variant = "default" }) => {
    const getRecipeData = () => {
        if (recipe.strMeal) {
            return {
                title: recipe.strMeal,
                image: recipe.strMealThumb,
                href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
                showImage: true,
            }
        }

        return {

        }
    }
    const data = getRecipeData()
    if (variant === "grid") {
        return (
            <Link href={data.href}>

                <Card className="rounded-none overflow-hidden border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group pt-0">
                    {data.showImage ? (
                        <div className="relative aspect-square">
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    Click to view recipe
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-group-hover:text-orange-600 transition-colors line-clamp-2">{data.title}

                        </CardTitle>
                    </CardHeader>

                </Card>
            </Link>
        )
    }
    return <>
    </>
};
export default RecipeCard