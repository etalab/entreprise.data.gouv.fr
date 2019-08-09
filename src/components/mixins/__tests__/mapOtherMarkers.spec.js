import mapOtherMarkers from "@/components/mixins/mapOtherMarkers";
import Vue from "vue";

jest.mock("mapbox-gl", () => ({
  supported: jest.fn().mockImplementation(() => {
    return true;
  }),
  Popup: jest.fn()
}));

jest.mock("vue", () => ({
  http: { get: jest.fn() }
}));

describe("mapOtherMarkers.js", () => {
  test("Method nearEtablissementQuery compute the right query", () => {
    mapOtherMarkers.methods.baseAdressSirenV2 = "https://test/v1/";
    expect(
      mapOtherMarkers.methods.nearEtablissementQuery("sampleSiren")
    ).toEqual("https://test/v1/sampleSiren/etablissements_geojson");
  });

  test("Method getMarkersData gets the right query", () => {
    mapOtherMarkers.methods.getMarkersData("sampleSiren");
    expect(Vue.http.get).toHaveBeenCalledWith(
      "https://test/v1/sampleSiren/etablissements_geojson"
    );
  });
});
