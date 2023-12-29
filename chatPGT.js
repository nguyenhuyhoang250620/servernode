var OpenAI = require('openai')
// const openai = new OpenAI({apiKey:'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'});

const openai = new OpenAI();

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: "The quick brown fox jumped over the lazy dog",
    encoding_format: "float",
  });

  console.log(embedding);
}

main();