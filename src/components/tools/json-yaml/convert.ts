import yaml from "js-yaml";

export interface ConvertResult {
  ok: boolean;
  output: string;
  error?: string;
}

export function jsonToYaml(source: string): ConvertResult {
  if (!source.trim()) return { ok: true, output: "" };
  try {
    const data = JSON.parse(source);
    const out = yaml.dump(data, { indent: 2, lineWidth: -1, noRefs: true });
    return { ok: true, output: out };
  } catch (err) {
    return {
      ok: false,
      output: "",
      error: err instanceof Error ? err.message : "Invalid JSON",
    };
  }
}

export function yamlToJson(source: string): ConvertResult {
  if (!source.trim()) return { ok: true, output: "" };
  try {
    const data = yaml.load(source);
    const out = JSON.stringify(data, null, 2);
    return { ok: true, output: out };
  } catch (err) {
    return {
      ok: false,
      output: "",
      error: err instanceof Error ? err.message : "Invalid YAML",
    };
  }
}
