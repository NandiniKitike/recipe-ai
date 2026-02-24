import { auth, currentUser } from "@clerk/nextjs/server";

import React from 'react'
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const checkUser = async () => {
  const user = await currentUser()
  if (!user) {
    console.log("No user found")
    return null
  }
  if (!STRAPI_API_TOKEN) {
    console.log("No STRAPI_API_TOKEN found")
    return null
  }

  const { has } = await auth()
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free"
  try {
    const existingUserResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`
        },
        cache: "no-store"
      }
    )
    if (!existingUserResponse.ok) {
      const errorText = await existingUserResponse.text()
      return null
    }
    const existingUserData = await existingUserResponse.json()
    if (existingUserData.length > 0) {
      const existingUser = existingUserData[0];
      if (existingUser.subscriptionTier !== subscriptionTier) {
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

      return { ...existingUser, subscriptionTier }
    }
    const rolesResponse = await fetch(
      `${STRAPI_URL}/api/users-permissions/roles`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,

        }
      }
    )
    const rolesData = await rolesResponse.json();
    const authenticatedRole = rolesData.roles.find(
      (role) => role.type === "authenticated"
    );
    if (!authenticatedRole) {
      console.log("Authenticated role not found in Strapi")
      return null
    }
    const userData = {
      username:
        user.username || user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
      password: `clerk_managed_${user.id}_${Date.now()}`,
      confirmed: true,
      blocked: false,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      clerkId: user.id,
      subscriptionTier,
      role: authenticatedRole.id,
    };
    const newUserResponse = await fetch(`${STRAPI_URL}/api/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    if (!newUserResponse.ok) {
      const errorText = await newUserResponse.text()
      console.error("Error creating user in Strapi:", errorText)
      return null
    }
    const newUser = await newUserResponse.json()
    return { ...newUser, subscriptionTier }
  }
  catch (error) {
    console.error("Error checking user:", error)
    return null
  }

}
export default checkUser