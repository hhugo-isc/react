import React from "react";
import Card from "./Card";

import styles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div onClick={props.onConfirm} className={styles.backdrop}></div>
      <Card className={styles.card}>
        <header>
          <h2>{props.title}</h2>
        </header>
        <div>
          <p>{props.message}</p>
        </div>
        <footer>
          <button onClick={props.onConfirm} className={styles.actions}>
            Okay
          </button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
