import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IDOList from "../components/Modal/idoList";
import * as s from "../styles/global";
import { utils } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";

const Launchpad = (props) => {
  const [address, setAddress] = useState("");
  const contract = useSelector((state) => state.contract);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('/launchpad');
  }, []);

  if (!contract.web3) {
    return null;
  }

  return (
    <s.Container ai="center" style={{ position: "relative" }}>
      <div
        className="blob"
        style={{
          width: 260,
          height: 260,
          top: -40,
          right: "2%",
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <s.SpacerMedium />
      <h1
        className="gradient-text"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          textAlign: "center",
          margin: 0,
        }}
      >
        Launchpad
      </h1>
      <s.TextDescription
        fw="500"
        fs="16px"
        style={{ color: "var(--secondary-color)", marginTop: 6 }}
      >
        Browse live and upcoming token sales
      </s.TextDescription>
      <s.SpacerMedium />
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: 640,
          borderRadius: 18,
          padding: "6px 18px",
          zIndex: 1,
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          label={"Search by token address "}
          InputProps={{ disableUnderline: true }}
          onChange={async (e) => {
            e.preventDefault();
            await utils.typewatch(2000);
            setAddress(e.target.value);
          }}
        />
      </div>
      <s.SpacerMedium />
      <IDOList tokenAddress={address} />
    </s.Container>
  );
};

export default Launchpad;
