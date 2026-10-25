import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Home = () => (
  <Hero title="Launch tokens people can trust" lead="Create token sales, lock liquidity and invest in new projects, all from one place.">
    <Link className="btn btn-primary" to="/launchpad" style={{ padding: "12px 24px" }}>Explore token sales</Link>
  </Hero>
);

export default Home;
