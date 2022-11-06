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
        <div
          className="d-flex flex-column align-items-center justify-content-center p-5"
          style={{ height: "100%" }}
        >
          <div className="col-12 col-sm-10 col-md-6 mb-5 text-center">
            <div className="fw-700 display-1 text-warning">500</div>
            <h1 className="h3">Oops! Something went wrong.</h1>
            <small>This is our fault, not yours. Please try again.</small>
          </div>
          {process.env.NODE_ENV === "development" ? (
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
