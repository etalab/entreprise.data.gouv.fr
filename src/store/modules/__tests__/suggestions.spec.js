import Suggestions from "@/store/modules/suggestions";
import store from "@/store/index.js";

jest.mock("@/store/modules/suggestions.js");
jest.mock("lodash/debounce");

jest.mock("@/store/index.js", () => ({
  getters: {
    suggestionAdressToGet: "mock-suggestionAdresstoget"
  },
  dispatch: jest.fn(),
  commit: jest.fn()
}));

jest.mock("vue", () => ({
  http: {
    get: jest.fn().mockImplementation(query => query + "-was-called")
  }
}));

describe("suggestions.js mutations", () => {
  const state = {
    querySuggestions: 0,
    storedSuggestions: 0
  };

  test("Mutation setStoredSuggestions works", () => {
    Suggestions.mutations.setStoredSuggestions(state, 1);
    expect(state.storedSuggestions).toBe(1);
  });
});

describe("suggestions.js actions", () => {
  test("Action filterAndStoreSuggestions filters sugestions and commit them", () => {
    const state = {};
    const suggestionsObjects = {
      suggestions: ["suggest*1", "suggest*/2", "suggest 3"]
    };
    Suggestions.actions.filterAndStoreSuggestions(state, suggestionsObjects);
    expect(store.commit).toHaveBeenCalledWith("setStoredSuggestions", [
      "suggest 1",
      "suggest 2",
      "suggest 3"
    ]);
  });
});
