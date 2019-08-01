import * as React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import AdminPage from "../pages/AdminPage";
import { motion } from "framer-motion";

const AdminPinPage: React.FunctionComponent<{}> = (props: any) => {
  const [pin, setPin] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [focus, setFocus] = React.useState(1);

  const checkPin = () => {
    console.log("typed pin", pin);
    const data = {
      pin: pin
    };
    fetch("/api/adminData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(newdata => {
        console.log("newdata", newdata.body);
        if (newdata.status < 300) setRedirect(true);
        else alert("Wrong Pin");
      })
      .catch(err => {
        console.log("caught the error");
        alert(err);
      });
  };
  interface KeyboardEvent extends EventModifierInit {
    key?: string;
  }
  // for changing input focus
  const moveOnMax = function(field: any, nextFieldID: any) {
    console.log("AGGGGGH");
    if (field.length === 1) {
      document.getElementById(nextFieldID).focus();
    }
  };
  const pinPadMotion = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  if (redirect) {
    return <AdminPage />;
  } else {
    return (
      <motion.div
        className="pin-pad"
        initial="hidden"
        animate="visible"
        variants={pinPadMotion}
        transition={{
          delay: 0.3,
          x: { type: "spring", stiffness: 500 },
          default: { duration: 0.3 }
        }}
      >
        <div className="h-1">Enter your pin</div>
        <div>
          <input
            type="password"
            pattern="[0-9]*"
            className="pinPad"
            maxLength={1}
            onChange={e => {
              setPin(e.target.value);
              moveOnMax(e.target.value, "2");
            }}
          />
          <input
            type="password"
            maxLength={1}
            pattern="[0-9]*"
            className="pinPad"
            id="2"
            onChange={e => {
              let newPin = pin.toString().concat(e.target.value);
              moveOnMax(e.target.value, "3");
            }}
          />
          <input
            type="password"
            maxLength={1}
            pattern="[0-9]*"
            className="pinPad"
            id="3"
            onChange={e => {
              let newPin = pin.toString().concat(e.target.value);
              moveOnMax(e.target.value, "4");
            }}
          />
          <input
            type="password"
            maxLength={1}
            pattern="[0-9]*"
            className="pinPad"
            id="4"
            onChange={e => {
              let newPin = pin.toString().concat(e.target.value);
            }}
          />
        </div>
        <motion.input
          whileTap={{ scale: 0.9 }}
          className="submit-pin"
          type="submit"
          onClick={checkPin}
          value="Done"
        />
        <Link to="/">
          <Button buttonName="Back" />
        </Link>
      </motion.div>
    );
  }
};

export default AdminPinPage;
