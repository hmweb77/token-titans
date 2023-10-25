const { Client, Bank, FT } = require("coreum-js");


// Replace the issuerMnemonic with your own. You can generate it at https://docs.coreum.dev/tools-ecosystem/faucet.html.
// Caution: do not hardcode your production mnemonic here, otherwise your funds might be stolen.
const issuerMnemonic =
    "spend build hurdle notable lemon involve summer pudding sadness fit excite canyon flock relief unfold upgrade sure film alley chest census quiz ivory birth";

// If you are using a mnemonic from this tutorial you should provide another subunit and symbol,
// since tokens within one account should be unique.
const subunit = "tokentitans"
const symbol =  "TTD"

const network = "testnet";


async function main() {
    try {

// INIT SECTION

        // Init the client and target the testnet network:
        const coreum = new Client({ network:  network}); // Other values are "devnet" and "mainnet"

        // Access the private key of the mnemonic.
        await coreum.connectWithMnemonic(issuerMnemonic);

        // Let's store the mnemonic bank address to the variable(the Client instance saves the address of the connected account for easy access).
        const issuer = coreum.address;

        // Let's define the modules we are going to use:
        const { bank, ft } = coreum.queryClients;

// ISSUING ASSET-FT SECTION

        const issueFtMsg = FT.Issue({
            issuer: issuer,
            symbol: symbol,
            subunit: subunit,
            precision: "6",
            initialAmount: "100000000",
            description: "Token Titans SocialFi token",
            // To get valid values for the features go inside "Issue" object and then click at "token" within "./asset/ft/v1/token" path.
            features: ["minting"],
        })
        console.log("issueFtMsg: ", issueFtMsg);

        // Let's broadcast our issueFtMsg message and check the response:
        const issueBroadcastResponse = await coreum.sendTx([issueFtMsg]);
        console.log("issueBroadcastResponse: ", issueBroadcastResponse);

        // FT denom is generated on token's creation and consist of subunit and issuer address joined with dash.
        // Let's export it for further using:
        const ftDenom = `${subunit}-${issuer}`;

        // Let's fetch the details of created tokens from the chain:
        const tokenDetails = await ft.token(ftDenom);
        console.log(`tokenDetails: `, tokenDetails);

} catch (err){
    console.log(err)
}
}


main();