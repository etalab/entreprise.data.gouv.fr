<template>
  <div>
    <home-apis />
    <home-public-administration />
    <api-doc-mail />
  </div>
</template>

<script>
import HomeAPIs from "@/components/home/HomeAPIs";
import HomePublicAdministration from "@/components/home/HomePublicAdministration";
import ApiDocMail from "@/components/apiDoc/ApiDocMail";

export default {
  name: "Home",
  metaInfo: {
    title: "Accueil"
  },
  components: {
    HomeApis: HomeAPIs,
    HomePublicAdministration: HomePublicAdministration,
    ApiDocMail: ApiDocMail
  }
};
</script>
