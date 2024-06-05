import { readFileSync, existsSync } from "fs";
import { keyStores, connect } from 'near-api-js';

const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore('/Users/peter/.near-credentials');
const connectionConfig = {
  networkId: "mainnet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.mainnet.near.org",
};

const nearConnection = await connect(connectionConfig);

// Define the JSON file and user variables
const jsonFile = "socialdb-structured.json";
const user = "petersalomonsen.near"; // TODO peter

// Check if the JSON file exists
if (!existsSync(jsonFile)) {
  console.error(`JSON file '${jsonFile}' not found!`);
  process.exit(1);
}

// Read and parse the JSON array from the file
const rawData = readFileSync(jsonFile);
const objects = JSON.parse(rawData);


// Iterate over each object in the array
const runCommands = async () => {
  for (const obj of objects) {
    if (['testing123', 'devhub-test', 'education'].includes(obj.handle)) {
      continue;
    }


    // Construct the command with the JSON object as an argument
    /*const cmd = `near contract call-function as-transaction devhub.near set_community_socialdb json-args '${JSON.stringify(
      obj
    )}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as ${user} network-config mainnet sign-with-keychain send`;*/

    const alreadyImported = [
      'developer-dao next-steps-for-mynearwallet-a-call-for-maintainers-2030',
      'developer-dao near-dev-hub-new-look-unwavering-mission-2067',
      'near-campus university-of-california-san-diego-2507',
      'devrel quick-guide-to-building-ethereum-apps-on-the-bos-2524',
      'devrel getting-started-on-near-s-bos-as-a-web2-developer-2553',
      'zero-knowledge community-call-8-recap-2656',
      'devrel webfusion-lagos-2023-bridging-the-gap-between-web2-and-web3-2710',
      'protocol protocol-work-group-call-7-2766',
      'protocol protocol-work-group-call-9-2767',
      'protocol protocol-community-group-2-2806',
      'protocol protocol-community-group-3-2807',
      'protocol protocol-work-group-5-2808',
      'protocol protocol-work-group-call-6-2809',
      'protocol protocol-work-group-call-7-2810',
      'zero-knowledge community-call-1-recap-2846',
      'zero-knowledge community-call-2-recap-2847',
      'zero-knowledge community-call-3-recap-2848',
      'zero-knowledge community-call-4-recap-2849',
      'zero-knowledge community-call-5-recap-2850',
      'zero-knowledge community-call-6-recap-2851',
      'devhub-platform devhub-2023-rebranding-and-transforming-developer-experience-2991',
      'challenges near-africa-social-challenge-2992',
      'challenges -devhub-monthly-challenges-coding-challenge-2993',
      'challenges crypto-heroes-marma-j-gaming-challenge-3018',
      'challenges nada-bot-social-challenge-3019',
      'challenges potlock-donation-challenge-3020',
      'devrel understanding-transactions-on-the-near-protocol-explorer-3034',
      'challenges harvest-moon-play-to-earn-3040',
      'zero-knowledge community-call-7-recap-3081',
      'zero-knowledge community-call-9-recap-3082',
      'neardevnews near-dev-news-2-3192',
      'neardevnews near-dev-news-3-3193',
      'neardevnews near-dev-news-12-3230',
      'neardevnews near-dev-news-11-3231',
      'neardevnews near-dev-news-10-3232',
      'neardevnews near-dev-news-9-3233',
      'neardevnews -near-dev-news-7-3235',
      'neardevnews near-dev-news-6-3237',
      'neardevnews near-dev-news-8-3238',
      'devrel devhub-at-ethseoul-2024-3241',
      'protocol protocol-work-group-call-8-3272',
      'contract-standards -community-call-may-25th-2023-3273',
      'contract-standards -working-group-call-june-30th-2023-3274',
      'documentation documentation-community-call-8-3281',
      'documentation documentation-community-call-9-3282',
      'contract-standards contract-standards-wg-call-5-3283',
      'zero-knowledge community-call-10-recap-3287',
      'chain-abstraction chain-abstraction-community-calls-1-3288',
      'devrel rustling-up-efficiency-serialization-strategies-for-merkle-trees-3289',
      'protocol protocol-work-group-call-10-3299'
    ]

    if (alreadyImported.includes(`${obj.handle} ${Object.keys(obj.data.blog)[0]}`)) {
      continue;
    }

    console.log(obj.handle, Object.keys(obj.data.blog)[0]);
    const account = await nearConnection.account('petersalomonsen.near');
    const result = await account.functionCall({ contractId: 'devhub.near', methodName: 'set_community_socialdb', args: obj, gas: "100000000000000" });
    console.log(JSON.stringify(result.status));
  }
};

await runCommands();

