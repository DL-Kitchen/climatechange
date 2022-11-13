import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai1 = new OpenAIApi(configuration);

const openai2 = new OpenAIApi(configuration);

export default async function (req, res) {

  // First OpenAI API request related to how your daily routine would be altered by climate change
  const completion = await openai1.createCompletion({
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
  const products = await openai2.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt2(req.body.morning, req.body.commute, req.body.friends),
    temperature: 0.0,
    max_tokens:1200,
  });

  const rawText2 = products.data.choices[0].text;

  const p1 = rawText2.split("1.")[1].split("2.")[0];
  const p2 = rawText2.split("2.")[1].split("3.")[0];
  const p3 = rawText2.split("3.")[1].split("4.")[0];

  res.status(200).json({result:{ q1:q1, q2:q2, q3:q3 , p1:p1, p2:p2, p3:p3}});

}

// Function related to how your daily routine would be altered by climate change
function generatePrompt(morning, commute, friends) {
  return `Rewrite and expand the following paragraphs after the temperature raises as a grave consequence of climate change and global warming:

  1. First thing I do in the morning is some yoga. 

  2. I go to the school riding my bicyle. 
  
  3. I like to play videogames with friends. 


  With the temperature rising as a result of climate change, the first thing I do in the morning is some yoga to try and stay calm.

  I go to school riding my bicycle, trying to do my part to reduce emissions.
  
  I like to play videogames with friends, but it's hard to enjoy myself when I know the world is in such dire straits.

	
	1. The first thing I do in the morning is brushing my teeth. becomes...

	2. I go to the school riding my skateboard. becomes...

	3. I like to play video games with friends. becomes...


	The first thing I do in the morning is brush my teeth, but lately the water has been too hot to use. This is just one of the many ways that climate change is affecting our everyday lives.

	I go to the school riding my skateboard, but the heat has been so unbearable that I can't stand to be outside for more than a few minutes.

	I like to play video games with friends, but it's hard to concentrate when the electricity keeps going out because of the heat waves.


	1. I get out of bed, brush my teeth, and read the latest articles on climate change.

	2. I usually ride my bike to work across town to work at the OpenAI Factory. 

	3. My friends and I like to go ice skating at the local pond. 


	I get out of bed, brush my teeth, and read the latest articles on climate change. The temperature rise as a grave consequence of climate change and global warming is something that is on my mind a lot lately. I try to do my part by recycling and riding my bike to work, but it feels like there is so much more that needs to be done.

	I usually ride my bike to work across town to work at the OpenAI Factory. With the rising temperatures, it is becoming harder and harder to bike to work. I am lucky that my job is only a few miles away, but I know that there are many people who are not as lucky.

	My friends and I like to go ice skating at the local pond. With the rising temperatures, the pond has not been frozen over for the past few winters. We have had to find other ways to entertain ourselves.
  
  1.${morning}
  
  2.${commute}
  
  3.${friends}`;
}

// Function related to sustainable products
function generatePrompt2(morning, commute, friends) {
  return `Identify the category for each of the following activities and suggest a brand and model of a sustainable product for that category.
  Recommend a brand and model of a sustainable product that can be used during that activity.
  Only suggest brands and models that are carbon neutral.


1. I get out of bed, brush my teeth, and read the latest articles on climate change

2. I go to my job by car.

3. I like to participate in OpenAI hackathons with friends.

1. For your morning activities consider using this product: Dr Best Greenclean toothbrush

2. For your work/school activities consider using this product: Tesla Model S because it is an electric car and pollutes less

3. For you activites with friends, consider using this product: The MacBook Air, as it is a carbon neutral computer.


1. The first thing I do in the morning is to select the clothes I will use, then I dress up.

2. I go to my job walking, I use confortable running shoes.

3. I like to drink a beer with friends.

1. For your morning activities consider using this product: Patagonia is an eco-friendly clothing company to buy clothes

2. For your work/school activities consider using this product: Allbirds running shoes, Allbirds is already a 100% carbon neutral business.

3. For you activites with friends, consider using this product: New Belgium Brewing Company is the fourth-largest craft brewery in the US and has been committed to being eco-friendly since its founding in 1991.


1.${morning}\n\n

2.${commute}\n\n

3.${friends}\n\n
  `;
}


