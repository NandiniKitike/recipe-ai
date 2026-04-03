"use client";

import { useEffect } from "react";
import { Bookmark, Loader2, ChefHat, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { getSavedRecipes } from "@/actions/recipe.actions";
import RecipeCard from "@/components/RecipeCard";

export default function SavedRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchSavedRecipes,
  } = useFetch(getSavedRecipes);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const recipes = recipesData?.recipes || [];

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,163,177,0.12),_transparent_55%),radial-gradient(circle_at_90%_10%,_rgba(255,138,91,0.12),_transparent_50%)]" />
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 rounded-[28px] border border-black/5 bg-white/80 p-8 shadow-[0_24px_60px_rgba(18,18,18,0.12)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0FA3B1]/10 text-[#0FA3B1]">
                <Bookmark className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1]">Your cookbook</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-[family:var(--font-display)] font-semibold text-[#121212]">
                  My Saved Recipes
                </h1>
                <p className="mt-2 text-sm text-[#5B5B5B]">
                  Keep your favorites close and revisit them anytime.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard">
                <Button className="bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Discover recipes
                </Button>
              </Link>
              <Link href="/pantry">
                <Button variant="outline" className="border-black/10 text-[#121212] hover:bg-white">
                  Check pantry
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#0FA3B1] animate-spin mb-6" />
            <p className="text-[#5B5B5B]">Loading your saved recipes...</p>
          </div>
        )}

        {!loading && recipes.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.documentId} recipe={recipe} variant="list" />
            ))}
          </div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-black/10 bg-white/80 p-12 text-center">
            <div className="bg-[#0FA3B1]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-[#0FA3B1]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#121212] mb-2">
              No saved recipes yet
            </h3>
            <p className="text-[#5B5B5B] mb-8 max-w-md mx-auto">
              Start exploring recipes and save your favorites to build your personal cookbook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white gap-2">
                  <ChefHat className="w-4 h-4" />
                  Explore recipes
                </Button>
              </Link>
              <Link href="/pantry">
                <Button variant="outline" className="border-black/10 text-[#121212] gap-2">
                  Check your pantry
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
