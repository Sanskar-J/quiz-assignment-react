import { Link } from "react-router-dom";

const StartPage = ({ email, setEmail }) => {
  return (
    <div style={{ maxWidth: "100%" }} className="container bg-dark">
      <div
        style={{
          height: "100vh",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div class="input-group input-group-lg w-50">
          <input
            id="email"
            type="text"
            className="form-control"
            placeholder="moc.liamg@gmail.com"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onInput={() => {
              setEmail(document.getElementById("email").value);
            }}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-primary btn-lg"
              disabled={email.length == 0}
              type="button"
              onClick={() => {
                setEmail(document.getElementById("email").value);
              }}
            >
              <Link to="/quiz">Start</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
