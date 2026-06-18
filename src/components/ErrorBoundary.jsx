import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>{error.message || "Unexpected error occurred."}</p>
          <p>
            Please verify your Firebase environment variables and restart the app.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
