import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

function Question(props) {
  return (
    <div className={styles.question}>
      <label htmlFor={props.id} styles={styles.prompt}>{props.prompt}</label><br></br>
      <textarea
        className={styles.questionText}
        id={props.id}
        type="text"
        rows="10"
        cols="50"
        name={props.id}
        form="routineForm"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default function Home() {

  const [morningRoutineInput, setMorningRoutineInput] = useState("");
  const [friendsRoutineInput, setFriendsRoutineInput] = useState("");
  const [commuteRoutineInput, setCommuteRoutineInput] = useState("");

  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ routine: morningRoutineInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setMorningRoutineInput("");
  }

  return (
    <div>
      <Head>
        <title>My Life After Climate Change</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h3 className={styles.logo}>My Life After Climate Change</h3>
          <p>Have you ever wondered how your life will be disrupted by climate change?</p>
          <p>Answer some questions about your daily routine and then hit the Climate Change button to find out.</p>
        </div>
        
        <div className={styles.inputForm}>
          <form id="routineForm" onSubmit={onSubmit}>
            <Question
              id="morning"
              prompt="What are the first things you do when you wake up?"
              placeholder="I get out of bed, brush my teeth, and read the latest articles on climate change!">
              onChange={(e) => setMorningRoutineInput(e.target.value)}
              value={morningRoutineInput}
            </Question>

            <Question
              id="friends"
              prompt="What is your favourite activity you like to do with friends?"
              placeholder="My friends and I like to go ice skating at the local pond.">
              onChange={(e) => setFriendsRoutineInput(e.target.value)}
              value={friendsRoutineInput}
            </Question>

            <Question
              id="commute"
              prompt="How do you get to work/school?"
              placeholder="I usually ride my bike to work across town to work at the OpenAI Factory">
              onChange={(e) => setCommuteRoutineInput(e.target.value)}
              value={commuteRoutineInput}
            </Question>

            <input type="submit" value="Climate Change" />
          </form>
        </div>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
