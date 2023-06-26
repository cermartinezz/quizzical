import { useEffect, useState } from "react";
import dataQuestions from "./data";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Game() {
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    // fetchQuestions();
    // async function fetchQuestions() {
    //   const response = await fetch(
    //     "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    //   );
    //   let data = await response.json();
    //   setQuestions(data.results);
    // }

    prepareQuestions(dataQuestions.results);

    function prepareQuestions(questions) {
      let finalQuestions = questions.map((question) => {
        let all_answers = [...question.incorrect_answers];
        all_answers.push(question.correct_answer);
        all_answers.sort(() => Math.random() - 0.5);
        all_answers = all_answers.map((answer) => {
          return { id: nanoid(), label: answer };
        });
        let selected_answer = "";
        return { ...question, all_answers, selected_answer, id: nanoid() };
      });

      setQuestions(finalQuestions);
    }
  }, []);

  function selectAnswer(question_id, answer_id) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id == question_id) {
          return { ...question, selected_answer: answer_id };
        }

        return question;
      });
    });
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question
        key={index}
        question={question}
        handleSelection={selectAnswer}
      />
    );
  });

  return <>{questions.length > 0 && <div>{questionElements}</div>}</>;
}
