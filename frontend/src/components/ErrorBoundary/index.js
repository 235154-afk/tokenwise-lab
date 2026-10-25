import React from "react";
import * as s from "../../styles/global";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("App crashed:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <s.Container
          ai="center"
          jc="center"
          style={{ minHeight: "60vh", textAlign: "center" }}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: 460,
              padding: "36px 28px",
              borderRadius: 24,
            }}
          >
            <div style={{ fontSize: 40 }}>⚠️</div>
            <s.SpacerSmall />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
                margin: 0,
              }}
            >
              Something went wrong
            </h2>
            <s.SpacerSmall />
            <p style={{ color: "var(--secondary-color)", fontSize: 15, lineHeight: 1.6 }}>
              We couldn't reach the network — this is usually a temporary RPC
              or wallet connection issue. Please try again.
            </p>
            <s.SpacerMedium />
            <s.button onClick={this.handleRetry}>Reload App</s.button>
          </div>
        </s.Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
