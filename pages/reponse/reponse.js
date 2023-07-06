import styles from "../index.module.css";
import { useState } from "react";

const Reponse = (props) => {
//  const [result, setResult] = useState();
//        <div className={styles.result}>{result}</div> 
  return (
    <header>
        <div className={styles.result}>{props.result}</div>
    </header>
  );
};

export default Reponse;
