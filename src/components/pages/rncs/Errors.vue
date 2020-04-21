<template>
  <div>
    <div class="notification error">
      Erreur du service RNCS : {{ message }}
    </div>
    <h3>Pas de fiche disponible... Qu'est-ce que cela signifie ?</h3>
    <p>
      Un bandeau d'erreur indique la raison pour laquelle il n'est pas possible
      d'obtenir la fiche d'identité de l'entreprise. Par exemple, le message
      "Aucun dossier d'immatriculation connu pour ce siren." signifie qu'aucun
      enregistrement existe en base de données pour ce numéro siren.
    </p>

    <p>
      Il arrive aussi que la donnée en base soit difficile à exploiter pour
      constituer la fiche d'identité de l'entreprise, dont l'algorithme en
      question est détaillé
      <a
        href="https://github.com/etalab/rncs_worker_api_entreprise#constitution-des-fiches-dimmatriculation-au-rncs"
        >ici</a
      >. Ce dernier continue d'évoluer et de couvrir un périmètre de plus en
      plus large, de plus des corrections peuvent être transmisent par les
      greffes, alors n'hésitez pas à réessayer plus tard !
    </p>
  </div>
</template>

<script>
export default {
  name: "RNCSErrors",

  props: { message: String }
};
</script>
