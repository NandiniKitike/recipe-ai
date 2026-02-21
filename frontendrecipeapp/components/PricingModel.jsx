"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import PricingSection from './PricingSection'

const PricingModel=({subscriptionTier, children})=> {
const [isOpen, setIsOpen] = useState(false)
const canOpen = subscriptionTier === "free"
  return (
    <Dialog open={isOpen} onOpenChange={canOpen ? setIsOpen : undefined}>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
      <DialogTitle/>
  <PricingSection/>
  </DialogContent>
</Dialog>
  )
}

export default PricingModel
