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
        message: "Merci d'entrer le modèle de véhicule actuel",
      }
    });
    return;
  }
    const french = req.body.checkedfrenchCar;
  const zfecompat = req.body.checkedZFE;
  const nbsieges = req.body.numSit;
  console.log(`Valeur french : ${french}`);
  console.log(`Valeur req.body.checkedfrenchCar: `, req.body.checkedfrenchCar);
  console.log(`Valeur req.body : `,req.body);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(vehicle, french, zfecompat,nbsieges),
      temperature: 0.5,
    });
    console.log(`completion : ${completion}`);
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

function generatePrompt(vehicle, french, zfecompat, numSit) {
  const capitalizedVehicle =
  vehicle[0].toUpperCase() + vehicle.slice(1).toLowerCase();
  var isFrench = '';
  var isZFE = '';
  var nbPlace = 5;
  var prompt = '';

  if (french) {
          isFrench = ' de marque française ';}
  if (zfecompat) {
          isZFE = ' autorisé à rouler dans une zone à faible émission ';}
  nbPlace = numSit;

// v1
//prompt = `Propose un modèle de véhicule écologique avec ${nbPlace} places ${isFrench} ${isZFE} avec son prix en euros.//Vehicle: BMW M3
//Names: 508 Peugeot Sport Engineered prix:72000€
//Vehicle: Mercedes Classe S
//Names: Citroen DS9 prix:65000€
//Vehicle: Alfa Romeo 147
//Names: Peugeot 308 SW PHEV 180 E-EAT8 ALLURE prix:43000€

//Vehicle: ${capitalizedVehicle}
//Names:`;

// v2
prompt = `Propose un modèle de véhicule écologique avec ${nbPlace} places ${isFrench} ${isZFE} avec son type de motorisation et son prix en euros.
Vehicle: BMW M3
Names: 508 Peugeot Sport Engineered \nmotorisation:hybride essence \nprix:72000€
Vehicle: Mercedes Classe S
Names: Citroen DS9 \nmotorisation:hybride diesel \nprix:65000€
Vehicle: Alfa Romeo 147
Names: Peugeot 308 SW PHEV 180 E-EAT8 ALLURE \nmotorisation:hybride \nprix:43000€
Vehicle: ${capitalizedVehicle}
Names:`;

console.log('Prompt généré:', prompt);

  return prompt;
}
  