#!/usr/bin/env node
/**
 * Test the agent with a custom prompt
 */
import { getLLMClient } from "./src/llm/client.js";
import { getConfig } from "./src/config/index.js";
import chalk from "chalk";

async function main() {
  const config = getConfig();
  
  if (!config.openrouterApiKey) {
    console.log(chalk.red("Error: OPENROUTER_API_KEY not set in .env"));
    process.exit(1);
  }

  const prompt = process.argv.slice(2).join(" ");
  
  if (!prompt) {
    console.log(chalk.yellow("Usage: node test-prompt.js <your prompt>"));
    console.log(chalk.gray("\nExamples:"));
    console.log(chalk.gray("  node test-prompt.js Build me a todo app"));
    console.log(chalk.gray("  node test-prompt.js Create a landing page for my coffee shop"));
    console.log(chalk.gray("  node test-prompt.js Write a tweet about AI agents"));
    process.exit(1);
  }

  console.log(chalk.cyan("\n🤖 Processing prompt...\n"));
  console.log(chalk.gray(`Prompt: "${prompt}"\n`));

  const llm = getLLMClient();

  try {
    const result = await llm.generate({
      prompt,
      systemPrompt: `You are an elite AI agent. Your task is to deliver outstanding work.

PROJECT BUILDING RULES:
- When asked to build ANYTHING (website, app, tool, game, landing page) - use create_file for each file, then finalize_project
- Create complete, working code - not stubs
- Make it visually appealing and professional

Text Responses:
- For writing, analysis, answers - respond directly with well-crafted text`,
      tools: true,
    });

    console.log(chalk.green("\n✅ Response:\n"));
    console.log(result.text);

    if (result.projectBuild?.success) {
      console.log(chalk.cyan("\n📦 Project built:"));
      console.log(chalk.gray(`  Files: ${result.projectBuild.files.join(", ")}`));
      console.log(chalk.gray(`  Zip: ${result.projectBuild.zipPath}`));
    }
  } catch (error) {
    console.log(chalk.red("\n❌ Error:"), error.message);
  }
}

main();
