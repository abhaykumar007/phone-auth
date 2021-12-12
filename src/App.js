import "./App.css";
import SignIn from "./component/signIn";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BorrowMoney from "./component/borrowMoney";
import ShowReq from "./component/showReq.js";
import Four0FOur from "./component/four0four";

function App() {
  let user = localStorage.getItem("user");

  function PrivateRoute({ path, Component }) {
    user = localStorage.getItem("user");
    return (
      <Route
        path={path}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <PrivateRoute path="/borrow" Component={BorrowMoney} />
          <PrivateRoute path="/showReq" Component={ShowReq} />
          <Route component={Four0FOur} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
