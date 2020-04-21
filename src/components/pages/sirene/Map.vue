<template>
  <div class="map-container">
    <div v-if="haveNoMapInfo" id="map" class="panel contains-message">
      <p class="panel__message">
        Les données de géolocalisation ne sont pas disponibles pour cet
        établissement.
      </p>
    </div>
    <div v-else-if="mapboxglSupported" id="map" ref="map" class="panel"></div>
    <div v-else id="map" class="panel contains-message">
      <p class="panel__message">
        Votre navigateur ne supporte pas WebGL et ne peut pas afficher la carte de
        l’établissement.
      </p>
    </div>
    <p>
      Géolocalisation réalisée par <a href="https://etalab.gouv.fr" target="blank">Etalab</a>
      via <a href="https://adresse.data.gouv.fr/" target="blank">adresse.data.gouv.fr</a>
    </p>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { mapGetters } from 'vuex';
import { placeHolderIfEmpty } from "@/helpers";

const colors = {
  white: "#FFFFFF",
  red: "#C0392B",
  lighterBlue: "#11b4da",
  lightBlue: "#1e90da",
  blue: "#0081d5",
  darkBlue: "#274492"
};

export default {
  name: "Map",

  data() {
    return {
      mapTilesEtalab: "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
      etablissementPopup: new mapboxgl.Popup({
        closeButton: true
      }),
      mapboxglSupported: mapboxgl.supported()
    };
  },

  computed: {
    ...mapGetters({
      etablissement: "sirene/getEtablissement",
      etablissementsNearby: "sirene/getEtablissementsNearby"
    }),

    haveNoMapInfo() {
      return (this.etablissement && this.etablissement.geo_score == "0");
    },

    coordinates() {
      if (
        this.etablissement &&
        this.etablissement.longitude &&
        this.etablissement.latitude
      ) {
        return [this.etablissement.longitude, this.etablissement.latitude];
      }
      else { return null; }
    }
  },

  mounted() {
    axios.get(this.mapTilesEtalab)
      .then(response => { this.initMap(response.data); });
  },

  methods: {
    initMap: function(json) {
      if (this.haveNoMapInfo) return;
      let map = new mapboxgl.Map(this.mapOptions(json));
      // addOtherMarkets first so the etablissement marker will be on top
      this.addOtherMarkers(
        map,
        this.etablissement.siren
      );
      this.addEtablissementMarker(map);
      this.addPopupContent(
        this.etablissementPopup,
        this.etablissement
      );
    },

    mapOptions: function(json) {
      return {
        container: "map",
        style: json,
        center: this.coordinates,
        zoom: 13
      };
    },

    addEtablissementMarker(map) {
      new mapboxgl.Marker({ color: colors.red })
        .setLngLat(this.coordinates)
        .setPopup(this.etablissementPopup)
        .addTo(map);
    },

    addOtherMarkers: function(map) {
      map.on("load", () => {
        this.addSourceEtablissements(map, this.etablissementsNearby);
        this.addLayerEtablissements(map);
        this.addPopupsEtablissements(map);
      });
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

    addPopupContent(popup, etablissement) {
      popup.setHTML(
        "<p><strong>Enseigne</strong> :  " +
          placeHolderIfEmpty(etablissement.enseigne) +
          "</p>" +
          "<p><strong>Siret</strong> :  " +
          etablissement.siret +
          "</p>" +
          "<p><strong>Adresse</strong> :  " +
          placeHolderIfEmpty(etablissement.address) +
          "</p>"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  padding: 0;
  height: 350px;
  flex-shrink: 0;
}

.map-container {
  width: 48%;
}

@media screen and (max-width: $desktop) {
  .map-container {
    width: 100%;
  }
}

.panel__message {
  color: $color-dark-grey;
}

.mapboxgl-popup {
  max-width: 200px;
}

.contains-message {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
