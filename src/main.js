import { createApp } from "vue";
import "./style.css"; // om jag vill importera stilar direkt i js
import App from "./App.vue";

createApp({
  data() {
    return {
      data: [], // här lagras datan från api
    };
  },
  mounted() {
    // när appen är laddad så anropar den API och hämtar datan. så när appen är redo -> hämta data
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=bLKsuQaFpHG3mK8eo9UwyCI1RXpF9CKf8DqVYmiW&start_date=2025-01-30"
    )
      .then((response) => response.json())
      .then((data) => {
        this.data = data; // Sätt värdet till vår data
      })
      .catch((error) => console.error("Fetch error:", error));
  },
}).mount("#app");
