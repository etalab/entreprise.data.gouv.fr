import RegExps from "@/components/mixins/regExps";

describe("regExps.js", () => {
  const areSiret = [
    "83305720100018",
    "833057201.000 18",
    "833 057 201 000 18",
    "833 057 201 00018",
    "833-057-201-000-18",
    "833 057 201-00018",
    "833.057 201_00018",
    "833.057.201.00018",
    "833.057.201.000.18",
    "833_057_201_00018",
    "833_057_201_000_18"
  ];
  const areNotSiret = [
    "833057201000",
    "8",
    "833 057 201 00 018",
    "8330572010001A",
    "833057201000A",
    "8330572010001/A8",
    "833_057_201_000/18"
  ];
  test("it validates correct sirets", () => {
    areSiret.forEach(siret => {
      expect(RegExps.methods.isSiret(siret)).toBeTruthy();
    });
  });
  test("it doesnt validate incorrect sirets", () => {
    areNotSiret.forEach(siret => {
      expect(RegExps.methods.isSiret(siret)).toBeFalsy();
    });
  });

  const areSiren = [
    "833057201",
    "833 057 201",
    "833 057-201",
    "833-057-201",
    "833.057.201",
    "833.057_201",
    "833.057.201",
    "833.057201",
    "833_057_201"
  ];
  const areNotSiren = [
    "8330572010",
    "833.0572 01",
    "8",
    "83305720",
    "833 057 201 00018",
    "83305720A",
    "83305720 1",
    "83305720/A",
    "833_057/201"
  ];
  test("it validates correct sirens", () => {
    areSiren.forEach(siren => {
      expect(RegExps.methods.isSiren(siren)).toBeTruthy();
    });
  });
  test("it doesnt validate incorrect sirens", () => {
    areNotSiren.forEach(siren => {
      expect(RegExps.methods.isSiren(siren)).toBeFalsy();
    });
  });

  const areIdAssociation = [
    "311S0573",
    "751P00167806",
    "632P0632013847",
    "751P00156249",
    "751P00153387",
    "031S0031000493",
    "313P21002",
    "751P00009715",
    "493S0493002190",
    "842P0842208786",
    "751P00158523",
    "595P0595028505",
    "751P00178947",
    "842P0842205203",
    "051S85-006",
    "051S85-0070",
    "9R4S9744003621",
    "759SAR731",
    "2A1P02A1000992",
    "922P28",
    "922P808",
    "2B2P02B1003923",
    "051Sk",
    "051SVISO",
    "242S2",
    "691P0990R00022",
    "931P1977-01540",
    "332P00461SP00",
    "771S0771000*71",
    "771S077100*112",
    "334S03010BX00",
    "332P04754bis00",
    "332P04754BIS00",
    "332P00068RUP00",
    "W012000021",
    "W9G2000687",
    "W423003672",
    "W893001415",
    "W321001752",
    "W9N3001202",
    "W9M3000817",
    "W9M1001776",
    "W593000925",
    "W771001183",
    "W014000002"
  ];

  const areNotIdAssociation = [
    "31S00573",
    "7151P00167806",
    "7P001569",
    "751E00153387",
    "0351S003100493",
    "E332006701",
    "S313P212",
    "W9G20006878",
    "W42300367"
  ];

  test("it validates correct IdAssociation", () => {
    areIdAssociation.forEach(id => {
      expect(RegExps.methods.isIdAssociation(id)).toBeTruthy();
    });
  });
  test("it doesnt validate incorrect IdAssociation", () => {
    areNotIdAssociation.forEach(id => {
      expect(RegExps.methods.isIdAssociation(id)).toBeFalsy();
    });
  });

  const validWithSeparators = [
    "83305720100018",
    "833057201.000 18",
    "833 057 201 000 18",
    "833 057 201 00018",
    "833-057-201-000-18",
    "833 057 201-00018",
    "833.057 201_00018",
    "833.057.201.00018",
    "833.057.201.000.18",
    "833_057_201_00018",
    "833_057_201_000_18",
    "833057201",
    "833 057 201",
    "833 057-201",
    "833-057-201",
    "833.057.201",
    "833.057_201",
    "833.057.201",
    "833.057201",
    "833_057_201"
  ];

  const validWithoutSeparators = [
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "83305720100018",
    "833057201",
    "833057201",
    "833057201",
    "833057201",
    "833057201",
    "833057201",
    "833057201",
    "833057201",
    "833057201"
  ];

  test("it correctly remove separators from sirets and sirens", () => {
    const processedValidWithSeparator = validWithSeparators.map(input =>
      RegExps.methods.removeSeparators(input)
    );
    expect(processedValidWithSeparator).toEqual(validWithoutSeparators);
  });

  const fullTextWithDiacritics = [
    "établissement",
    "rançon",
    "Monétisation",
    "énergumène",
    "Start-up",
    "ÉRIC ZÄTIER",
    "Gérard SPROÜT",
    "Ôh My Güt"
  ];

  const fullTextExpected = [
    "etablissement",
    "rancon",
    "Monetisation",
    "energumene",
    "Start-up",
    "ERIC ZATIER",
    "Gerard SPROUT",
    "Oh My Gut"
  ];

  test("removeDiacritics correctly remove diacritics from fullText", () => {
    const fullTextWithoutDiacritics = fullTextWithDiacritics.map(input =>
      RegExps.methods.removeDiacritics(input)
    );
    expect(fullTextWithoutDiacritics).toEqual(fullTextExpected);
  });

  test("analyzeSearchID works", () => {
    expect(RegExps.methods.analyzeSearchId("833 057 201")).toBe("SIREN");
    expect(RegExps.methods.analyzeSearchId("W9G2000687")).toBe(
      "ID_ASSOCIATION"
    );
    expect(RegExps.methods.analyzeSearchId("051S85-0070")).toBe(
      "ID_ASSOCIATION"
    );
    expect(RegExps.methods.analyzeSearchId("833 057 201 000 18")).toBe("SIRET");
    expect(RegExps.methods.analyzeSearchId("256314")).toBeNull();
  });
});
