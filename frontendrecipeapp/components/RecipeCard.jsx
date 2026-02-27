import React from "react"
const RecipeCard = ({ recipe, varoant = "default" }) => {
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

                </Card>
            </Link>
        )
    }
    return <>
    </>
};
export default RecipeCard