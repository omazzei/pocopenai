import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [vehicleInput, setVehicleInput] = useState("");
  const [radioNumSit, setRadioNumSit] = useState(4);
  const [checkedZFE, setCheckedZFE] = useState(false);
  const [checkedfrenchCar, setCheckedfrenchCar] = useState(false);
  const [result, setResult] = useState();

  const handleChangeZFE = () => {
    setCheckedZFE(!checkedZFE);
  };

  const handleChangefrenchCar = () => {
    setCheckedfrenchCar(!checkedfrenchCar);
  };

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ vehicle: vehicleInput }),
		              body: JSON.stringify({ vehicle: vehicleInput, checkedfrenchCar: checkedfrenchCar, checkedZFE: checkedZFE, numSit: radioNumSit }),
      });

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
    <div>
      <Head>
        <title>POC Agilauto OpenAI</title>
        <link rel="icon" href="/agilauto.png" />
      </Head>

      <main className={styles.main}>
        <img src="/agilauto.png" height="200" widgth="600" />
		        <h1>Votre nouveau véhicule green</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="vehicle"
            placeholder="Entrez le modèle de véhicule actuel"
            value={vehicleInput}
            onChange={(e) => setVehicleInput(e.target.value)}
          />
          <div class="container">
                <div class="typeVehicle">
                        <h2>
                                Compatible ZFE ?
                                <input type="Checkbox"
                                  label="Compatible ZFE ?"
                                  value={checkedZFE}
                                  onChange={handleChangeZFE}
                                />
                        </h2>
                        <h2>
                                  Marque française ?
                                <input type="Checkbox"
                                  name="checkedfrenchCar"
                                  label="Marque française ?"
                                  value={checkedfrenchCar}
                                  onChange={handleChangefrenchCar}
                                />
								                     </h2>           {}
                </div>
                <div class="techniqueFilter">
                        <h2>
                                Nombre de places souhaitées ?
                                <div>
                                <input type="radio"
                                  name="radioNumSit"
                                  value="2"
                                  onChange={(e) => setRadioNumSit(e.target.value), console.log(radioNumSit)}
                                  id="twoSit"/>
                                <label for="twoSit">Coupé 2 places</label>
                                </div>

                                <div>
                                <input type="radio"
                                  name="radioNumSit"
                                  value="4"
                                  onChange={(e) => setRadioNumSit(e.target.value)}
                                  id="fourSit"/>
                                <label for="fourSit">4 places</label>
                                </div>

                                <div>
                                <input type="radio"
                                  name="radioNumSit"
                                  value="5"
                                  onChange={(e) => setRadioNumSit(e.target.value)}
                                  id="sixSit"/>
		                               <label for="sixSit">5 places</label>
                                </div>

                                <div>
                                <input type="radio"
                                  name="radioNumSit"
                                  value="7"
                                  onChange={(e) => setRadioNumSit(e.target.value)}
                                  id="eightSit"/>
                                <label for="eightSit">7 places</label>
                                </div>

                        </h2>
                </div>
          </div>

          <input type="submit" value="Recherche" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}						 
		