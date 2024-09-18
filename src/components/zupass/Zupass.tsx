import React, { useState } from "react";
import { zuAuthPopup } from "@pcd/zuauth";
import { ZKEdDSAEventTicketPCDPackage } from "@pcd/zk-eddsa-event-ticket-pcd";

const Zupass = () => {
    const [email, setEmail] = useState();

    const zuAuthPopupConfig = {
        fieldsToReveal: {
            revealAttendeeEmail: true,
            revealAttendeeName: true,
            revealEventId: true,
            // revealProductId: "cc9e3650-c29b-4629-b275-6b34fc70b2f9",
            revealProductId: true
        },
        // @ts-ignore
        watermark: 12345n,
        config: [
            {
                "pcdType": "eddsa-ticket-pcd",
                "publicKey": [
                    "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
                    "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
                ],
                "eventId": "11da9755-74c9-43a9-9305-d1285bb9c8f4",
                "eventName": "ZuThailand",
                "productId": "c4d66119-6ca8-4c0f-b591-9f932d8c1e9e",
                "productName": "GA"
            }
        ]
    }


    async function getZupassKey() {
        // @ts-ignore
        const result = await zuAuthPopup(zuAuthPopupConfig);
        console.log("result ====>", result)
        if (result.type === "pcd") {
            try {
                const serializedPCD = JSON.parse(result.pcdStr).pcd;
                const pcd = await ZKEdDSAEventTicketPCDPackage.deserialize(serializedPCD);
                console.log("The user's email address is " + pcd.claim.partialTicket.attendeeEmail);
                setEmail(pcd.claim.partialTicket.attendeeEmail);
            } catch (e) {
                console.log("e ====>", e);
            }
        }
    }

    return (
        <div>
            <h1>Zupass</h1>
            <button onClick={() => getZupassKey()}>获取邮箱</button>
            <div>email: {email}</div>
        </div>
    );
}

export default Zupass;