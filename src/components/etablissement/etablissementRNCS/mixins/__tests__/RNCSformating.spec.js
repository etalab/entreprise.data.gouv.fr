import Formating from "@/components/etablissement/etablissementRNCS/mixins/RNCSformating";
const formatAddressInfos = Formating.methods.formatAddressInfos;

describe("RNCSformating.js", () => {
  describe(".formatAddressInfos", () => {
    test("simple entity", () => {
      const entity = {
        adresse_code_postal: "34000",
        adresse_ville: "JOINVILLE-LE-PONT",
        adresse_pays: "France"
      };

      expect(formatAddressInfos(entity)).toBe(
        "34000 Joinville-le-pont, FRANCE"
      );
      expect(formatAddressInfos(entity, "", true)).toBe(
        "34000 Joinville-le-pont"
      );
    });

    test("simple entity with missing features", () => {
      const entity1 = {
        adresse_code_postal: "34000",
        adresse_ville: null,
        adresse_pays: "FRANCE"
      };
      const entity2 = {
        adresse_code_postal: null,
        adresse_ville: null,
        adresse_pays: "France"
      };
      const entity3 = {
        adresse_code_postal: "34000",
        adresse_ville: "JOINVILLE-LE-PONT",
        adresse_pays: null
      };
      const entity4 = {
        adresse_code_postal: null,
        adresse_ville: null,
        adresse_pays: null
      };

      expect(formatAddressInfos(entity1)).toBe("34000 FRANCE");
      expect(formatAddressInfos(entity1, "", true)).toBe("34000");

      expect(formatAddressInfos(entity2)).toBe("FRANCE");
      expect(formatAddressInfos(entity2, "", true)).toBe("");

      expect(formatAddressInfos(entity3)).toBe("34000 Joinville-le-pont");
      expect(formatAddressInfos(entity3, "", true)).toBe(
        "34000 Joinville-le-pont"
      );

      expect(formatAddressInfos(entity4)).toBe("");
      expect(formatAddressInfos(entity4, "", true)).toBe("");
    });

    test("abbreviation cut only country=FRANCE", () => {
      const entity = {
        adresse_code_postal: "11500",
        adresse_ville: "DAKAR",
        adresse_pays: "Senegal"
      };

      expect(formatAddressInfos(entity, "", true)).toBe("11500 Dakar, SENEGAL");
    });

    test("prefixed entity", () => {
      const entity = {
        representant_permanent_adresse_code_postal: "34000",
        representant_permanent_adresse_ville: "JOINVILLE-LE-PONT",
        representant_permanent_adresse_pays: "France"
      };

      expect(formatAddressInfos(entity, "representant_permanent_")).toBe(
        "34000 Joinville-le-pont, FRANCE"
      );
      expect(formatAddressInfos(entity, "representant_permanent_", true)).toBe(
        "34000 Joinville-le-pont"
      );
    });
  });
});
