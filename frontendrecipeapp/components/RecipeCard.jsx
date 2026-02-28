import React from "react"
const RecipeCard = ({ recipe, variant = "default" }) => {
    const gettRecipeData = () => {
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

                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2">{data.title}

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