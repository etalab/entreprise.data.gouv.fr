import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";
import ApiDocInput from "@/components/apiDoc/ApiDocInput";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("router-link", RouterLinkStub);
jest.mock("@/store/index.js");

describe("ApiDocInput.vue", () => {
  const storeMocks = createStoreMocks();
  const wrapperADI = mount(ApiDocInput, {
    localVue,
    store: storeMocks.store
  });

  test("Method activateButton activates the button", () => {
    wrapperADI.vm.$refs.goToButton.click = jest.fn();
    wrapperADI.vm.activateButton();
    expect(wrapperADI.vm.$refs.goToButton.click).toHaveBeenCalled();
  });
});

describe("ApiDocInput.vue snapshot testing", () => {
  const storeMocks = createStoreMocks();
  const wrapperADI = mount(ApiDocInput, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperADI.vm.$el).toMatchSnapshot();
  });
});
