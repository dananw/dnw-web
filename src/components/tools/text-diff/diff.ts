export type DiffOp = "equal" | "add" | "remove";

export interface DiffLine {
  op: DiffOp;
  text: string;
  leftNo?: number;
  rightNo?: number;
}

export interface DiffStats {
  added: number;
  removed: number;
}

/**
 * Line-based diff using the classic LCS (longest common subsequence) dynamic
 * programming approach. Good enough for comparing config/code/text blocks.
 */
export function diffLines(
  a: string,
  b: string,
): { lines: DiffLine[]; stats: DiffStats } {
  const left = a.length ? a.split("\n") : [];
  const right = b.length ? b.split("\n") : [];
  const n = left.length;
  const m = right.length;

  // dp[i][j] = LCS length of left[i..] and right[j..]
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0),
  );
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        left[i] === right[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const lines: DiffLine[] = [];
  let added = 0;
  let removed = 0;
  let i = 0;
  let j = 0;
  let leftNo = 1;
  let rightNo = 1;

  while (i < n && j < m) {
    if (left[i] === right[j]) {
      lines.push({
        op: "equal",
        text: left[i],
        leftNo: leftNo++,
        rightNo: rightNo++,
      });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      lines.push({ op: "remove", text: left[i], leftNo: leftNo++ });
      removed++;
      i++;
    } else {
      lines.push({ op: "add", text: right[j], rightNo: rightNo++ });
      added++;
      j++;
    }
  }
  while (i < n) {
    lines.push({ op: "remove", text: left[i], leftNo: leftNo++ });
    removed++;
    i++;
  }
  while (j < m) {
    lines.push({ op: "add", text: right[j], rightNo: rightNo++ });
    added++;
    j++;
  }

  return { lines, stats: { added, removed } };
}
