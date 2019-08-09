import colors from "@/components/mixins/colors";
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import Filters from "@/components/mixins/filters";

export default {
  data() {
    return {
      baseAdressSirenV2: process.env.VUE_APP_SIRENE_SIREN_V2
    };
  },
  methods: {
    addOtherMarkers: async function(map, siren) {
      const response = await this.getMarkersData(siren);
      map.on("load", () => {
        this.addSourceEtablissements(map, response.body);
        this.addLayerEtablissements(map);
        this.addPopupsEtablissements(map);
      });
    },
    getMarkersData: async function(siren) {
      const query = this.nearEtablissementQuery(siren);
      return await Vue.http.get(query);
    },
    addSourceEtablissements: function(map, data) {
      map.addSource("etablissements", {
        type: "geojson",
        data: data,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50
      });
    },
    addLayerEtablissements: function(map) {
      this.addLayerClusters(map);
      this.addLayerClustersText(map);
      this.addLayerPoints(map);
    },
    addLayerClusters(map) {
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "etablissements",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            colors.lightBlue,
            10,
            colors.blue,
            50,
            colors.darkBlue
          ],
          "circle-radius": ["step", ["get", "point_count"], 9, 10, 15, 50, 23]
        }
      });
    },
    addLayerClustersText(map) {
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "etablissements",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Noto Sans Regular"],
          "text-size": 12
        },
        paint: {
          "text-color": colors.white
        }
      });
    },
    addLayerPoints(map) {
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "etablissements",
        filter: ["!has", "point_count"],
        paint: {
          "circle-color": colors.lighterBlue,
          "circle-radius": 5,
          "circle-stroke-width": 1,
          "circle-stroke-color": colors.white
        }
      });
    },
    addPopupsEtablissements(map) {
      const vm = this;
      map.on("click", function(click) {
        const renderedFeatures = map.queryRenderedFeatures(click.point, {
          layers: ["unclustered-point"]
        });
        if (!renderedFeatures.length) {
          return;
        }
        const etablissementsPoints = renderedFeatures[0];
        const etablissementPopup = new mapboxgl.Popup()
          .setLngLat(etablissementsPoints.geometry.coordinates)
          .addTo(map);
        vm.addPopupContent(etablissementPopup, etablissementsPoints.properties);
      });
    },
    nearEtablissementQuery(siren) {
      return this.baseAdressSirenV2 + siren + "/etablissements_geojson";
    },
    addPopupContent(popup, etablissement) {
      popup.setHTML(
        "<p><strong>Enseigne</strong> :  " +
          Filters.filters.ifExist(etablissement.enseigne) +
          "</p>" +
          "<p><strong>Siret</strong> :  " +
          etablissement.siret +
          "</p>" +
          "<p><strong>Adresse</strong> :  " +
          Filters.filters.ifExist(etablissement.address) +
          "</p>"
      );
    }
  },
  mixins: [Filters]
};
