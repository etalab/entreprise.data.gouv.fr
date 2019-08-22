import suggestionsHelpers from "@/components/mixins/suggestionsHelpers.js";

describe("suggestionsHelpers.js", () => {
  test("It computes correctly if there are suggestions", () => {
    suggestionsHelpers.methods.suggestions = ["suggestion1"];
    expect(suggestionsHelpers.methods.hasSuggestions()).toBeTruthy();
    suggestionsHelpers.methods.suggestions = [];
    expect(suggestionsHelpers.methods.hasSuggestions()).toBeFalsy();
    suggestionsHelpers.methods.suggestions = null;
    expect(suggestionsHelpers.methods.hasSuggestions()).toBeFalsy();
  });

  test("If suggestCount > 0, currentSuggestions returns the right suggestion", () => {
    suggestionsHelpers.methods.suggestions = [
      "suggestion1",
      "suggestion2",
      "suggestion3"
    ];
    suggestionsHelpers.methods.suggestCount = 2;
    expect(suggestionsHelpers.methods.currentSuggestion()).toBe("suggestion3");
    suggestionsHelpers.methods.suggestCount = -1;
    expect(suggestionsHelpers.methods.currentSuggestion()).toBe(null);
  });
});
