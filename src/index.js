import { JolocomLib } from 'jolocom-lib';

function verifySignature() {
    const content = "Jolocom builds global infrastructure to support decentralized digital identity management.";
    const did = "did:jolo:83cbdba6d3ecdb9303e219322a034d4f8608168f110dfbd97f94d74c3fca8818";
    const signedDigest = "09db722dea043cd088bc2a2c2a5ed139d7fb1e0e2c3b2dd587ea9ed99ee9d9354c52c5f80e38df12b20ef7dcd1f398f1a38e5f41dbc7bcfeda8a5fa51bda8a57";

    const registry = JolocomLib.registries.jolocom.create()
    registry.resolve(did)
        .then((remoteId) => {
            const publicKeyHex = remoteId.publicKeySection[0].publicKeyHex;
            const hash = crypto.createHash('sha256').update(content).digest('hex');
            const digest = Buffer.from(hash, 'hex');
            const verified = SoftwareKeyProvider.verify(digest, Buffer.from(publicKeyHex, "hex"), Buffer.from(signedDigest, 'hex'));
            console.log("verified - ", verified);

        })
        .catch((err) => {
            console.log("error: ", err);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("verifySignature").addEventListener("click", verifySignature);
});

