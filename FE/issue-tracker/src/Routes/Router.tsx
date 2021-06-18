import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "@/Routes/LoginPage";
import NewIssue from "@/Routes/NewIssuePage";
import MainPage from "@/Routes/MainPage";
import Tab from "@/Routes/TabPage";
import IssueDetail from "@/Routes/IssueDetail";
import Callback from "@/Routes/Callback";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/issue" component={MainPage} />
        <Route exact path="/" component={Login} />
        <Route path="/issue/tab" component={Tab} />
        <Route path="/issue/detail" component={IssueDetail} />
        <Route path="/issue/new" component={NewIssue} />
        <Route path="/callback" component={Callback} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
