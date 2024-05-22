import { readFileSync, existsSync } from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Define the JSON file and user variables
const jsonFile = "socialdb-structured.json";
const user = "thomasguntenaar.near"; // TODO peter

// Check if the JSON file exists
if (!existsSync(jsonFile)) {
  console.error(`JSON file '${jsonFile}' not found!`);
  process.exit(1);
}

// Read and parse the JSON array from the file
const rawData = readFileSync(jsonFile);
const objects = JSON.parse(rawData);

// Function to execute a command
const executeCommand = async (cmd) => {
  try {
    const { stdout, stderr } = await execAsync(cmd);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
  }
};

// Iterate over each object in the array
const runCommands = async () => {
  for (const obj of objects) {
    // Construct the command with the JSON object as an argument
    const cmd = `near contract call-function as-transaction devhub.near set_community_socialdb json-args '${JSON.stringify(
      obj
    )}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as ${user} network-config mainnet sign-with-keychain send`;

    // Execute the command
    await executeCommand(cmd);
  }
};

runCommands();
