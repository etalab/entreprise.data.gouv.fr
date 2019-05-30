import { createLocalVue, shallowMount } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";
import EtablissementSirene from "@/components/etablissement/EtablissementSirene.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");
jest.mock("mapbox-gl", () => ({
  supported: jest.fn(),
  Popup: jest.fn()
}));
describe("EtablissementSirene.vue", () => {
  // let storeMocks
  // let wrapperEtablissement
  // let etablissement
  // beforeEach(() => {
  //   storeMocks = createStoreMocks()
  //   wrapperEtablissement = shallowMount(EtablissementSirene, {
  //     localVue,
  //     store: storeMocks.store
  //   })
  //   etablissement = wrapperEtablissement.vm
  // })
  // TODO
  // test('Computed value coordinates returns the coordinates if both longitude and latitude exists')
});

describe("EtablissementSirene.vue Snapshot testing", () => {
  const storeMocks = createStoreMocks();

  const wrapperES = shallowMount(EtablissementSirene, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperES.vm.$el).toMatchSnapshot();
  });
});
