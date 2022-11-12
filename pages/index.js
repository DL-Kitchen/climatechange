import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [routineInput, setRoutineInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ routine: routineInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setRoutineInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" className={styles.icon} />
        <h3>My life after climate change</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            rows="10"
            cols="50"
            name="routine"
            placeholder="Enter your daily routine"
            value={routineInput}
            onChange={(e) => setRoutineInput(e.target.value)}
          />
          <input type="submit" value="Climate Change" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
