/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    ChefHat,
    Loader2,
    Package,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import {
    getPantryItems,
    deletePantryItem,
    updatePantryItem,
} from "@/actions/pantry.actions";
import { toast } from "sonner";
import AddToPantryModal from "@/components/AddToPantryModal";
import PricingModal from "@/components/PricingModal";

export default function PantryPage() {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({ name: "", quantity: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        loading: loadingItems,
        data: itemsData,
        fn: fetchItems,
    } = useFetch(getPantryItems);

    const {
        loading: deleting,
        data: deleteData,
        fn: deleteItem,
    } = useFetch(deletePantryItem);

    const {
        loading: updating,
        data: updateData,
        fn: updateItem,
    } = useFetch(updatePantryItem);

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (itemsData?.success) {
            setItems(itemsData.items);
        }
    }, [itemsData]);

    useEffect(() => {
        if (deleteData?.success && !deleting) {
            toast.success("Item removed from pantry");
            fetchItems();
        }
    }, [deleteData]);

    useEffect(() => {
        if (updateData?.success) {
            toast.success("Item updated successfully");
            setEditingId(null);
            fetchItems();
        }
    }, [updateData]);

    const handleDelete = async (itemId) => {
        const formData = new FormData();
        formData.append("itemId", itemId);
        await deleteItem(formData);
    };

    const startEdit = (item) => {
        setEditingId(item.documentId);
        setEditValues({
            name: item.name,
            quantity: item.quantity,
        });
    };

    const saveEdit = async () => {
        const formData = new FormData();
        formData.append("itemId", editingId);
        formData.append("name", editValues.name);
        formData.append("quantity", editValues.quantity);
        await updateItem(formData);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({ name: "", quantity: "" });
    };

    const handleModalSuccess = () => {
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-[#F7F5F2] text-[#121212] pt-24 pb-16 px-4">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,163,177,0.12),_transparent_55%),radial-gradient(circle_at_90%_10%,_rgba(255,138,91,0.12),_transparent_50%)]" />

            <div className="container mx-auto max-w-6xl">
                <div className="rounded-[28px] border border-black/5 bg-white/80 p-8 shadow-[0_24px_60px_rgba(18,18,18,0.12)]">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0FA3B1]/10 text-[#0FA3B1]">
                                <Package className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1]">
                                    Pantry overview
                                </p>
                                <h1 className="mt-2 text-3xl md:text-4xl font-[family:var(--font-display)] font-semibold text-[#121212]">
                                    My Pantry
                                </h1>
                                <p className="mt-1 text-sm text-[#5B5B5B]">
                                    Keep your inventory tidy and unlock instant recipe ideas.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white"
                                size="lg"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Add to Pantry
                            </Button>
                            <Link href="/pantry/recipes">
                                <Button
                                    variant="outline"
                                    className="border-black/10 text-[#121212] hover:bg-white"
                                    size="lg"
                                >
                                    Browse recipes
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {itemsData?.scansLimit !== undefined && (
                        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm">
                            <Sparkles className="h-5 w-5 text-[#0FA3B1]" />
                            {itemsData.scansLimit === "unlimited" ? (
                                <span className="text-[#5B5B5B]">
                                    Unlimited AI scans enabled for your Pro plan.
                                </span>
                            ) : (
                                <PricingModal>
                                    <span className="cursor-pointer text-[#5B5B5B] hover:text-[#121212]">
                                        Upgrade to Pro for unlimited Pantry scans.
                                    </span>
                                </PricingModal>
                            )}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <Link href="/pantry/recipes" className="block mt-8">
                        <div className="rounded-[24px] border border-black/10 bg-white/80 p-6 hover:shadow-[0_25px_60px_rgba(18,18,18,0.12)] transition-all">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0FA3B1]/10 text-[#0FA3B1]">
                                    <ChefHat className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-[#121212]">
                                        What can I cook today?
                                    </h3>
                                    <p className="text-sm text-[#5B5B5B]">
                                        Get AI-powered recipe suggestions from your {items.length} ingredients.
                                    </p>
                                </div>
                                <Badge className="bg-black/5 text-[#121212]">{items.length} items</Badge>
                            </div>
                        </div>
                    </Link>
                )}

                {loadingItems && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-[#0FA3B1] animate-spin mb-4" />
                        <p className="text-[#5B5B5B]">Loading your pantry...</p>
                    </div>
                )}

                {!loadingItems && items.length > 0 && (
                    <div className="mt-10">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h2 className="text-2xl font-semibold text-[#121212]">Your ingredients</h2>
                            <Badge className="bg-black/5 text-[#121212]">
                                {items.length} {items.length === 1 ? "item" : "items"}
                            </Badge>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <div
                                    key={item.documentId}
                                    className="rounded-[20px] border border-black/10 bg-white/80 p-5 shadow-[0_18px_36px_rgba(18,18,18,0.1)]"
                                >
                                    {editingId === item.documentId ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={editValues.name}
                                                onChange={(e) =>
                                                    setEditValues({ ...editValues, name: e.target.value })
                                                }
                                                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#0FA3B1]"
                                                placeholder="Ingredient name"
                                            />
                                            <input
                                                type="text"
                                                value={editValues.quantity}
                                                onChange={(e) =>
                                                    setEditValues({
                                                        ...editValues,
                                                        quantity: e.target.value,
                                                    })
                                                }
                                                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#0FA3B1]"
                                                placeholder="Quantity"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={saveEdit}
                                                    disabled={updating}
                                                    className="flex-1 bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white"
                                                >
                                                    {updating ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Check className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={cancelEdit}
                                                    disabled={updating}
                                                    className="flex-1 border-black/10 text-[#121212] hover:bg-white"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-[#121212] mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-[#5B5B5B]">
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => startEdit(item)}
                                                        className="p-2 rounded-xl border border-transparent hover:border-black/10 hover:bg-black/5 transition-all text-[#6B6B6B] hover:text-[#121212]"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.documentId)}
                                                        disabled={deleting}
                                                        className="p-2 rounded-xl border border-transparent hover:border-black/10 hover:bg-black/5 transition-all text-[#6B6B6B] hover:text-[#E4584F]"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-xs text-[#8B8B8B]">
                                                Added {new Date(item.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!loadingItems && items.length === 0 && (
                    <div className="mt-10 rounded-[28px] border border-dashed border-black/10 bg-white/80 p-12 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0FA3B1]/10 text-[#0FA3B1]">
                            <Package className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#121212] mb-2">
                            Your pantry is empty
                        </h3>
                        <p className="text-[#5B5B5B] mb-8 max-w-md mx-auto">
                            Start by adding ingredients so we can build recipes that fit your kitchen.
                        </p>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white"
                            size="lg"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Add your first item
                        </Button>
                    </div>
                )}
            </div>

            <AddToPantryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleModalSuccess}
            />
        </div>
    );
}
