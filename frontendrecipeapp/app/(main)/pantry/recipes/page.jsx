"use client";

import { useEffect } from "react";
import {
  ArrowLeft,
  ChefHat,
  Loader2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import { getRecipesByPantryIngredients } from "@/actions/recipe.actions";
import RecipeCard from "@/components/RecipeCard";
import PricingModal from "@/components/PricingModal";

export default function PantryRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchSuggestions,
  } = useFetch(getRecipesByPantryIngredients);

  console.log(recipesData);

  // Load suggestions on mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const recipes = recipesData?.recipes || [];
  const ingredientsUsed = recipesData?.ingredientsUsed || "";

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/pantry"
            className="inline-flex items-center gap-2 text-[#5B5B5B] hover:text-[#0FA3B1] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pantry
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <ChefHat className="w-16 h-16 text-[#0FA3B1]" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#121212] tracking-tight">
                What Can I Cook?
              </h1>
              <p className="text-[#5B5B5B] font-light">
                AI-powered recipe suggestions based on your pantry
              </p>
            </div>
          </div>

          {/* Ingredients Used */}
          {ingredientsUsed && (
            <div className="bg-white/80 p-4 border border-black/10 mb-4 rounded-2xl">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-[#0FA3B1] mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-[#121212] mb-1">
                    Your Available Ingredients:
                  </h3>
                  <p className="text-[#5B5B5B] text-sm font-light">
                    {ingredientsUsed}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Usage Stats */}
          {recipesData !== undefined && (
            <div className="bg-white/80 p-4 border border-black/10 inline-flex items-center gap-3 rounded-2xl">
              <Sparkles className="w-5 h-5 text-[#0FA3B1]" />
              <div className="text-sm text-[#5B5B5B]">
                {recipesData.recommendationsLimit === "unlimited" ? (
                  <>
                    <span className="font-semibold text-[#0FA3B1]">
                      Unlimited AI recommendations
                    </span>
                    <span className="text-[#5B5B5B] font-light">
                      {" "}
                      (Pro Plan)
                    </span>
                  </>
                ) : (
                  <span className="text-[#5B5B5B] font-light">
                    Upgrade to Pro for unlimited AI recommendations
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#0FA3B1] animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-[#121212] mb-2">
              Finding Perfect Recipes...
            </h2>
            <p className="text-[#5B5B5B] font-light">
              Our AI chef is analyzing your ingredients
            </p>
          </div>
        )}

        {/* Recipes Grid - Using RecipeCard Component */}
        {!loading && recipes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0FA3B1]" />
                <h2 className="text-2xl font-bold text-[#121212]">
                  Recipe Suggestions
                </h2>
              </div>
              <Badge
                variant="outline"
                className="border border-black/10 text-[#121212] font-semibold uppercase tracking-wide"
              >
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} variant="pantry" />
              ))}
            </div>

            {/* Refresh Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={() => fetchSuggestions(new FormData())}
                variant="outline"
                className="border border-black/10 hover:bg-white gap-2 text-[#121212]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get New Suggestions
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Empty Pantry State */}
        {!loading && recipes.length === 0 && recipesData?.success === false && (
          <div className="bg-white/80 p-12 text-center border border-dashed border-black/10 rounded-2xl">
            <div className="bg-[#0FA3B1]/10 w-20 h-20 border border-[#0FA3B1]/30 flex items-center justify-center mx-auto mb-6 rounded-2xl">
              <AlertCircle className="w-10 h-10 text-[#0FA3B1]" />
            </div>
            <h3 className="text-2xl font-bold text-[#121212] mb-2">
              Your Pantry is Empty
            </h3>
            <p className="text-[#5B5B5B] mb-8 max-w-md mx-auto font-light">
              Add ingredients to your pantry first so we can suggest delicious
              recipes you can make!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pantry/scan">
                <Button className="bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white gap-2">
                  <Sparkles className="w-4 h-4" />
                  Scan with AI
                </Button>
              </Link>
              <Link href="/pantry">
                <Button
                  variant="outline"
                  className="border border-black/10 hover:bg-white gap-2 text-[#121212]"
                >
                  Add Manually
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Rate Limit Reached */}
        {!loading && recipesData === undefined && (
          <div className="bg-white/80 p-12 text-center border border-black/10 rounded-2xl">
            <div className="bg-[#0FA3B1]/10 w-20 h-20 border border-[#0FA3B1]/30 flex items-center justify-center mx-auto mb-6 rounded-2xl">
              <Sparkles className="w-10 h-10 text-[#0FA3B1]" />
            </div>
            <h3 className="text-2xl font-bold text-[#121212] mb-2">
              Monthly Limit Reached
            </h3>
            <p className="text-[#5B5B5B] mb-8 max-w-md mx-auto font-light">
              You&apos;ve used all your AI recipe recommendations this month.
              Upgrade to Pro for unlimited suggestions!
            </p>
            <PricingModal>
              <Button className="bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white gap-2">
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            </PricingModal>
          </div>
        )}
      </div>
    </div>
  );
}
