import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import SearchBar from "@/components/search/SearchBar";
import { __createMocks as createStoreMocks } from "@/store/index.js";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");

describe("SearchBar.vue snapshot", () => {
  const storeMocks = createStoreMocks();

  const wrapperSearchBar = mount(SearchBar, {
    localVue,
    store: storeMocks.store
  });

  test("Snapshot test", () => {
    expect(wrapperSearchBar.vm.$el).toMatchSnapshot();
  });
});
