import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";
import ApiDoc from "@/components/ApiDoc";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("router-link", RouterLinkStub);
jest.mock("@/store/index.js");

describe("ApiDoc.vue snapshot testing", () => {
  const storeMocks = createStoreMocks();
  const wrapperAD = mount(ApiDoc, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperAD.vm.$el).toMatchSnapshot();
  });
});
