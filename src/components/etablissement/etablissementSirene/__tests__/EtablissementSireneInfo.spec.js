import EtablissementSireneInfo from "@/components/etablissement/etablissementSirene/EtablissementSireneInfo.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");

describe("EtablissementSireneInfo.vue snapshot", () => {
  const localVue = createLocalVue();
  const storeMocks = createStoreMocks();
  const wrapperEPI = mount(EtablissementSireneInfo, {
    localVue,
    store: storeMocks.store,
    computed: {
      resultSirene() {
        return {
          siret: "00000000000001",
          activite_principale: "62.0Z",
          unite_legale: {
            activite_principale: "01.21Z",
            categorie_juridique: "1000"
          }
        };
      }
    }
  });

  test("It match the snapshot", () => {
    expect(wrapperEPI.vm.$el).toMatchSnapshot();
  });
});
