import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [morningRoutineInput, setMorningRoutineInput] = useState("");
  const [friendsRoutineInput, setFriendsRoutineInput] = useState("");
  const [commuteRoutineInput, setCommuteRoutineInput] = useState("");
  const [isLoading, setLoading] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ morning: morningRoutineInput, friends: friendsRoutineInput, commute:commuteRoutineInput }),
    });
    const data = await response.json();
    setLoading(false);
    setResult(data.result);
    setMorningRoutineInput("");
    setCommuteRoutineInput("");
    setFriendsRoutineInput("");
  }

  return (
    <div>
      <Head>
        <title>My Life After Climate Change</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h3>My Life After <span style={{color:"#10a37f"}}>Climate Change</span> 🌎</h3>
          <p>Have you ever wondered how your daily routine would be altered by climate change?</p>
          <p>Answer a few questions below, hit the Climate Change button, and find out.</p>
          <br></br>
        </div>

        <div className={styles.inputForm} style={{display: isLoading || result ? "none" : "initial"}}>
        <form onSubmit={onSubmit}>

          <label htmlFor="morning" className={styles.inputLabel}>What are the first things you do when you wake up?</label>
          <textarea
            className={styles.questionText}
            type="text"
            rows="10"
            cols="50"
            name="morning"
            placeholder="I get out of bed, brush my teeth, and read the latest articles on climate change!"
            value={morningRoutineInput}
            onChange={(e) => setMorningRoutineInput(e.target.value)}
          />

          <label htmlFor="commute" className={styles.inputLabel}>How do you get to work/school?</label>
          <textarea
            className={styles.questionText}
            type="text"
            rows="10"
            cols="50"
            name="commute"
            placeholder="I usually ride my bike to work across town to work at the OpenAI Factory."
            value={commuteRoutineInput}
            onChange={(e) => setCommuteRoutineInput(e.target.value)}
          />

          <label htmlFor="friends" className={styles.inputLabel}>What is your favourite activity you like to do with friends?</label>
          <textarea
            className={styles.questionText}
            type="text"
            rows="10"
            cols="50"
            name="friends"
            placeholder="My friends and I like to go ice skating at the local pond."
            value={friendsRoutineInput}
            onChange={(e) => setFriendsRoutineInput(e.target.value)}
          />

          <input type="submit" value="Climate Change" />
        </form>
        </div>
        <div style={{display: !isLoading || result ? "none" : "initial"}}>
          <h2 className={styles.fader}>Loading...</h2>
        </div>

        <div className={styles.result}>{result}</div>

      </main>
    </div>
  );
}
