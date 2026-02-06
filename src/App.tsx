import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

function App() {
  const [opened, setOpened] = useState(false);
  const [stage, setStage] = useState(0);
  const [noPos, setNoPos] = useState({ x: 80, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [message, setMessage] = useState("");
  const [yesPulse, setYesPulse] = useState(1);
  const [loveYou, setLoveYou] = useState(false);

  const vibrate = (pattern: any) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  const moveNoButton = () => {
    const x = 60 + Math.random() * 80;
    const y = Math.random() * 60 - 30;
    setNoPos({ x, y });
  };

  const handleNoTouch = () => {
    vibrate(stage >= 2 ? [30, 30, 30] : 30);

    if (stage === 0) setMessage("Hey… don’t be so quick 🥺");
    if (stage >= 1 && stage <= 3) {
      moveNoButton();
      setNoScale((s) => Math.max(s - 0.15, 0.4));
      setYesPulse((p) => p + 0.15);
    }
    if (stage === 3) setMessage("I’ll take that as a yes 💕");
    setStage((s) => Math.min(s + 1, 4));
  };

  const handleYes = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setMessage("YAY 💖 I knew it!");
    setLoveYou(true);
    setStage(5);
  };

  return (
    <div className="container">
      <div
        className={`card ${opened ? "open" : ""}`}
        onClick={() => setOpened(true)}
      >
        <h1>Hey ❤️</h1>
        <p>Tap me</p>

        <div className={`letter ${opened ? "show" : ""}`}>
          <h2>Will you be my Valentine? 💌</h2>

          {!loveYou && (
            <div className={`buttons ${stage >= 4 ? "confirmed" : ""}`}>
              <button
                className={`yes ${stage >= 4 ? "confirmed" : ""}`}
                style={{ transform: `scale(${yesPulse})` }}
                onClick={handleYes}
              >
                Yes 💖
              </button>

              {stage < 4 && (
                <button
                  className="no"
                  onTouchStart={handleNoTouch}
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
                  }}
                >
                  No 😅
                </button>
              )}
            </div>
          )}
          {loveYou && <p className="love-you">I love you! 💕</p>}

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
