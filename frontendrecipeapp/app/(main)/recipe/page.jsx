/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Flame,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import {
  getOrGenerateRecipe,
  saveRecipeToCollection,
  removeRecipeFromCollection,
} from "@/actions/recipe.actions";
import { toast } from "sonner";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RecipePDF } from "@/components/RecipePDF";
import { ClockLoader } from "react-spinners";
import ProLockedSection from "@/components/ProLockedSection";

function getDescriptionText(description) {
  if (!description) return "";
  if (typeof description === "string") return description;
  if (Array.isArray(description)) {
    return description
      .map((block) => {
        if (typeof block === "string") return block;
        if (!block || typeof block !== "object") return "";
        if (Array.isArray(block.children)) {
          return block.children
            .map((child) => (child?.text ? String(child.text) : ""))
            .filter(Boolean)
            .join("");
        }
        return block.text ? String(block.text) : "";
      })
      .filter(Boolean)
      .join("\n\n");
  }
  if (typeof description === "object") {
    if (Array.isArray(description.children)) {
      return description.children
        .map((child) => (child?.text ? String(child.text) : ""))
        .filter(Boolean)
        .join("");
    }
    if (description.text) return String(description.text);
  }
  return String(description);
}

function RecipeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeName = searchParams.get("cook");

  const [recipe, setRecipe] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const {
    loading: loadingRecipe,
    data: recipeData,
    fn: fetchRecipe,
  } = useFetch(getOrGenerateRecipe);

  const {
    loading: saving,
    data: saveData,
    fn: saveToCollection,
  } = useFetch(saveRecipeToCollection);

  const {
    loading: removing,
    data: removeData,
    fn: removeFromCollection,
  } = useFetch(removeRecipeFromCollection);

  useEffect(() => {
    if (recipeName && !recipe) {
      const formData = new FormData();
      formData.append("recipeName", recipeName);
      fetchRecipe(formData);
    }
  }, [recipeName]);

  useEffect(() => {
    if (recipeData?.success) {
      setRecipe(recipeData.recipe);
      setRecipeId(recipeData.recipeId);
      setIsSaved(recipeData.isSaved);

      if (recipeData.fromDatabase) {
        toast.success("Recipe loaded from database");
      } else {
        toast.success("New recipe generated and saved!");
      }
    }
  }, [recipeData]);

  useEffect(() => {
    if (saveData?.success) {
      if (saveData.alreadySaved) {
        toast.info("Recipe is already in your collection");
      } else {
        setIsSaved(true);
        toast.success("Recipe saved to your collection!");
      }
    }
  }, [saveData]);

  useEffect(() => {
    if (removeData?.success) {
      setIsSaved(false);
      toast.success("Recipe removed from collection");
    }
  }, [removeData]);

  const handleToggleSave = async () => {
    if (!recipeId) return;

    const formData = new FormData();
    formData.append("recipeId", recipeId);

    if (isSaved) {
      await removeFromCollection(formData);
    } else {
      await saveToCollection(formData);
    }
  };

  if (!recipeName) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center py-20">
          <div className="bg-white w-20 h-20 border border-black/5 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-[#0FA3B1]" />
          </div>
          <h2 className="text-2xl font-bold text-[#121212] mb-2">
            No recipe specified
          </h2>
          <p className="text-[#5B5B5B] mb-6">
            Please select a recipe from the dashboard
          </p>
          <Link href="/dashboard">
            <Button className="bg-[#0FA3B1] hover:bg-[#0D8F9B]">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loadingRecipe === null || loadingRecipe) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <ClockLoader className="mx-auto mb-6" color="#0FA3B1" />
            <h2 className="text-3xl font-bold text-[#121212] mb-2 tracking-tight">
              Preparing your recipe
            </h2>
            <p className="text-[#5B5B5B]">
              Our AI chef is crafting detailed instructions for{" "}
              <span className="font-bold text-[#0FA3B1]">{recipeName}</span>...
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center gap-3 text-sm text-[#7A7269]">
                <div className="flex-1 h-1 bg-[#E6E0DA] overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full bg-[#0FA3B1] animate-slow-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingRecipe === false && !recipe) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center py-20">
          <div className="bg-white w-20 h-20 border border-black/5 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-[#FF8A5B]" />
          </div>
          <h2 className="text-2xl font-bold text-[#121212] mb-2">
            Failed to load recipe
          </h2>
          <p className="text-[#5B5B5B] mb-6">
            Something went wrong while loading the recipe. Please try again.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-black/10 hover:bg-black hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#0FA3B1] hover:bg-[#0D8F9B]"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const descriptionText = getDescriptionText(recipe.description);

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,163,177,0.12),_transparent_55%),radial-gradient(circle_at_90%_10%,_rgba(255,138,91,0.14),_transparent_50%)]" />
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#5B5B5B] hover:text-[#0FA3B1] transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white/90 p-8 md:p-10 border border-black/5 rounded-[24px] shadow-[0_24px_60px_rgba(18,18,18,0.12)]">
              {recipe.imageUrl && (
                <div className="relative w-full h-72 overflow-hidden mb-7 rounded-[20px]">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="text-[#0FA3B1] border-black/5 bg-white"
                >
                  {recipe.cuisine}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[#5B5B5B] border-black/5 bg-white"
                >
                  {recipe.category}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#121212] mb-4 tracking-tight">
                {recipe.title}
              </h1>

              <p className="text-lg text-[#5B5B5B] mb-6">
                {descriptionText}
              </p>

              <div className="flex flex-wrap gap-6 text-[#5B5B5B] mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0FA3B1]" />
                  <span className="font-medium">
                    {parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0FA3B1]" />
                  <span className="font-medium">{recipe.servings} servings</span>
                </div>
                {recipe.nutrition?.calories && (
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#FF8A5B]" />
                    <span className="font-medium">
                      {recipe.nutrition.calories} cal/serving
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleToggleSave}
                  disabled={saving || removing}
                  className={`${
                    isSaved
                      ? "bg-[#121212] hover:bg-[#2A2A2A]"
                      : "bg-[#0FA3B1] hover:bg-[#0D8F9B]"
                  } text-white gap-2 transition-all`}
                >
                  {saving || removing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {saving ? "Saving..." : "Removing..."}
                    </>
                  ) : isSaved ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      Saved to Collection
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      Save to Collection
                    </>
                  )}
                </Button>
                <PDFDownloadLink
                  document={<RecipePDF recipe={recipe} />}
                  fileName={`${recipe.title.replace(/\s+/g, "-").toLowerCase()}.pdf`}
                >
                  {({ loading }) => (
                    <Button
                      variant="outline"
                      className="border-black/10 text-[#121212] hover:bg-white gap-2"
                      disabled={loading}
                    >
                      <Download className="w-4 h-4" />
                      {loading ? "Preparing PDF..." : "Download PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>

            <div className="bg-white/90 p-8 border border-black/5 rounded-[24px]">
              <h2 className="text-2xl font-bold text-[#121212] mb-6">
                Step-by-step instructions
              </h2>

              <div>
                {recipe.instructions.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative pl-12 pb-8 ${
                      index !== recipe.instructions.length - 1
                        ? "border-l border-[#E6E0DA] ml-5"
                        : "ml-5"
                    }`}
                  >
                    <div className="absolute -left-5 top-0 w-10 h-10 bg-[#0FA3B1] text-white flex items-center justify-center font-bold rounded-xl">
                      {step.step}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-[#121212] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#5B5B5B] mb-3">{step.instruction}</p>
                      {step.tip && (
                        <div className="bg-[#F2FAFB] border-l-4 border-[#0FA3B1] p-4 rounded-r-xl">
                          <p className="text-sm text-[#0B5C64] flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong className="font-semibold">Pro Tip:</strong>{" "}
                              {step.tip}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-[#F0FBF5] to-[#E6F5EE] border border-[#CDECDC] rounded-2xl">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#1B8F58] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#176742] mb-1">
                      You're all done!
                    </h3>
                    <p className="text-sm text-[#176742]">
                      Plate your masterpiece and enjoy your delicious {recipe.title}.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {recipe.tips && recipe.tips.length > 0 && (
              <div className="bg-white/90 p-8 border border-black/5 rounded-[24px]">
                <h2 className="text-2xl font-bold text-[#121212] mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-[#0FA3B1]" />
                  Chef's tips and tricks
                  {!recipeData.isPro && (
                    <span className="text-xs bg-[#E6F5EE] text-[#176742] px-2 py-0.5 rounded-full font-semibold">
                      PRO
                    </span>
                  )}
                </h2>

                <ProLockedSection
                  isPro={recipeData.isPro}
                  lockText="Chef tips are Pro-only"
                  ctaText="Unlock Pro Tips ->"
                >
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#5B5B5B]">
                        <CheckCircle2 className="w-5 h-5 text-[#0FA3B1] flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </ProLockedSection>
              </div>
            )}

            {recipe.substitutions && recipe.substitutions.length > 0 && (
              <div className="bg-white/90 p-8 border border-black/5 rounded-[24px]">
                <h2 className="text-2xl font-bold text-[#121212] mb-4 flex items-center gap-2">
                  Ingredient substitutions
                  {!recipeData.isPro && (
                    <span className="text-xs bg-[#F4ECE7] text-[#A65A3A] px-2 py-0.5 rounded-full font-semibold">
                      PRO
                    </span>
                  )}
                </h2>

                <p className="text-[#5B5B5B] mb-6 text-sm">
                  Don't have everything? Here are some alternatives you can use:
                </p>

                <ProLockedSection
                  isPro={recipeData.isPro}
                  lockText="Substitutions are Pro-only"
                >
                  <div className="space-y-4">
                    {recipe.substitutions.map((sub, i) => (
                      <div
                        key={i}
                        className="border-b border-black/5 pb-4 last:border-0 last:pb-0"
                      >
                        <h3 className="font-semibold text-[#121212] mb-2">
                          Instead of {" "}
                          <span className="text-[#0FA3B1]">{sub.original}</span>:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {sub.alternatives.map((alt, j) => (
                            <Badge
                              key={j}
                              variant="outline"
                              className="text-[#5B5B5B] border-black/5"
                            >
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ProLockedSection>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 p-6 border border-black/5 rounded-[24px] lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold text-[#121212] mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-[#0FA3B1]" />
                Ingredients
              </h2>

              {Object.entries(
                recipe.ingredients.reduce((acc, ing) => {
                  const cat = ing.category || "Other";
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(ing);
                  return acc;
                }, {})
              ).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-sm font-bold text-[#5B5B5B] uppercase tracking-wide mb-3">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((ingredient, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-start gap-2 text-[#121212] py-2 border-b border-black/5 last:border-0"
                      >
                        <span className="flex-1">{ingredient.item}</span>
                        <span className="font-semibold text-[#0FA3B1] text-sm whitespace-nowrap">
                          {ingredient.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {recipe.nutrition && (
                <div className="mt-6 pt-6 border-t border-black/5">
                  <h3 className="font-semibold text-[#121212] mb-3 uppercase tracking-wide text-sm flex items-center gap-2">
                    Nutrition (per serving)
                    {!recipeData.isPro && (
                      <span className="text-xs bg-[#E6F5EE] text-[#176742] px-2 py-0.5 rounded-full font-semibold">
                        PRO
                      </span>
                    )}
                  </h3>

                  <ProLockedSection
                    isPro={recipeData.isPro}
                    lockText="Nutrition info is Pro-only"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F2FAFB] p-3 text-center border border-[#D7EEF1] rounded-xl">
                        <div className="text-2xl font-bold text-[#0FA3B1]">
                          {recipe.nutrition.calories}
                        </div>
                        <div className="text-xs text-[#5B5B5B] font-semibold uppercase tracking-wide">
                          Calories
                        </div>
                      </div>

                      <div className="bg-white p-3 text-center border border-black/5 rounded-xl">
                        <div className="text-2xl font-bold text-[#121212]">
                          {recipe.nutrition.protein}
                        </div>
                        <div className="text-xs text-[#5B5B5B] font-semibold uppercase tracking-wide">
                          Protein
                        </div>
                      </div>

                      <div className="bg-white p-3 text-center border border-black/5 rounded-xl">
                        <div className="text-2xl font-bold text-[#121212]">
                          {recipe.nutrition.carbs}
                        </div>
                        <div className="text-xs text-[#5B5B5B] font-semibold uppercase tracking-wide">
                          Carbs
                        </div>
                      </div>

                      <div className="bg-white p-3 text-center border border-black/5 rounded-xl">
                        <div className="text-2xl font-bold text-[#121212]">
                          {recipe.nutrition.fat}
                        </div>
                        <div className="text-xs text-[#5B5B5B] font-semibold uppercase tracking-wide">
                          Fat
                        </div>
                      </div>
                    </div>
                  </ProLockedSection>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecipePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center py-20">
            <Loader2 className="w-16 h-16 text-[#0FA3B1] animate-spin mx-auto mb-6" />
            <p className="text-[#5B5B5B]">Loading recipe...</p>
          </div>
        </div>
      }
    >
      <RecipeContent />
    </Suspense>
  );
}
