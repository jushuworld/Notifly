import * as React from "react";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

const FinishPage: React.FunctionComponent<{}> = (props: any) => {
  // need to implement a more react-type solution
  console.log("✅", props.location.state.type);
  const timeout = setTimeout(() => {
    if (window.location.pathname === '/finish')
      window.location.pathname = "/";
  }, 22000);

  let welcome = <h2>Thanks, someone will be with you shortly.</h2>;
  if (props.location.state.type != "Delivery") {
    welcome = (
      <React.Fragment>
        <h2>Welcome, {props.location.state.firstName}!</h2>
        <h3>Have a seat, someone will be with you shortly.</h3>
      </React.Fragment>
    );
  }

  return (
    <div id="finished">
      <Navigation />
      <Header />
      {welcome}
    </div>
  );
};

export default FinishPage;
