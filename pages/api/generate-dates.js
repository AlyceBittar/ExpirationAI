import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { foodItem, location } = req.body;

  const prompt = generatePrompt(foodItem, location);
  console.log(prompt);

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(foodItem, location) {
    return `Only give me the number of days it would take item: ${foodItem}$ to expire when stored in location: ${location}$ 
   
    Print results in the following format on different lines and set the recommendation to how it should be stored 
    Days: 
    Recommendation: `;
}