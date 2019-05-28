import EtablissementSireneInfo from "@/components/etablissement/etablissementSirene/EtablissementSireneInfo.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");

describe("EtablissementSireneInfo.vue", () => {
  // let storeMocks
  // let wrapperEPI
  // let etablissementPanelInfo
  // beforeEach(() => {
  //   storeMocks = createStoreMocks()
  //   wrapperEPI = shallowMount(EtablissementSireneInfo, {
  //     localVue,
  //     store: storeMocks.store
  //   })
  //   etablissementPanelInfo = wrapperEPI.vm
  // })
  // TODO
  // test('tvaIntracommunautaire) is correctly computed', () => {
  //   expect(etablissementPanelInfo.tvaIntracommunautaire).toBe('FR80833057201')
  // })
});

describe("EtablissementSireneInfo.vue snapshot", () => {
  const localVue = createLocalVue();
  const storeMocks = createStoreMocks();
  const wrapperEPI = mount(EtablissementSireneInfo, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperEPI.vm.$el).toMatchSnapshot();
  });
});
