<template>
  <div>
    <h1>{{ title }}</h1>
    <img :src="imageUrl" alt="astro bild" />
    <p>{{ explanation }}</p>
    <p v-if="copyright">Copyright: {{ copyright }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      imageUrl: "",
      explanation: "",
      copyright: "",
    };
  },
  mounted() {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=bLKsuQaFpHG3mK8eo9UwyCI1RXpF9CKf8DqVYmiW&start_date=2025-01-30"
    )
      .then((response) => response.json())
      .then((data) => {
        this.title = data.title;
        this.imageUrl = data.url;
        this.explanation = data.explanation;
        this.copyright = data.copyright;
      })
      .catch((error) => console.error("Fetch error:", error));
  },
};
</script>

<style scoped>
/* CSS här */
h1 {
  color: #333;
}
</style>
