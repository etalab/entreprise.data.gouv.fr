import Search from "@/components/Search.vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");
jest.mock("@/router/index.js");

describe("Results.vue", () => {
  let storeMocks;
  let wrapperSearch;
  let $route;

  beforeEach(() => {
    $route = {
      params: "mock-params",
      push: jest.fn(),
      path: "mock-path",
      query: {
        page: 2,
        fullText: "mock-fullText"
      }
    };

    storeMocks = createStoreMocks();

    wrapperSearch = shallowMount(Search, {
      localVue,
      store: storeMocks.store,
      mocks: { $route },
      stubs: ["router-link", "router-view"]
    });
  });

  test("Computed value showBackToResultsButton is falsy if not on etablissement page, \
      if numberResults > 1, and status === 200", () => {
    $route = {
      params: "mock-params",
      push: jest.fn(),
      path: "/results/mock-params",
      query: {
        page: 2,
        fullText: "mock-fullText"
      }
    };
    wrapperSearch = shallowMount(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            status: 200
          },
          search: {
            storedFullText: "mock-storedFullText"
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearchFullText: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        }
      }),
      mocks: { $route },
      stubs: ["router-link", "router-view"]
    });
    expect(wrapperSearch.vm.showBackToResultsButton).toBeFalsy();
  });

  test("Computed value showBackToResultsButton is falsy if on etablissement page, \
    if numberResults === 1, and status === 200", () => {
    $route = {
      params: "mock-params",
      push: jest.fn(),
      path: "/results/mock-params",
      query: {
        page: 2,
        fullText: "mock-fullText"
      }
    };
    wrapperSearch = shallowMount(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            status: 200
          },
          search: {
            storedFullText: "mock-storedFullText"
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearchFullText: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        }
      }),
      mocks: { $route },
      stubs: ["router-link", "router-view"]
    });
    expect(wrapperSearch.vm.showBackToResultsButton).toBeFalsy();
  });
  test("Computed value showBackToResultsButton is falsy only on etablissement page, \
    if numberResults > 1, and status !== 200", () => {
    $route = {
      params: "mock-params",
      push: jest.fn(),
      path: "/etablissement/mock-searchId",
      query: {
        page: 2,
        fullText: "mock-fullText"
      }
    };
    wrapperSearch = shallowMount(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            status: 404
          },
          search: {
            storedFullText: "mock-storedFullText"
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearchFullText: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        }
      }),
      mocks: { $route },
      stubs: ["router-link", "router-view"]
    });
    expect(wrapperSearch.vm.showBackToResultsButton).toBeFalsy();
  });

  test("At creation, if there is a query page, we set the correct page", () => {
    expect(storeMocks.mutations.setPage).toHaveBeenCalledWith(
      storeMocks.state,
      2
    );
  });

  // TODO: test when router-link will be testable
  // test('Clicking back to results buttons goes back to result page')
});

describe("Search.vue snapshot", () => {
  const storeMocks = createStoreMocks();

  const $route = {
    params: "mock-params",
    push: jest.fn(),
    path: "mock-path",
    query: {
      page: 2,
      fullText: "mock-fullText"
    }
  };

  const wrapperSearch = mount(Search, {
    localVue,
    store: storeMocks.store,
    mocks: { $route },
    stubs: ["router-link", "router-view"]
  });

  test("It match the snapshot when there arent results", () => {
    expect(wrapperSearch.vm.$el).toMatchSnapshot();
  });

  // TODO: test when router-link will be testable
  // test('It match the snapshot when there are results')
});
