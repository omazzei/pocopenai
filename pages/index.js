import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [vehicleInput, setVehicleInput] = useState("");
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
	      body: JSON.stringify({ vehicle: vehicleInput, checkedfrenchCar: checkedfrenchCar, checkedZFE: checkedZFE }),
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
        <title>OpenAI Quickstart</title>
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
        <h2>Compatible ZFE ?
        <input type="Checkbox" 
          label="Compatible ZFE ?"
          value={checkedZFE}
          onChange={handleChangeZFE}
        /></h2>
        <h2>Marque française ?
        <input type="Checkbox"
	  name="checkedfrenchCar"
          label="Marque française ?"
          value={checkedfrenchCar}
          onChange={handleChangefrenchCar}
        /></h2>           {}

          <input type="submit" value="Recherche" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

