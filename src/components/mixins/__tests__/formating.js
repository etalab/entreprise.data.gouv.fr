import Formating from "@/components/mixins/formating";

describe("formating.js", () => {
  test(".concatNames", () => {
    expect(Formating.methods.concatNames("John", "Smith")).toBe("John SMITH");
    expect(Formating.methods.concatNames("John", null)).toBe("");
    expect(Formating.methods.concatNames("John", "")).toBe("");
    expect(Formating.methods.concatNames(null, "Smith")).toBe("SMITH");
    expect(Formating.methods.concatNames(null, null)).toBe("");
  });
});
