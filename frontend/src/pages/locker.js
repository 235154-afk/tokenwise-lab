import { Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LockerList from "../components/Modal/lockerList";
import * as s from "../styles/global";
import { utils } from "../utils";

const Locker = (props) => {
  const [address, setAddress] = useState("");
  const contract = useSelector((state) => state.contract);
  const [showZero, setShowZero] = useState(0);

  if (!contract.web3) {
    return null;
  }

  const handleShowZero = (e) => {
    setShowZero(!showZero);
  };

  return (
    <s.Container ai="center" style={{ position: "relative" }}>
      <div
        className="blob"
        style={{
          width: 240,
          height: 240,
          top: -40,
          left: "3%",
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
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
        Token Locker
      </h1>
      <s.TextDescription
        fw="500"
        fs="16px"
        style={{ color: "var(--secondary-color)", marginTop: 6 }}
      >
        Verify that LP tokens are locked on-chain before you invest
      </s.TextDescription>
      <s.SpacerMedium />
      <s.Container
        fd="row"
        jc="flex-end"
        ai="center"
        style={{ width: "100%", maxWidth: 640, gap: 8, padding: 0 }}
      >
        <span style={{ fontSize: 14, color: "var(--secondary-color)", fontWeight: 600 }}>
          show zero?
        </span>
        <Checkbox value={showZero} onChange={handleShowZero} />
      </s.Container>
      <div
        className="glass-panel"
        style={{ width: "100%", maxWidth: 640, borderRadius: 18, padding: "6px 18px", zIndex: 1 }}
      >
        <TextField
          fullWidth
          variant="standard"
          label={"Search by token address "}
          InputProps={{ disableUnderline: true }}
          onChange={async (e) => {
            e.preventDefault();
            utils.typewatch(setAddress(e.target.value), 2000);
          }}
        />
      </div>
      <s.SpacerMedium />
      <LockerList showZero={showZero} tokenAddress={address} />
    </s.Container>
  );
};

export default Locker;
