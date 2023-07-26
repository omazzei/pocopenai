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
  const gpt = req.body.gpt;
  const motor = req.body.motor;
  //console.log(`Valeur french : ${french}`);
  //console.log(`Valeur req.body.checkedfrenchCar: `, req.body.checkedfrenchCar);
  console.log(`Valeur req.body : `,req.body); 

  try {
    /*
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(vehicle, french, zfecompat,nbsieges),
      max_tokens:500,
      temperature: 0.5
    });
    */
   //let isFrench = "Pas important", isZfe = "Pas important";
   let isFrench = "Non obligatoire", isZfe = "Non obligatoire";
   if (french)
    isFrench = "Oui";
   if (zfecompat )
    isZfe = "Oui";
   const contentUserPrompt = `Modèle : ${vehicle }, motorisation préférentiel du nouveau véhicule : ${motor}, nombre de places souhaité pour le nouveau véhicule : ${nbsieges}, nouveau véhicule de marque française : ${isFrench}, nouveau véhicule autorisé à rouler dans une zone à faible émission : ${isZfe}`;
  //Ces critères incluent des normes de faible émission de CO2, une motorisation écologique, une autonomie générale et une autonomie WLTP, 
  //ainsi qu'un budget d'entrée de gamme en euros.
   const completion = await openai.createChatCompletion({
    model: gpt,
    messages: [{"role": "system", "content": `Tu es ECO-VEHICULE-GPT, une IA spécialisée dans la recommandation de véhicules propres,
     Quand l'utilisateur t'envoie son modèle actuel de véhicule et les caractéristiques qu'il souhaite retrouver dans son futur véhicule, tu lui recommandes un véhicule écologique équivalent en lui donnant des détails sur le tarif, la motorisation, l'autonomie, la taille du véhicule et du coffre, etc. 
     L'utilisateur va formuler la demande sous la forme d'une liste de clés : valeurs comme par exemple ce qui suit : 
     \"Modèle : [nom du modèle actuel], nombre de places souhaitées : [nombre], marque française : [oui/non obligatoire], autorisé à rouler dans une zone à faible émission : [oui/non obligatoire], etc.\" 
     A toi de recommander un véhicule propre équivalent en tenant compte des caractéristiques données.
     Tu préciseras s'il s'agit d'une motorisation hybride ou hybride rechargeable ou 100% électrique.
     Si l'utilisateur fait une demande qui ne correspond pas à un modèle de voiture , un message d'erreur sera renvoyé.
     Si l'utilisateur fait une demande qui correpond uniquement à une marque de constructeur de véhicule , tu lui demanderas poliment d'être plus précis `}, 
     {role: "user", content: contentUserPrompt}],
   });
   
    res.status(200).json({ result: completion.data.choices[0].message.content });
	  /*
    console.log(`########################`);
    console.log(`# Requete completion : #`);
    console.log(`########################`);
    console.log(completion);

    console.log(`########################`);
    console.log(`# Requete res :        #`);
    console.log(`########################`);
    console.log(res);
	  */
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
//prompt = `Propose un modèle de véhicule écologique avec ${nbPlace} places ${isFrench} ${isZFE} avec son prix en euros.
//Vehicle: BMW M3
//Names: 508 Peugeot Sport Engineered prix:72000€
//Vehicle: Mercedes Classe S
//Names: Citroen DS9 prix:65000€
//Vehicle: Alfa Romeo 147 
//Names: Peugeot 308 SW PHEV 180 E-EAT8 ALLURE prix:43000€
//Vehicle: ${capitalizedVehicle}
//Names:`;

// v2
//prompt = `Propose un modèle de véhicule écologique avec ${nbPlace} places ${isFrench} ${isZFE} avec son type de motorisation et son prix en euros.
//Vehicle: BMW M3
//Names: 508 Peugeot Sport Engineered \nmotorisation:hybride essence \nprix:72000€
//Vehicle: Mercedes Classe S
//Names: Citroen DS9 \nmotorisation:hybride diesel \nprix:65000€
//Vehicle: Alfa Romeo 147 
//Names: Peugeot 308 SW PHEV 180 E-EAT8 ALLURE \nmotorisation:hybride \nprix:43000€
//Vehicle: ${capitalizedVehicle}
//Names:`;

// v3
prompt = `Propose un modèle de véhicule écologique équivalent à ${capitalizedVehicle} avec ${nbPlace} places ${isFrench} ${isZFE} avec son type de motorisation, son autonomie générale et son autonomie WLTP. Indique son gabarit et le volume du coffre ainsi que son tarif d'entrée de gamme en euros.`

console.log('Prompt généré:', prompt);  
  
  return prompt;
}
