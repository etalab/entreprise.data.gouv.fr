import EtablissementHeaderTimestamp from "@/components/etablissement/etablissementHeader/EtablissementHeaderTimestamp";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { removeNbsp } from "@/../tests/fixtures.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("EtablissementHeaderTimestamp", () => {
  let component = mount(EtablissementHeaderTimestamp);

  test("It displays sirene and rna timestamp if available", () => {
    component.setProps({
      resultSirene: { updated_at: "2019-02-05T06:50:20.000Z" },
      resultRNA: { updated_at: "2019-02-04T06:50:20.000Z" }
    });

    expect(component.contains(".timestamps > p:first-of-type")).toBe(true);
    // Need to remove non-breaking spaces for jest
    expect(
      removeNbsp(component.find(".timestamps > p:first-of-type").text())
    ).toBe("Dernière mise à jour SIRENE : 05/02/2019");
    expect(component.contains(".timestamps > p:nth-of-type(2)")).toBe(true);
    expect(component.find(".timestamps > p:nth-of-type(2)").text()).toBe(
      "Dernière mise à jour RNA : 04/02/2019"
    );
  });

  test("It displays only sirene timestamp if only available", () => {
    component.setProps({
      resultSirene: { updated_at: "2019-02-05T06:50:20.000Z" },
      resultRNA: null
    });

    expect(component.contains(".timestamps > p:first-of-type")).toBe(true);
    expect(
      removeNbsp(component.find(".timestamps > p:first-of-type").text())
    ).toBe("Dernière mise à jour SIRENE : 05/02/2019");
    expect(component.contains(".timestamps > p:nth-of-type(2)")).toBe(false);
  });
  test("It displays nothing if nothing is available", () => {
    component.setProps({
      resultSirene: null,
      resultRNA: null
    });
    expect(component.contains(".timestamps > p:first-of-type")).toBe(false);
  });
});
