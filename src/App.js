import "./App.css";
import SignIn from "./component/signIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BorrowMoney from "./component/borrowMoney";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/borrow" exact component={BorrowMoney} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
