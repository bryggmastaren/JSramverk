<template>
  <div>
    <form>
      <!-- v-modeln binder input-fältet till selectedDate. när användaren väljer datum uppdateras det automatiskt 
       @click="updateBtn()" när button klickas på körs metoden updateBtn()-->

      <input type="date" id="dateInput" v-model="selectedDate" placeholder="Pick a date" aria-label="Enter a date ">
      <button class="button" type="button" @click="updateBtn()"> Update </button>
    </form>
    <!-- Titel och datum visas här -->
    <h1>{{ title }}</h1>
    <p> {{ selectedDate }}</p>

    <!-- Bilden/videon visas här. v-bind används genom ":" innan "src" -->
    <div v-if="isVideo">
  <video :src="imageUrl" controls alt="astro video"></video>
</div>
<div v-else>
  <img :src="imageUrl || defaultImageUrl" alt="astro bild" class="apod-image"/>
</div>

    <p id="explan">{{ explanation }}</p>
    <!-- -->
    <p id="copyright"> Copyright: {{ copyright }}</p>

    <!-- kan även skrivas såhär
    vue
Copy
<p>Copyright: {{ copyright || "No copyright information." }}</p>
och i fetchAPOD():

javascript
Copy
this.copyright = data.copyright; // Ta bort fallback-strängen här-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0],
      date: "",
      title: "",
      imageUrl: "",
      explanation: "",
      copyright: "",
      isVideo: false, // För att kontrollera om det är en video
      defaultImageUrl: "media/favicon(1).ico", // Fallbackbild om ingen bild hämtas
    };
  },
 mounted() { 
  this.fetchAPOD()
},
methods:{
  async fetchAPOD(){
  const apiKey = "bLKsuQaFpHG3mK8eo9UwyCI1RXpF9CKf8DqVYmiW";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${this.selectedDate}`;

  try {
  const response = await fetch(url)
const data = await response.json()

        this.date = data.date === "No date";
        this.isVideo = data.media_type === "video";
        this.title = data.title || "No Title"; // titel, annars "no title"
        this.imageUrl = data.url || this.defaultImageUrl; // Hämta hdurl eller fallback bilden
        this.explanation = data.explanation || "No explanation available.";
        this.copyright = data.copyright || "No copyright information.";
      
    }
     catch(error) { 
      console.error("Fetch error:", error);
  }
},
updateBtn() {
  this.fetchAPOD();
}}};

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