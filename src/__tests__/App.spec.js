import App from "@/App.vue";
import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("router-link", RouterLinkStub);
jest.mock("@/store/index.js");
jest.mock("mapbox-gl", () => jest.fn());

describe("App.vue", () => {
  const storeMocks = createStoreMocks();
  const $route = {
    params: {
      siret: "83305720100018",
      searchId: "mock-searchId"
    },
    path: "mock-path",
    query: {
      page: "mock-page"
    }
  };

  const wrapperApp = mount(App, {
    localVue,
    store: storeMocks.store,
    mocks: { $route },
    stubs: ["router-view"]
  });

  test("It match the snapshot", () => {
    expect(wrapperApp.vm.$el).toMatchSnapshot();
  });
});
