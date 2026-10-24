import React from "react";
import { useNavigate } from "react-router-dom";
import * as s from "../styles/global";

const features = [
  {
    icon: "🚀",
    title: "Launch IDOs",
    desc: "Publish a fully configurable token sale in minutes — soft cap, hard cap, pricing and timelines, your rules.",
  },
  {
    icon: "🔒",
    title: "Trustless Locking",
    desc: "Lock LP tokens on-chain so investors can verify commitment without trusting a middleman.",
  },
  {
    icon: "🌐",
    title: "Multi-Chain Ready",
    desc: "Works across EVM-compatible networks — BSC, Ethereum and more, configurable per deployment.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <s.Container ai="center" style={{ position: "relative", overflow: "hidden" }}>
      {/* 3D floating gradient blobs */}
      <div
        className="blob"
        style={{
          width: 320,
          height: 320,
          top: -60,
          left: "6%",
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 260,
          height: 260,
          top: 120,
          right: "4%",
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* ===== Hero ===== */}
      <s.Container ai="center" style={{ position: "relative", zIndex: 1 }}>
        <s.SpacerLarge />
        <s.SpacerLarge />

        <div
          className="glass-panel"
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            color: "var(--primary-dark)",
            letterSpacing: "0.02em",
          }}
        >
          ✦ Decentralized Launchpad Protocol
        </div>

        <s.SpacerMedium />

        <h1
          className="gradient-text"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 76px)",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.08,
            margin: 0,
            maxWidth: 860,
          }}
        >
          TokenWise Lab IDOFactory
        </h1>

        <s.SpacerMedium />

        <s.TextDescription
          fs="20px"
          fw="500"
          style={{ maxWidth: 620, textAlign: "center", color: "var(--secondary-color)" }}
        >
          Launch, invest in and lock multichain token sales — a decentralized
          IDO platform built for transparent, trustless fundraising.
        </s.TextDescription>

        <s.SpacerLarge />

        <s.Container
          display="flex"
          fd="row"
          jc="center"
          ai="center"
          style={{ gap: 16, width: "auto", flexWrap: "wrap" }}
        >
          <s.button className="glow-btn" onClick={() => navigate("/launchpad")}>
            Explore Launchpad
          </s.button>
          <s.button secondary onClick={() => navigate("/publish")}>
            Create an IDO
          </s.button>
        </s.Container>

        <s.SpacerLarge />
        <s.SpacerLarge />
      </s.Container>

      {/* ===== Feature cards ===== */}
      <s.Container
        display="flex"
        fd="row"
        jc="center"
        ai="stretch"
        style={{ gap: 24, position: "relative", zIndex: 1, maxWidth: 1100 }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="glass-panel tilt-card"
            style={{
              flex: "1 1 280px",
              minWidth: 260,
              maxWidth: 340,
              borderRadius: 24,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 34 }}>{f.icon}</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {f.title}
            </div>
            <div style={{ fontSize: 15, color: "var(--secondary-color)", lineHeight: 1.6 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </s.Container>

      <s.SpacerLarge />
      <s.SpacerLarge />
    </s.Container>
  );
};

export default Home;
