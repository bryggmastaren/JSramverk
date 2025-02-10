<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- Bilden visas här -->
    <div v-if="isVideo">
  <video :src="imageUrl" controls alt="astro video"></video>
</div>
<div v-else>
  <img :src="imageUrl || defaultImageUrl" alt="astro bild" class="apod-image"/>
</div>

    <p id="explan">{{ explanation }}</p>
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
        isVideo: false, // För att kontrollera om det är en video
      defaultImageUrl: "media/favicon(1).ico", // Fallbackbild om ingen bild hämtas
    };
  },
 mounted() {
  fetch(
    "https://api.nasa.gov/planetary/apod?api_key=bLKsuQaFpHG3mK8eo9UwyCI1RXpF9CKf8DqVYmiW&start_date=2025-02-10"
  )
    .then((response) => response.json())
    .then((data) => {
      // hämta 0e datan ur arrayn
      const firstImage = data[0];
console.log(data[0])
      // Kontrollera om data finns
      if (firstImage) {
        this.isVideo = firstImage.media_type === "video";
        this.title = firstImage.title || "No Title"; // titel, annars "no title"
        this.imageUrl = firstImage.url || this.defaultImageUrl; // Hämta hdurl eller fallback bilden
        this.explanation = firstImage.explanation || "No explanation available.";
        this.copyright = firstImage.copyright || "No copyright information.";
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}
};
</script>
<style scoped>
/* APOD bilden */
.apod-image {
  max-width: 100%; 
  height: auto;      /* behåller bildens proportioner */
  border-radius: 8px; /* runda hörn */
  margin: 20px 0;    /* avstånd höger vänster */
}
</style>