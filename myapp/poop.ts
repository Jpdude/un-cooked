import { Ollama } from "ollama";

const ollama = new Ollama();

const response = await ollama.chat({
  model: "gpt-oss:120b-cloud",
  messages: [{ role: "user", content: "Explain quantum computing" }],
  stream: false,
  format:"json",
});

console.log(response.message.content)
// import { Ollama } from "ollama";

// const ollama = new Ollama();

// const response = await ollama.chat({
//   model: "gpt-oss:120b-cloud",
//   messages: [{ role: "user", content: "Explain quantum computing" }],
//   stream: true,
// });

// for await (const part of response) {
//   process.stdout.write(part.message.content);
// }