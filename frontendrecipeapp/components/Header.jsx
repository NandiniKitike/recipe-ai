import React from "react";
import { Button } from "./ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";

export default async function Header() {
    const user = await checkUser();

    return (
        <header className="fixed top-0 w-full border-b border-black/5 bg-[#F7F5F2]/90 backdrop-blur-md z-50 supports-backdrop-filter:bg-[#F7F5F2]/80">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href={user ? "/dashboard" : "/"}
                    className="flex items-center gap-2 group"
                >
                    <Image
                        src="/logo.png"
                        alt="Servd Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                    />
                    <span className="text-lg font-semibold text-[#121212] tracking-tight font-[family:var(--font-display)]">
                        Servd
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#5B5B5B]">
                    <Link
                        href="/recipes"
                        className="hover:text-[#0FA3B1] transition-colors flex gap-1.5 items-center"
                    >
                        <Cookie className="w-4 h-4" />
                        My Recipes
                    </Link>
                    <Link
                        href="/pantry"
                        className="hover:text-[#0FA3B1] transition-colors flex gap-1.5 items-center"
                    >
                        <Refrigerator className="w-4 h-4" />
                        My Pantry
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <HowToCookModal />

                    <SignedIn>
                        {user && (
                            <PricingModal subscriptionTier={user.subscriptionTier}>
                                <Badge
                                    variant="outline"
                                    className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${user.subscriptionTier === "pro"
                                            ? "bg-[#121212] text-white border-none shadow-sm"
                                            : "bg-white text-[#5B5B5B] border-black/10 cursor-pointer hover:bg-white/80"
                                        }`}
                                >
                                    <Sparkles
                                        className={`h-3 w-3 ${user.subscriptionTier === "pro"
                                                ? "text-white"
                                                : "text-[#5B5B5B]"
                                            }`}
                                    />
                                    <span>
                                        {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                                    </span>
                                </Badge>
                            </PricingModal>
                        )}

                        <UserDropdown />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button
                                variant="ghost"
                                className="text-[#5B5B5B] hover:text-[#0FA3B1] hover:bg-white font-medium"
                            >
                                Sign In
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button variant="primary" className="rounded-full px-6 bg-[#0FA3B1] hover:bg-[#0D8F9B]">
                                Get Started
                            </Button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
}
