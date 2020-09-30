import React from "react";
import styles from "../styles/Example.module.css";

export function ExampleRenderer(props) {
  return (
    <div className={styles.example}>
      <div className={styles.content}>Content</div>
      <div className={styles.demo}>Demo</div>
      <div className={styles.finalStatechart}>Final Statechart</div>
    </div>
  );
}
