"use client"
import AddToPantryModal from "@/components/AddToPantryModal"
import { Button } from "@/components/ui/button"
import { Package, Plus } from "lucide-react"
import React, { useState } from "react"
const PantryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [items, setItems] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [edutValues, setEditValues] = useState({ name: "", quantity: "" })

    const handleModalSuccess = () => {
        setIsModalOpen(false)
    }
    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-16">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Package className="w-16 h-16 text-orange-600" />
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                                    My Pantry
                                </h1>
                                <p className="text-stone-600 font-light">
                                    Manage your ingredients and plan your meals
                                </p>

                            </div>

                        </div>
                        <Button onClick={() => setIsModalOpen(true)} className="hidden md:flex bg-orange-600 hover:bg-orange-700" size="lg">
                            <Plus className="w-5 h-5" />Add to Pantry
                        </Button>
                    </div>
                </div>
                {/* quick action card find recipes */}
                {/* Loaidng state */}
                {/* Pantey items grid                 */}
                {/* empty state */}
            </div>
            {/* add to pantry modal */}

            <AddToPantryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleModalSuccess} />
        </div>
    )
}
export default PantryPage