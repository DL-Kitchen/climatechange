import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

  // First OpenAI API request related to how your daily routine would be altered by climate change
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.morning, req.body.commute, req.body.friends),
    temperature: 1.0,
    max_tokens:1200,
  });

  // Can process this later to remove the 1., 2., etc
  const rawText = completion.data.choices[0].text;

  const q1 = rawText.split("1.")[1].split("2.")[0];
  const q2 = rawText.split("2.")[1].split("3.")[0];
  const q3 = rawText.split("3.")[1].split("4.")[0];

  const finalText = q1 + "\n" + q2 + "\n" + q3;

  // Second OpenAI API request related to sustainable products
  const products = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt2(req.body.morning, req.body.commute, req.body.friends),
    temperature: 1.0,
    max_tokens:1200,
  });

  const rawText2 = products.data.choices[0].text;

  res.status(200).json({result:{ q1:q1, q2:q2, q3:q3 , q4:rawText2 }});

}

// Function related to how your daily routine would be altered by climate change
function generatePrompt(morning, commute, friends) {
  return `Rewrite and expand the following paragraphs after the temperature raises 3 degrees celsius as a grave consequence of climate change:\n\n1.${morning}\n\n2.${commute}\n\n3.${friends}`;
}

// Function related to sustainable products
function generatePrompt2(morning, commute, friends) {
  return `Recommend a brand and model of a sustainable product that may be used during each of the following folowing activities:
  \n\n1.${morning}\n\n2.${commute}\n\n3.${friends}
  Confirm if the brand and model is carbon neutral or not and explain how it avoids climate change. 
  Which are its unique climate protection features and which are its general sustainable features?
  `;
}
