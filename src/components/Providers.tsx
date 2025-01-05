"use client"

import React, { ReactNode } from "react"
import { ImageKitProvider } from "imagekitio-next"
import { SessionProvider } from "next-auth/react"
import { envVariables } from "@/lib/validation/env"

const urlEndpoint = envVariables.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
const publicKey = envVariables.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY

export default function Providers({ children }: { children: ReactNode }) {
    const authenticator = async () => {
        try {
            const res = await fetch("/api/imagekitio-auth")
            if (!res.ok) {
                throw new Error("Failed to authenticate")
            }

            return res.json()
        } catch (error) {
            throw error
        }
    }

    return (
        <SessionProvider refetchInterval={5 * 60}>
            <ImageKitProvider
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}
            >
                {children}
            </ImageKitProvider>
        </SessionProvider>
    )
}