import React, { useMemo, useState } from "react";
import MagicRings from "./MagicRings";

const affirmations = [
  "Тебе не нужно торопить свою жизнь",
  "Ты можешь быть мягче к себе",
  "Не каждый ответ приходит сразу",
  "Сегодня достаточно просто быть",
  "Тишина тоже ведет тебя",
  "Ты уже ближе, чем думаешь",
  "Отпусти то, что слишком тяжело держать",
  "Иногда покой — это прогресс",
  "Твоя энергия важнее спешки",
  "Вселенная не опаздывает",
  "Ты не обязана все контролировать",
  "Маленькие шаги тоже меняют жизнь",
];

function getRandomAffirmation(currentText) {
  const available = affirmations.filter((text) => text !== currentText);
  const list = available.length > 0 ? available : affirmations;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.6}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 4 + 2.5}s`,
    }));
  }, []);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [affirmation, setAffirmation] = useState(affirmations[0]);
  const [isChanging, setIsChanging] = useState(false);

  function showNextAffirmation() {
    if (isChanging) return;

    setIsChanging(true);

    window.setTimeout(() => {
      setAffirmation((current) => getRandomAffirmation(current));
      setIsChanging(false);
    }, 320);
  }

  return (
    <main className="app" onClick={showNextAffirmation}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
          background: #07070a;
        }

        body {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .magic-rings-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .app {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: #f7f0ff;
          text-align: center;
          cursor: pointer;
          background:
            radial-gradient(circle at 28% 20%, rgba(190, 160, 255, 0.24), transparent 30%),
            radial-gradient(circle at 78% 75%, rgba(120, 150, 255, 0.18), transparent 32%),
            linear-gradient(180deg, #101020 0%, #09090b 58%, #050506 100%);
        }

        .app::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: screen;
          pointer-events: none;
          background-image: repeating-radial-gradient(circle at center, white 0, white 1px, transparent 1px, transparent 6px);
        }

        .app::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.055;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(circle at center, black, transparent 72%);
        }

        .orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(72px);
          pointer-events: none;
          animation: floatOrb 14s ease-in-out infinite;
        }

        .orb-left {
          width: 330px;
          height: 330px;
          left: -130px;
          top: 8%;
          background: rgba(190, 160, 255, 0.2);
        }

        .orb-right {
          width: 360px;
          height: 360px;
          right: -140px;
          bottom: 0;
          background: rgba(120, 150, 255, 0.17);
          animation-delay: -5s;
          animation-duration: 16s;
        }

        @keyframes floatOrb {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.75;
          }

          50% {
            transform: translate3d(42px, 58px, 0) scale(1.08);
            opacity: 1;
          }
        }

        .stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .star {
          position: absolute;
          display: block;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 0 10px rgba(226, 215, 255, 0.9);
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.18;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.55);
          }
        }

        .floating-symbol {
          position: absolute;
          color: rgba(255, 255, 255, 0.08);
          font-size: 46px;
          pointer-events: none;
          animation: drift 10s ease-in-out infinite;
        }

        .symbol-1 { left: 12%; top: 16%; }
        .symbol-2 { right: 14%; top: 22%; animation-delay: -2s; }
        .symbol-3 { left: 18%; bottom: 18%; animation-delay: -4s; }
        .symbol-4 { right: 18%; bottom: 16%; animation-delay: -6s; }

        @keyframes drift {
          0%, 100% {
            transform: translateY(-10px) rotate(-4deg);
            opacity: 0.05;
          }

          50% {
            transform: translateY(20px) rotate(6deg);
            opacity: 0.16;
          }
        }

        .center-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(226, 215, 255, 0.13), transparent 70%);
          filter: blur(28px);
          pointer-events: none;
          animation: pulse 4.5s ease-in-out infinite;
        }

        .light-wave {
          position: absolute;
          width: 120vw;
          height: 120vw;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          animation: rotateWave 28s linear infinite;
          pointer-events: none;
        }

        .wave-1 {
          width: 90vw;
          height: 90vw;
          opacity: 0.18;
        }

        .wave-2 {
          width: 120vw;
          height: 120vw;
          opacity: 0.12;
          animation-direction: reverse;
          animation-duration: 40s;
        }

        .wave-3 {
          width: 150vw;
          height: 150vw;
          opacity: 0.08;
          animation-duration: 54s;
        }

        @keyframes rotateWave {
          from {
            transform: rotate(0deg) scale(1);
          }

          50% {
            transform: rotate(180deg) scale(1.03);
          }

          to {
            transform: rotate(360deg) scale(1);
          }
        }

        .shooting-star {
          position: absolute;
          width: 160px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,255,255,0));
          top: 18%;
          left: -20%;
          opacity: 0;
          transform: rotate(-12deg);
          animation: shooting 12s linear infinite;
          pointer-events: none;
        }

        @keyframes shooting {
          0% {
            transform: translateX(0) rotate(-12deg);
            opacity: 0;
          }

          8% {
            opacity: 0.9;
          }

          18% {
            transform: translateX(140vw) rotate(-12deg);
            opacity: 0;
          }

          100% {
            transform: translateX(140vw) rotate(-12deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.42;
          }

          50% {
            transform: scale(1.09);
            opacity: 0.78;
          }
        }

        .orb,
        .center-glow,
        .light-wave,
        .shooting-star,
        .stars,
        .floating-symbol {
          z-index: 1;
        }

        .content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 760px;
          padding: 28px;
        }

        .label {
          margin-bottom: 28px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 11px;
          line-height: 1.6;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }

        .affirmation {
          position: relative;
          overflow: hidden;
          margin: 0;
          color: #f7f0ff;
          font-size: clamp(34px, 7vw, 74px);
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: -0.035em;
          text-shadow: 0 0 34px rgba(226, 215, 255, 0.18);
          background: linear-gradient(180deg, #ffffff 0%, #e9ddff 45%, #ffffff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: opacity 320ms ease, transform 320ms ease, filter 320ms ease;
          animation: breathe 8s ease-in-out infinite;
        }

        .affirmation.changing {
          opacity: 0;
          transform: translateY(10px) scale(0.985);
          filter: blur(10px);
        }

        .affirmation::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-120%);
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-120%);
            opacity: 0;
          }

          20% {
            opacity: 0;
          }

          45% {
            opacity: 1;
          }

          70% {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.012);
          }
        }

        .hint {
          margin-top: 36px;
          color: rgba(255, 255, 255, 0.28);
          font-size: 11px;
          line-height: 1.8;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .content {
            padding: 20px;
          }

          .label {
            margin-bottom: 22px;
            font-size: 10px;
          }

          .hint {
            margin-top: 30px;
            font-size: 10px;
          }
        }
      `}</style>

      <div className="magic-rings-layer" aria-hidden="true">
        <MagicRings
          color="#A855F7"
          colorTwo="#6366F1"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      <div className="orb orb-left" />
      <div className="orb orb-right" />
      <div className="center-glow" />
      <div className="light-wave wave-1" />
      <div className="light-wave wave-2" />
      <div className="light-wave wave-3" />
      <div className="shooting-star" />
      <StarField />

      <div className="floating-symbol symbol-1">☾</div>
      <div className="floating-symbol symbol-2">✦</div>
      <div className="floating-symbol symbol-3">◌</div>
      <div className="floating-symbol symbol-4">⟡</div>

      <section className="content">
        <div className="label">☾ аффирмация дня</div>

        <h1 className={`affirmation ${isChanging ? "changing" : ""}`}>
          {affirmation}
        </h1>

        <div className="hint">нажми в любое место, чтобы получить новое послание</div>
      </section>
    </main>
  );
}
