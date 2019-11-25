import Filters from "@/components/mixins/filters";

describe("filters.js", () => {
  test(".ifEmptyShowPlaceholder", () => {
    expect(Filters.filters.ifEmptyShowPlaceholder(null)).toBe("Non renseigné");
    expect(Filters.filters.ifEmptyShowPlaceholder("")).toBe("Non renseigné");
    expect(Filters.filters.ifEmptyShowPlaceholder("NotNull")).toBe("NotNull");
  });

  test("It replace extra chars * and / with one space", () => {
    expect(
      Filters.filters.removeExtraChars(
        "we test*this/*string with/extra*/chars/"
      )
    ).toBe("we test this string with extra chars");
  });

  test("It returns null if we send null", () => {
    expect(Filters.filters.removeExtraChars()).toBe(null);
  });
});
