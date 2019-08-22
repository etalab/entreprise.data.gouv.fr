import EtablissementMap from "@/components/etablissement/EtablissementMap.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

jest.mock("mapbox-gl", () => ({
  supported: jest
    .fn()
    .mockImplementationOnce(() => {
      return false;
    })
    .mockImplementationOnce(() => {
      return true;
    }),
  Popup: jest.fn()
}));

describe("EtablissementMap.vue snapshot when no webgl", () => {
  const localVue = createLocalVue();

  const wrapperEtablissementMap = mount(EtablissementMap, {
    localVue
  });

  test("It match the snapshot", () => {
    expect(wrapperEtablissementMap.vm.$el).toMatchSnapshot();
  });
});

describe("EtablissementMap.vue snapshot when webgl", () => {
  const localVue = createLocalVue();

  const wrapperEtablissementMap = mount(EtablissementMap, {
    localVue
  });

  test("It match the snapshot", () => {
    expect(wrapperEtablissementMap.vm.$el).toMatchSnapshot();
  });
});
