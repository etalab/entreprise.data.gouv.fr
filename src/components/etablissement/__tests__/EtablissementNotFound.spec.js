import EtablissementNotFound from "@/components/etablissement/EtablissementNotFound.vue";
import { createLocalVue, mount } from "@vue/test-utils";

describe("EtablissementNotFound.vue snapshot", () => {
  const localVue = createLocalVue();

  const wrapperENF = mount(EtablissementNotFound, {
    localVue
  });

  test("It match the snapshot", () => {
    expect(wrapperENF.vm.$el).toMatchSnapshot();
  });
});
