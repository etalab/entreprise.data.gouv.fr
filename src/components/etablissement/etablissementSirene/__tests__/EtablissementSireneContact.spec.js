import EtablissementSireneContact from "@/components/etablissement/etablissementSirene/EtablissementSireneContact.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");

describe("EtablissementSireneContact.vue", () => {
  test("Computed value formattedDate returns null if no date is present", () => {
    // TODO
  });

  test("Computed value formattedDate compute the correct date if present", () => {
    // TODO
  });

  test("it should compute the full name correctly if name and surname are present", () => {
    // TODO
  });

  test("it should display the name if only the name is present", () => {
    // TODO
  });

  test("it shouldnt display the name if only the first name is present", () => {
    // TODO
  });
});

describe("EtablissementSireneContact.vue snapshot", () => {
  const localVue = createLocalVue();
  const storeMocks = createStoreMocks();
  const wrapperEPC = mount(EtablissementSireneContact, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperEPC.vm.$el).toMatchSnapshot();
  });
});
