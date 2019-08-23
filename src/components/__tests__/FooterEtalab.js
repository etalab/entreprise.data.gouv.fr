import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";
import FooterEtalab from "@/components/FooterEtalab";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("router-link", RouterLinkStub);
jest.mock("@/store/index.js");

describe("FooterEtalab.vue snapshot testing", () => {
  const storeMocks = createStoreMocks();
  const wrapperFooter = mount(FooterEtalab, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperFooter.vm.$el).toMatchSnapshot();
  });
});
