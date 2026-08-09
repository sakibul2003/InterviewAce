function Toast({ message, type = "success", onClose }) {
  if (!message) {
    return null;
  }

  const getToastClass = () => {
    switch (type) {
      case "error":
        return "text-bg-danger";

      case "warning":
        return "text-bg-warning";

      case "info":
        return "text-bg-info";

      default:
        return "text-bg-success";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return "❌";

      case "warning":
        return "⚠️";

      case "info":
        return "ℹ️";

      default:
        return "✅";
    }
  };

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{
        zIndex: 9999,
      }}
    >
      <div
        className={`toast show ${getToastClass()}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex align-items-center">
          <div className="toast-body">
            <strong>{getIcon()}</strong>{" "}
            {message}
          </div>

          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Toast;