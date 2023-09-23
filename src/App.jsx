import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import { useState, useEffect} from "react";
import ReportPage from "./components/ReportPage";

const App = () => {
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState(new Array(15).fill("No Selection"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opt, setOpt] = useState([]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=15") // Use the provided API link
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Extract the questions from the response
        const fetchedQuestions = data.results;
        const options = [];
        fetchedQuestions.forEach((element) => {
          element.incorrect_answers.push(element.correct_answer);
          // console.log(element.correct_answer);
          options.push(shuffle(element.incorrect_answers));
        });

        setData(fetchedQuestions);
        setOpt(options);
        // console.log(opt);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <>
      <div className="App bg-dark">
        <Routes>
          <Route
            path="/"
            element={<StartPage email={email} setEmail={setEmail} />}
          />
          <Route
            path="/quiz"
            element={
              <QuizPage
                email={email}
                setEmail={setEmail}
                answers={answers}
                setAnswers={setAnswers}
                data={data}
                opt={opt}
                loading={loading}
              />
            }
          />
          <Route
            path="/report"
            element={
              <ReportPage
                email={email}
                setEmail={setEmail}
                answers={answers}
                data={data}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
