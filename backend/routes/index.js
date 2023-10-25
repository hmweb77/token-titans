const express = require("express");
const router = express.Router();
const { Client, Bank, FT } = require("coreum-js");
const str2ab = require('str2ab');



router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.post('/create-profile', async (req, res, next) => {

  try {
  const {userAddress, username} = req.body;

// If you are using a mnemonic from this tutorial you should provide another subunit and symbol,
// since tokens within one account should be unique.
const subunit = "tokentitans"
const symbol =  "TTD"

// We need another address to send tokens to. You can replace it with your own:
const receiver = userAddress;

// INIT SECTION

        // Init the client and target the testnet network:
        const coreum = new Client({ network:  "testnet"}); // Other values are "devnet" and "mainnet"
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
        const receiverBalances = await bank.allBalances(userAddress);
        console.log(`receiverBalances: `, receiverBalances);

        const exec_msg = {create_profile : {username}};

// here we replace "receive_airdrop" with our function name and pass the respective arguments in the {} if necessary 

    console.log("execution message:", exec_msg)

    const msg_8uintArray = str2ab(JSON.stringify(exec_msg));

      const call_contract = CosmWasm.ExecuteContract({
        sender: userAddress,
        contract,
        funds: [],
        msg: msg_8uintArray,
      });

      console.log("calling contract fn here:", call_contract)

      const contractBroadcastResponse = await coreum.sendTx([call_contract]);
      
      console.log("broadcast response:", contractBroadcastResponse);


    res.status(200).json({ contractBroadcastResponse: contractBroadcastResponse, Message: `5 Tokens were sent to ${receiver}. Your Balance of TTD tokens is now ${receiverBalances}`})

  } catch(err){
    console.log("error occured in backend", err);
  }
    })

module.exports = router;