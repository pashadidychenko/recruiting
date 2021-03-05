import * as React from "react";
import { hot } from "react-hot-loader";
import InputForm from "./InputForm";

import "./../assets/scss/App.scss";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <InputForm />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
