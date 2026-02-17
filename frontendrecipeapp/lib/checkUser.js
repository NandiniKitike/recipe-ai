import { currentUser } from '@clerk/nextjs/dist/types/server'
import React from 'react'
const STRAPI_URL= 
process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const checkUser = async () => {
    const user = await currentUser()
  if(!user){
    console.log("No user found")
    return null
  }
  if(!STRAPI_API_TOKEN){
    console.log("No STRAPI_API_TOKEN found")
    return null
  }
  const subscriptionTier= "free"
  try{
const existingUserResponse = await fetch(
    `${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,
    {
        headers:{
            Authorization: `Bearer ${STRAPI_API_TOKEN}`
        },
ccache: "no-store"
    }
)
if(!existingUserResponse.ok){
    const errorText = await existingUserResponse.text()
    console.error("Error fetching user from Strapi:", errorText)
    return null
}
const existingUserData = await existingUserResponse.json()
if(existingUserData.length > 0){
  const existingUser = existingUserData[0]  ;
  if(existingUser.subscriptionTier !== subscriptionTier){
await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    subscriptionTier
  }),
});
  }

  return {...existingUser, subscriptionTier}
  }
  const releresponse = await fetch(
    `${STRAPI_URL}/api/users-permissions/roles`,
    {
        headers:{
            Authorization: 
        }
    }
  )
}
  }catch(error){
    console.error("Error checking user:", error)
    return null
  }


