"use client";

import React from 'react'
import {
    ThirdwebProvider,
    ConnectWallet,
    metamaskWallet,
    walletConnect,
    safeWallet,
    embeddedWallet,
    en,
} from "@thirdweb-dev/react";


const Connect = () => {
    return (<ThirdwebProvider
        activeChain="mumbai"
        clientId="4c17515aec091ab662bb48b3026bb9c3"
        locale={en()}
        supportedWallets={[
            metamaskWallet(),
            walletConnect(),
            safeWallet({
                personalWallets: [
                    metamaskWallet(),
                    walletConnect(),
                    embeddedWallet({
                        auth: {
                            options: [
                                "apple",
                                "facebook",
                                "google",
                                "email",
                            ],
                        },
                    }),
                ],
            }),
            embeddedWallet({
                auth: {
                    options: [
                        "apple",
                        "facebook",
                        "google",
                        "email",
                    ],
                },
            }),
        ]}
    >
        <ConnectWallet
            theme={"dark"}
            switchToActiveChain={true}
            modalSize={"wide"}
        />
    </ThirdwebProvider>)
}
export default Connect
