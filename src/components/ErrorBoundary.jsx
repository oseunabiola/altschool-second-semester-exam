import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo: errorInfo,
    });
    console.log(error);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="container" style={{ height: "100%" }}>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <h2>Oops!Something went wrong.</h2>
            {process.env.NODE_ENV === "development" ? (
              <details style={{ whiteSpace: "pre-wrap" }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
            ) : null}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
