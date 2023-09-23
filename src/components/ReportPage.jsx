const ReportPage = ({ email, setEmail, answers, data }) => {
//   console.log(data, answers);
//   let ind = 0;
  return (
    <div className="container bg-dark text-light">
      <div className="email p-3 m-3">
        <h3>{email}</h3>
      </div>
      <div className="all">
        {data.map((question, index) => (
          <div className="part bg-black ">
            <h4 className="question p-3 m-3">
              <li key={index}>
                {index + 1} . {question.question}
              </li>
            </h4>
            <div className="a bg-white text-dark px-3">
              Selected: {answers[index]}
            </div>
            <div className={answers[index]===question.correct_answer?"correct bg-success text-white px-3":"correct bg-danger text-white px-3"}>
              Correct Answer: {question.correct_answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
