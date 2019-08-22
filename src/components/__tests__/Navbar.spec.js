import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import NavBar from "@/components/Navbar.vue";
import { __createMocks as createStoreMocks } from "@/store/index.js";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");

describe("Navbar.vue", () => {
  let storeMocks;
  let wrapperNavBar;

  // Create a fresh store and wrapper instance for every test case.
  beforeEach(() => {
    storeMocks = createStoreMocks();

    wrapperNavBar = shallowMount(NavBar, {
      localVue,
      store: storeMocks.store
    });
  });

  test("It calls goToClearedHomePage when clicking on the logo", () => {
    wrapperNavBar.find(".navbar__logo").trigger("click");
    expect(storeMocks.actions.goToClearedHomePage.mock.calls).toHaveLength(1);
  });
});

describe("Results.vue snapshot testing", () => {
  const storeMocks = createStoreMocks();

  const wrapperNavBar = mount(NavBar, {
    localVue,
    store: storeMocks.store
  });

  test("It match the snapshot", () => {
    expect(wrapperNavBar.vm.$el).toMatchSnapshot();
  });
});
