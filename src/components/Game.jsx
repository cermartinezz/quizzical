import { useEffect, useState } from "react";
import dataQuestions from "./data";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Game() {
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
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

      console.log(finalQuestions);

      setQuestions(finalQuestions);
    }
  }, []);

  const questionElements = questions.map((question, index) => {
    return <Question key={index} question={question} />;
  });

  return <>{questions.length > 0 && <div>{questionElements}</div>}</>;
}
