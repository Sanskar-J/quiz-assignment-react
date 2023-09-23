import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const QuizPage = ({
  email,
  setEmail,
  answers,
  setAnswers,
  data,
  opt,
  loading,
}) => {
  const [selected, setSelected] = useState(1);
  const [itemStyles, setItemStyles] = useState({});
  const [visited,setVisited]=useState(new Array(15).fill(false))

  let index = 1;

  // const handleChoose = (ind) => {
  //   // console.log(answers);
  // };

  const next = () => {
    setSelected(selected + 1);
    visited[selected-1]=true
    setVisited(visited)
  };
  const prev = () => {
    setSelected(selected - 1);
    visited[selected-1]=true
    setVisited(visited)

  };
  return (
    <div className="container bg-dark text-light">
      <div className="clock d-flex align-items-center justify-content-center p-3">
        <Timer />
      </div>

      <div className="question d-flex align-items-center justify-content-center w-100">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="questions d-flex align-items-center justify-content-center">
            {data.map((question, index) => (
              <button
                key={index}
                id={selected - 1 === index ? "selected" : ""}
                className={(visited[index]?"boxes vis":"boxes")+(answers[index]==="No Selection"?"":" attempt")}
                onClick={() => {
                  visited[selected-1]=true
                  setSelected(index);
                  setVisited(visited)

                  // handleChoose(index);
                }}
              >
                {index++ + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="quiz d-flex align-items-center justify-content-center">
        <div>
          {/* <h1>Trivia Questions</h1> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <h2 className="py-3">
                {selected} . {data[selected - 1].question}
              </h2>

              <div className="options d-flex w-100 flex-column align-items-center justify-content-center">
                {opt[selected - 1].map((o, index) => (
                  <div
                    className="opt"
                    style={answers[selected - 1] === o ? itemStyles : {}}
                    id={answers[selected - 1] === o ? "select" : null}
                    onClick={() => {
                      answers[selected - 1] = o;
                      setAnswers(answers);
                      const s = {
                        backgroundColor: "black",
                        padding: "20px",
                      };
                      setItemStyles(s);
                    }}
                  >
                    {o}
                  </div>
                ))}
              </div>
            </ul>
          )}
        </div>
      </div>

      <div className="btn btn-group d-flex align-items-center justify-content-center">
        <button
          type="button"
          disabled={selected <= 1}
          hidden={selected <= 1}
          // style={{marginRight:"100px"}}
          className="btn btn-light gap-2"
          onClick={prev}
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" />
        </button>
        <button
          type="button"
          disabled={selected >= answers.length}
          hidden={selected >= answers.length}
          className="btn btn-light"
          onClick={next}
        >
          <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
        </button>
      </div>
      <div className="submit my-3 d-flex alignt-items-center justify-content-center">
        <button type="button" className="btn btn-outline-light">
          <Link
            className="text-success"
            style={{ textDecoration: "none" }}
            to="/report"
          >
            <FontAwesomeIcon icon={faCircleCheck} size="2xl" /> Submit
          </Link>
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
