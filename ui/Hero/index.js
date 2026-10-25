import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const float = keyframes`50%{transform:translateY(-12px)}`;

const Section = styled.section`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 24px 24px 56px;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 40px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const Title = styled.h1`
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  line-height: 1.1;
  margin: 0;
`;
const Lead = styled.p`
  color: var(--secondary-color);
  font-size: 1.1rem;
  max-width: 480px;
  margin: 20px 0 28px;
`;
const Facts = styled.div`
  display: flex; gap: 28px; margin-top: 36px; color: var(--secondary-color); font-size: 14px;
  b { display: block; font: 700 1.5rem var(--font-num); color: var(--text); }
`;
const Scene = styled.div`
  perspective: 1100px; height: 440px; position: relative;
  @media (max-width: 900px) { height: 400px; }
`;
const Stack = styled.div`
  position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .15s ease-out;
`;
const Card = styled.div`
  position: absolute; background: #fff; border: 1px solid var(--line); border-radius: 24px; padding: 22px;
  box-shadow: 0 40px 70px -30px rgba(76,29,149,.45);
  animation: ${float} 6s ease-in-out infinite;
  small { color: var(--secondary-color); }
  ${({ dark }) => dark && `background: linear-gradient(145deg,#8B5CF6,#4C1D95); color:#fff; border:0; small{color:#E9DDFF;}`}
`;
const Coin = styled.span`
  width: 44px; height: 44px; border-radius: 50%; display: inline-grid; place-items: center; color: #fff;
  font: 700 14px var(--font-num); background: conic-gradient(from 200deg,#C4B5FD,#7C3AED,#4C1D95,#C4B5FD);
`;
const Bar = styled.div`
  height: 9px; border-radius: 9px; background: var(--line); overflow: hidden; margin: 12px 0 6px;
  span { display: block; height: 100%; width: 72%; background: linear-gradient(90deg,#A78BFA,#7C3AED); }
`;

export default function Hero({ children, title, lead }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setT({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  return (
    <Section onMouseMove={move} onMouseLeave={() => setT({ x: 0, y: 0 })}>
      <div>
        <Title>{title || "Launch your token with liquidity locked from day one"}</Title>
        <Lead>{lead || "Create a token sale in minutes, lock liquidity so investors can trust it, and let early supporters join from any supported chain."}</Lead>
        {children}
        <Facts>
          <div><b>Multi-chain</b>BNB, Ethereum and more</div>
          <div><b>Locked</b>liquidity by default</div>
          <div><b>Refunds</b>if the soft cap is missed</div>
        </Facts>
      </div>
      <Scene aria-hidden="true">
        <Stack style={{ transform: `rotateX(${14 - t.y * 18}deg) rotateY(${-22 + t.x * 24}deg)` }}>
          <Card style={{ width: 300, left: "6%", top: "6%", transform: "translateZ(30px)" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Coin>NVA</Coin><div><h3 style={{ margin: 0, fontSize: "1.05rem" }}>Nova Protocol</h3><small>Token sale</small></div>
            </div>
            <Bar><span /></Bar>
            <small>72% filled</small>
          </Card>
          <Card dark style={{ width: 280, right: "2%", top: "34%", transform: "translateZ(110px)", animationDelay: "-2s" }}>
            <small>Liquidity locked</small>
            <div style={{ font: "700 2.2rem var(--font-num)" }}>365 days</div>
            <small>Withdraw only after unlock</small>
          </Card>
          <Card style={{ width: 240, left: "14%", bottom: "2%", transform: "translateZ(60px)", animationDelay: "-4s" }}>
            <small>Your allocation</small>
            <div style={{ font: "700 1.7rem var(--font-num)" }}>12,500 NVA</div>
            <small>Claim after the sale ends</small>
          </Card>
        </Stack>
      </Scene>
    </Section>
  );
}
