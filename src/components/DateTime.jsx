import React, { useState, useEffect } from "react";

function DateTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      style={{
        padding: "8px 16px",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "13px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        textAlign: "center",
        minWidth: "110px",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ fontWeight: 500 }}>{timeString}</div>
      <div style={{ fontSize: "11px", opacity: 0.8 }}>{dateString}</div>
    </div>
  );
}

export default DateTime;
