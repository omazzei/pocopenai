import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const vehicle = req.body.vehicle || '';
  if (vehicle.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Merci d'entrer un modèle de véhicule",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(vehicle),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(vehicle) {
  const capitalizedVehicle =
  vehicle[0].toUpperCase() + vehicle.slice(1).toLowerCase();
  return `Propose un modèle de véhicule écologique équivalent avec son prix en euros.
Vehicle: BMW M3
Names: Tesla Model 3 Performance prix:50000€
Vehicle: Mercedes Classe S
Names: Audi RS e-tron GT prix:200000€
Vehicle: Porsche Panamera Turbo
Names: Tesla Model S Ludicrous prix:120000€
Vehicle: ${capitalizedVehicle}
Names:`;
}
