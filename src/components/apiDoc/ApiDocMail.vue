<template>
  <form class="text-center">
    <h4>Inscription Mailing-List</h4>
    <p>
      Vos données sont traitées par Mailjet.<br />
      Vos informations ne seront jamais utilisées à des fins commerciales.
    </p>
    <iframe
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src="https://app.mailjet.com/widget/iframe/zR1/ack"
      width="340"
      height="95"
    ></iframe>
  </form>
</template>

<script>
export default {
  name: "ApiDocMail"
};
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 0;
  margin-top: 20px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
iframe {
  margin: auto;
  @media screen and (max-width: $mobile) {
    width: 290px;
  }
}
</style>
