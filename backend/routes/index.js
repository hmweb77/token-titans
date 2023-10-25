const express = require("express");
const router = express.Router();
const { Client, Bank, FT } = require("coreum-js");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.post('/new-user', async (req, res, next) => {
  const {userAddress} = req;

// If you are using a mnemonic from this tutorial you should provide another subunit and symbol,
// since tokens within one account should be unique.
const subunit = "tokentitans"
const symbol =  "TTD"


// We need another address to send tokens to. You can replace it with your own:
const receiver = userAddress;

// INIT SECTION

        // Init the client and target the testnet network:
        const coreum = new Client({ network:  network}); // Other values are "devnet" and "mainnet"
        const issuerMnemonic ="spend build hurdle notable lemon involve summer pudding sadness fit excite canyon flock relief unfold upgrade sure film alley chest census quiz ivory birth";


        // Access the private key of the mnemonic.
        await coreum.connectWithMnemonic(issuerMnemonic);

        // Let's store the mnemonic bank address to the variable(the Client instance saves the address of the connected account for easy access).
        const issuer = coreum.address;

        // Assign the correct ftDenom to fetch
        const ftDenom = `${subunit}-${issuer}`;

        // Let's define the modules we are going to use:
        const { bank, ft } = coreum.queryClients;


// BANK SEND SECTION

        // Let's initiate the bank send transaction:
        const bankSendMsg = Bank.Send({
            fromAddress: issuer,
            toAddress: receiver,
            amount: [
                {
                    denom: ftDenom,
                    // amount is defined in subunits, taking the precision into an account we are sending 1MYFT token
                    amount: "5000000",
                },
            ],
        });
        console.log("bankSendMsg: ", bankSendMsg);

        const bankSendBroadcastResponse = await coreum.sendTx([bankSendMsg]);
        console.log("bankSendBroadcastResponse: ", bankSendBroadcastResponse);

        // Let's check the receiver's balance. You should see your tokens there:
        const receiverBalances = await bank.allBalances(receiver);
        console.log(`receiverBalances: `, receiverBalances);
        res.json(`5 Tokens were sent to ${receiver}. Your Balance of TTD tokens is now ${receiverBalances}`);
    })

module.exports = router;