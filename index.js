Vue.createApp({
  data() {
    return {
      data: [], // Här kommer API-datan att lagras
    };
  },
  mounted() {
    // Hämta data när appen är monterad
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=bLKsuQaFpHG3mK8eo9UwyCI1RXpF9CKf8DqVYmiW&start_date=2025-01-30"
    ) // exempel-API
      .then((response) => response.json())
      .then((data) => {
        this.data = data; // Sätt värdet till vår data
      })
      .catch((error) => console.error("Fetch error:", error));
  },
}).mount("#app");
