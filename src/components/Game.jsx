import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Game() {
  let [questions, setQuestions] = useState([]);
  let [checkAnswer, setCheckAnswer] = useState(false);

  useEffect(() => {
    fetchQuestions();
    async function fetchQuestions() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
      );
      let data = await response.json();
      prepareQuestions(data.results);
    }
  }, []);

  function prepareQuestions(questions) {
    let finalQuestions = questions.map((question) => {
      let answers = [...question.incorrect_answers];
      let good_answer = { id: nanoid(), label: question.correct_answer };
      answers = answers.map((answer) => {
        return {
          id: nanoid(),
          label: answer,
          correct: null,
          selected: false,
        };
      });
      answers.push(good_answer);
      answers.sort(() => Math.random() - 0.5);

      let correct = false;
      return {
        ...question,
        answers,
        correct,
        id: nanoid(),
        correct_answer: good_answer,
      };
    });

    setQuestions(finalQuestions);
  }

  function selectAnswer(question_id, answer_id) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id == question_id) {
          let { answers } = question;
          let new_answers = answers.map((answer) => {
            return { ...answer, selected: answer.id == answer_id };
          });

          return { ...question, answers: new_answers, selected: answer_id };
        }

        return question;
      });
    });
  }

  async function fetchQuestions() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    );
    let data = await response.json();

    prepareQuestions(data.results);
  }

  function validateQuestions() {
    if (checkAnswer) {
      fetchQuestions();
      setCheckAnswer(false);
      return;
    }

    const answers_count = questions.filter((question) => {
      return question.selected;
    }).length;

    if (answers_count != questions.length) {
      alert("Fill all question");
      return;
    }

    setCheckAnswer((prevCheckAnser) => !prevCheckAnser);
    setQuestions(
      questions.map((question) => {
        let selected_answer = question.answers.filter((answer) => {
          return answer.selected;
        });

        let correct = selected_answer[0].id === question.correct_answer.id;

        return { ...question, correct };
      })
    );
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question
        key={index}
        question={question}
        handleSelection={selectAnswer}
        checkAnswer={checkAnswer}
      />
    );
  });

  return (
    <>
      {questions.length > 0 && (
        <div className="game">
          <div className="game--answer">{questionElements}</div>
          <div className="game--result">
            {checkAnswer && (
              <p>
                You scored{" "}
                {
                  questions.filter((question) => {
                    return question.correct;
                  }).length
                }
                /{questions.length} correct answers
              </p>
            )}
            <button
              className="btn"
              onClick={() => {
                validateQuestions();
              }}
            >
              {checkAnswer ? "Play Again" : "Check answer"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
