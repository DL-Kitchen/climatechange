import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.morning, req.body.commute, req.body.friends),
    temperature: 0.6,
    max_tokens:1200,
    temperature:0.5,
  });

  // Can process this later to remove the 1., 2., etc
  const rawText = completion.data.choices[0].text;

  res.status(200).json({ result: rawText });
}

function generatePrompt(morning, commute, friends) {
  return `Rewrite the following paragraphs after the temperature raises 3 degrees celsius as a grave consequence of climate change:\n\n1.${morning}\n\n2.${commute}\n\n3.${friends}`;
}
