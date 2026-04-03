import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const PricingSection = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-16">
                <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1] font-semibold">
                    Pricing
                </p>
                <h2 className="mt-4 text-4xl md:text-5xl font-[family:var(--font-display)] font-semibold text-[#121212]">
                    Simple, flexible plans
                </h2>
                <p className="mt-3 text-lg text-[#5B5B5B]">
                    Start for free, then upgrade when you're ready for pro-level tools.
                </p>
            </div>
            <div>
                <PricingTable
                    checkoutProps={{
                        appearance: {
                            elements: {
                                drawerRoot: {
                                    zIndex: 2000,
                                }
                            }
                        }
                    }} />
            </div>
        </div>
    )
}

export default PricingSection
