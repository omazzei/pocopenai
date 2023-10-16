import styles from "../index.module.css";
import React, { useEffect ,useState } from "react";
import Header from '../header/header.js';
import Reponse from '../reponse/reponse.js';


const Content = () => {
  const [vehicleInput, setVehicleInput] = useState("");
  const [radioNumSit, setRadioNumSit] = useState(5);
  const [radioMotor, setRadioMotor] = useState("électrique");
  const [checkedZFE, setCheckedZFE] = useState(false);
  const [checkedfrenchCar, setCheckedfrenchCar] = useState(false);
  const [result, setResult] = useState();
  const [gpt, setGpt] = useState("gpt-3.5-turbo");

  const handleChangeZFE = () => {
    setCheckedZFE(!checkedZFE);
  };

  const handleChangefrenchCar = () => {
    setCheckedfrenchCar(!checkedfrenchCar);
  };

  function handleSelectChangeGpt(event) {
    setGpt(event.target.value);
  }

function MyBootstrapComponent() {
	useEffect(() => {
		import('bootstrap/dist/js/bootstrap.min.js')
		.then(() => {
			// Bootstrap has been loaded
		})
		.catch((err) => {
			console.error('An error occurred while loading the Bootstrap JavaScript file:', err);
		});
	}, []);

	return (
		<>
		// Your component's JSX goes here
		</>
	);
}
MyBootstrapComponent();

  async function onSubmit(event) {
    event.preventDefault();
    try {
		const loadingElement = document.getElementById("loading");
		loadingElement.style.display = "block"; // Afficher le loading

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ vehicle: vehicleInput }),
	      body: JSON.stringify({ vehicle: vehicleInput, checkedfrenchCar: checkedfrenchCar, checkedZFE: checkedZFE, numSit: radioNumSit, motor: radioMotor, gpt: gpt }),
      });

	  loadingElement.style.display = "none"; // Masquer le loading

      const data = await response.json();
      if (response.status !== 200) {	    
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setVehicleInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
      <main className={styles.main}>
	  <Header />
        <form onSubmit={onSubmit} id="formVehicle" autocomplete="off">
          <input
            type="text"
            name="vehicle"
            placeholder="Votre modèle actuel? (Ford Fiesta 2018)"
            value={vehicleInput}
            onChange={(e) => setVehicleInput(e.target.value)}
          />

	<div className="selectContainer">
		<select class="form-select" aria-label="Default select example" onChange={handleSelectChangeGpt}>
  		  <option selected>Selectionner un modèle de langage</option>
   		  <option value="gpt-3.5-turbo">gpt 3.5 turbo</option>
   		  <option value="gpt-4">gpt 4</option>
		</select>
	</div>

<div className={styles.containerFilter}>
	<div class="accordion" id="accordionPanelsStayOpenExample">
		<div class="accordion-item">
			<h2 class="accordion-header">
			<button className={styles.accordion} class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
			Critères du véhicule recherché
			</button>
			</h2>
			<div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
				<div class="accordion-body">
					  <div class="container">
						<div className={styles.typeVehicle}>
	  					<div>
							<input type="Checkbox" 
							  label="Compatible ZFE"
							  value={checkedZFE}
							  onChange={handleChangeZFE}
	  						  class="form-check-input"
							/>
	  						<label class="form-check-label" for="zde">
							  véhicule compatible avec les zones à faibles émissions
	  						</label>
	  					</div>
	  					<div>
							<input type="Checkbox"
							  name="checkedfrenchCar"
							  label="Marque française"
							  value={checkedfrenchCar}
							  onChange={handleChangefrenchCar}
							  class="form-check-input"
							/>
	  						<label class="form-check-label" for="marqueFrancaise">
							Marque française
	  						</label>
						</div>
							           {}
						</div>
							<label for="motorInput" class="form-label">Type de motorisation souhaité :</label>
							<div className={styles.techniqueFilter}>
								<div>
								<input type="radio"
								  name="radioMotor"
								  value="électrique"
								  onChange={(e) => setRadioMotor("électrique")}
	  							  class="form-check-input"
								  id="electrique"/>
								<label for="electrique">Véhicule électrique</label>
								</div>
								<div>
								<input type="radio"
								  name="radioMotor"
								  value="hybride"
								  onChange={(e) => setRadioMotor("hybride")}
	  							  class="form-check-input"
								  id="hybride"/>
								<label for="hybride">Véhicule  hybride</label>
								</div>
								<div>
								<input type="radio"
								  name="radioMotor"
								  value="hybride rechargeable"
								  onChange={(e) => setRadioMotor("hybride rechargeable")}
	  							  class="form-check-input"
								  id="hybriderech"/>
								<label for="hybriderech">Véhicule hybride rechargeable</label>
								</div>
							</div>
							<label for="placeInput" class="form-label">Nombre de places nécessaires :</label>
							<div className={styles.techniqueFilter}>
								<div>
								<input type="radio"
								  name="radioNumSit"
								  value="2"
								  onChange={(e) => setRadioNumSit(2)}
	  							  class="form-check-input"
								  id="twoSit"/>
								<label for="twoSit">2 places</label>
								</div>
								<div>
								<input type="radio"
								  name="radioNumSit"
								  value="5"
								  onChange={(e) => setRadioNumSit(5)}
	  							  class="form-check-input"
								  id="fiveSit"/>
								<label for="fiveSit">5 places</label>
								</div>
								<div>
								<input type="radio"
								  name="radioNumSit"
								  value="7"
								  onChange={(e) => setRadioNumSit(7)}
	  							  class="form-check-input"
								  id="sevenSit"/>
								<label for="sevenSit">7 places</label>
								</div>
							</div>
					  </div>
				</div>
			</div>
		</div>
	</div>
</div>

          <input type="submit" value="Recherche" className={styles.recherche} />
		  <div id="loading" style={{ display: 'none' }}>Loading...</div>
        </form>
	  <Reponse result={result} />
      </main>
  );
};

export default Content;
