import React from "react";
import PublishForm from "../components/Form/Publish/publishForm";
import * as s from "../styles/global";

const Publish = () => {
  return (
    <s.Container ai="center" style={{ position: "relative" }}>
      <div
        className="blob"
        style={{
          width: 240,
          height: 240,
          top: -40,
          right: "3%",
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
        Create an IDO
      </h1>
      <s.TextDescription
        fw="500"
        fs="16px"
        style={{ color: "var(--secondary-color)", marginTop: 6, maxWidth: 560, textAlign: "center" }}
      >
        Launch your token sale in four simple steps
      </s.TextDescription>
      <s.SpacerMedium />
      <PublishForm></PublishForm>
    </s.Container>
  );
};

export default Publish;
