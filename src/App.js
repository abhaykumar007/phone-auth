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
  const user = localStorage.getItem("user");
  function PrivateRoute({ path, Component }) {
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
          <Route path="/showReq" exact component={ShowReq} />
          <Route component={Four0FOur} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
