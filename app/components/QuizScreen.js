"use client";

import { useEffect, useRef, useState } from "react";
import { prepareQuestions } from "@/lib/questions";
import { getRoyalTitle } from "@/lib/ranks";
import { useSound } from "@/lib/useSound";
import PointsPopup from "./PointsPopup";

const QUESTION_SECONDS = 15;
const ANSWER_PAUSE_MS = 800;
const POPUP_MS = 700; // shorter than ANSWER_PAUSE_MS so it never lingers over the next question

export default function QuizScreen({
  category,
  playerProfile,
  setPlayerProfile,
  onFinish,
  onBack,
}) {
  const [questions] = useState(() => prepareQuestions(category));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState({}); // { [index]: "correct" | "wrong" }
  const [popupPoints, setPopupPoints] = useState(null);

  // Refs used as synchronous guards/mirrors so timer callbacks and click
  // handlers can never both slip through (React state updates are async,
  // so state alone isn't safe as a same-tick guard).
  const answeredRef = useRef(false);
  const timerRef = useRef(null);
  const firstAttemptPerfectRef = useRef(true);

  const play = useSound();

  const currentQuestion = questions[currentIndex];
  const levelID = category + "_Level_1";

  // Timer - restarts every time the question changes
  useEffect(() => {
    setTimeLeft(QUESTION_SECONDS);
    setAnswered(false);
    answeredRef.current = false;
    setFeedback({});

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (!answeredRef.current) {
            answeredRef.current = true;
            setAnswered(true);
            firstAttemptPerfectRef.current = false;
            advance(score);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Moves to the next question after the pause, or finishes the level if
  // this was the last one. `scoreAfterThisAnswer` is passed explicitly
  // rather than re-read from state, so there's no stale-closure risk.
  function advance(scoreAfterThisAnswer) {
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        finishLevel(scoreAfterThisAnswer);
      }
    }, ANSWER_PAUSE_MS);
  }

  function finishLevel(finalScore) {
    const won = finalScore === questions.length;

    if (won && !playerProfile.completedLevels.includes(levelID)) {
      let bonus = 10;
      let popupBonus = null;
      if (firstAttemptPerfectRef.current) {
        bonus += 100;
        popupBonus = 100;
      }

      setPlayerProfile((prev) => {
        const newTotal = prev.totalPoints + bonus;
        return {
          ...prev,
          totalPoints: newTotal,
          title: getRoyalTitle(newTotal),
          levelsCompleted: prev.levelsCompleted + 1,
          completedLevels: [...prev.completedLevels, levelID],
        };
      });

      if (popupBonus) {
        setPopupPoints(popupBonus);
        setTimeout(() => setPopupPoints(null), POPUP_MS);
      }
    }

    play("victory");
    onFinish(finalScore, questions.length);
  }

  function handleAnswer(index) {
    if (answeredRef.current) return;
    answeredRef.current = true;
    setAnswered(true);
    clearInterval(timerRef.current);
    play("click");

    const isCorrect = index === currentQuestion.correct;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (isCorrect) {
      setFeedback({ [index]: "correct" });

      const questionID = currentQuestion.id;
      const alreadyScored = playerProfile.answeredQuestions.includes(questionID);
      const earnedPoints = alreadyScored ? 0 : 10 + (timeLeft > 10 ? 5 : 0);

      if (!alreadyScored) {
        setPopupPoints(earnedPoints);
        setTimeout(() => setPopupPoints(null), POPUP_MS);
      }

      setPlayerProfile((prev) => {
        const newTotal = prev.totalPoints + earnedPoints;
        return {
          ...prev,
          totalPoints: newTotal,
          title: getRoyalTitle(newTotal),
          answeredQuestions: alreadyScored
            ? prev.answeredQuestions
            : [...prev.answeredQuestions, questionID],
        };
      });

      play("correct");
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(100);
      }
    } else {
      firstAttemptPerfectRef.current = false;
      setFeedback({ [index]: "wrong" });
      play("wrong");
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(200);
      }
    }

    advance(newScore);
  }

  if (!currentQuestion) return null;

  return (
    <div className="container" id="quizScreen">
      <PointsPopup points={popupPoints} />

      <h2 id="categoryTitle">{currentQuestion.category}</h2>
      <button id="backBtn" onClick={onBack}>
        🏠 Back
      </button>

      <p id="scoreText">Score: {score}</p>
      <p id="questionCounter">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <p id="timerText">⏱️ Time: {timeLeft}</p>
      <h3 id="questionText">{currentQuestion.question}</h3>

      {currentQuestion.answers.map((answerText, index) => {
        const state = feedback[index];
        const label =
          state === "correct" ? "✅ " + answerText
          : state === "wrong" ? "❌ " + answerText
          : answerText;
        return (
          <button
            key={index}
            className={"answerBtn" + (state ? " " + state : "")}
            disabled={answered}
            onClick={() => handleAnswer(index)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
  }
