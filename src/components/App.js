import Header from "../components/ui/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={()=><div>HOMEE</div>} />
          <Route exact path="/services" component={()=><div>Servicess</div>} />
          <Route exact path="/customesoftware" component={()=><div>Custom Software</div>} />
          <Route exact path="/mobileapps" component={()=><div>Mobile Apps</div>} />
          <Route exact path="/websites" component={()=><div>Websites</div>} />
          <Route exact path="/revolution" component={()=><div>Revolution</div>} />
          <Route exact path="/about" component={()=><div>About</div>} />
          <Route exact path="/contact" component={()=><div>Contact</div>} />
          <Route exact path="/estimate" component={()=><div>Estimate</div>} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
