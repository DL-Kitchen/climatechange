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
    temperature: 0.1,
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
  return `Identify the category for each of the following activities and suggest a brand and model of a sustainable product for that category.
  Recommend a brand and model of a sustainable product that can be used during that activity.
  Only suggest brands and models that are carbon neutral.

1. I get out of bed, brush my teeth, and read the latest articles on climate change

2. I go to my job by car.

3. I like to participate in OpenAI hackathons with friends.

For your morning activities consider using this product: Dr Best Greenclean toothbrush. 

For your work/school activities consider using this product: Tesla Model S.

For you activites with friends, consider using this product:The MacBook Air is a carbon neutral computer.

1. The first thing I do in the morning is to select the clothes I will use, then I dress up.

2. I go to my walking, I use confortable running shoes.

3. I like to drink a beer with friends.

For your morning activities consider using this product: Clothing company, Patagonia, is always on the top of eco-friendly.

For your work/school activities consider using this product: Allbirds running shoes, Allbirds is already a 100% carbon neutral business.

For you activites with friends, consider using this product: New Belgium Brewing Company is the fourth-largest craft brewery in the US and has been committed to being eco-friendly since its founding in 1991.

1.${morning}\n\n

2.${commute}\n\n

3.${friends}\n\n
  `;
}
