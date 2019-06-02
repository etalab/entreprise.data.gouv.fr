import ResultsDidYouMean from "@/components/results/ResultsDidYouMean.vue";
import Vuex from "vuex";
import { __createMocks as createStoreMocks } from "@/store/index.js";
import { createLocalVue, mount } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index.js");
jest.mock("@/components/results/ResultsDidYouMean.vue");

describe("ResultsDidYouMean.vue Snapshot test", () => {
  const storeMocks = createStoreMocks();

  const wrapperDYM = mount(ResultsDidYouMean, {
    localVue,
    store: storeMocks.store
  });

  test("Snapshot test", () => {
    expect(wrapperDYM.vm.$el).toMatchSnapshot();
  });
});
