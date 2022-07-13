import React from "react";
import "./styles.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./components/home";
// import Header from "./components/header";

// import ProductTheme from "./themes/product";

export default function App() {
  return (
    <React.Fragment>
      <div className="App">
        {/* <Header /> */}
        <Home />
      </div>
    </React.Fragment>
  );
}
