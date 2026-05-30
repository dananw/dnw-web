"use client";

import { useState } from "react";
import { percentOf, whatPercent, percentChange } from "./percentage";

const inputClass =
  "w-24 rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60";

const Row = ({
  children,
  result,
}: {
  children: React.ReactNode;
  result: string;
}) => (
  <div className="rounded-lg border border-border p-4">
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {children}
    </div>
    <div className="mt-3 font-mono text-lg text-foreground">= {result}</div>
  </div>
);

const PercentageCalculator = () => {
  const [a1, setA1] = useState("15");
  const [a2, setA2] = useState("200");
  const [b1, setB1] = useState("30");
  const [b2, setB2] = useState("200");
  const [c1, setC1] = useState("50");
  const [c2, setC2] = useState("75");

  return (
    <div className="space-y-4">
      <Row result={percentOf(Number(a1), Number(a2))}>
        <span>What is</span>
        <input
          aria-label="Percentage"
          type="number"
          value={a1}
          onChange={(e) => setA1(e.target.value)}
          className={inputClass}
        />
        <span>% of</span>
        <input
          aria-label="Value"
          type="number"
          value={a2}
          onChange={(e) => setA2(e.target.value)}
          className={inputClass}
        />
        <span>?</span>
      </Row>

      <Row result={`${whatPercent(Number(b1), Number(b2))} %`}>
        <input
          aria-label="Part"
          type="number"
          value={b1}
          onChange={(e) => setB1(e.target.value)}
          className={inputClass}
        />
        <span>is what percent of</span>
        <input
          aria-label="Whole"
          type="number"
          value={b2}
          onChange={(e) => setB2(e.target.value)}
          className={inputClass}
        />
        <span>?</span>
      </Row>

      <Row result={`${percentChange(Number(c1), Number(c2))} %`}>
        <span>Percentage change from</span>
        <input
          aria-label="From"
          type="number"
          value={c1}
          onChange={(e) => setC1(e.target.value)}
          className={inputClass}
        />
        <span>to</span>
        <input
          aria-label="To"
          type="number"
          value={c2}
          onChange={(e) => setC2(e.target.value)}
          className={inputClass}
        />
      </Row>

      <p className="text-sm text-muted-foreground">
        Three everyday percentage calculations, updating as you type. A positive
        change is an increase, a negative one a decrease. Runs locally.
      </p>
    </div>
  );
};

export default PercentageCalculator;
