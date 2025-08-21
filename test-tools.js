import { getAgentTools } from './build/tools.js';

console.log('Testing generated tools...');

const tools = getAgentTools();
console.log(`\nFound ${Object.keys(tools).length} tools:`);

for (const [toolName, metadata] of Object.entries(tools)) {
  console.log(`\n--- Tool: ${toolName} ---`);
  console.log(`Name: ${metadata.frontMatter.name}`);
  console.log(`Description: ${metadata.frontMatter.description}`);
  console.log(`Trigger: ${metadata.frontMatter.trigger || 'N/A'}`);
  console.log(`Content length: ${metadata.content.length} characters`);
}

console.log('\n✅ All tools loaded successfully!');
