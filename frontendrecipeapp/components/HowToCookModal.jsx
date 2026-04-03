/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HowToCookModal() {
    const router = useRouter();
    const [recipeName, setRecipeName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recipeName.trim()) {
            toast.error("Please enter a recipe name");
            return;
        }

        router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
        handleOpenChange(false);
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
        if (!open) {
            setRecipeName(""); // Reset input when closing
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button className="hover:text-[#0FA3B1] transition-colors flex items-center gap-1.5 text-sm font-medium text-[#5B5B5B]">
                    <ChefHat className="w-4 h-4" />
                    How to Cook?
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg rounded-2xl border border-black/10 bg-white/95 shadow-[0_24px_60px_rgba(18,18,18,0.14)]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2 text-[#121212]">
                        <ChefHat className="w-6 h-6 text-[#0FA3B1]" />
                        How to Cook?
                    </DialogTitle>
                    <DialogDescription className="text-[#5B5B5B]">
                        Enter any recipe name and our AI chef will guide you through the
                        cooking process
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    {/* Recipe Input */}
                    <div>
                        <label className="block text-sm font-medium text-[#5B5B5B] mb-2">
                            What would you like to cook?
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                placeholder="e.g., Chicken Biryani, Chocolate Cake, Pasta Carbonara"
                                className="w-full px-4 py-3 pr-12 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0FA3B1] text-[#121212] placeholder:text-[#8B8B8B]"
                                autoFocus
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B8B8B]" />
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="bg-[#F7F5F2] rounded-xl p-4 border border-black/10">
                        <h4 className="text-sm font-semibold text-[#121212] mb-2">
                            Tip: Try these
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {["Butter Chicken", "Chocolate Brownies", "Caesar Salad"].map(
                                (example) => (
                                    <button
                                        key={example}
                                        type="button"
                                        onClick={() => setRecipeName(example)}
                                        className="px-3 py-1 bg-white text-[#0FA3B1] border border-[#0FA3B1]/30 rounded-full text-sm hover:bg-[#0FA3B1]/10 transition-colors"
                                    >
                                        {example}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={!recipeName.trim()}
                        className="flex-1 w-full bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white h-12"
                    >
                        <ChefHat className="w-5 h-5 mr-2" />
                        Get Recipe
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
