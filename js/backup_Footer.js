
  document.addEventListener("DOMContentLoaded", () => {
    // Wähle den Hauptcontainer mit den Sektionen
    const sectionsContainer = document.querySelector(".sections");
    const sections = document.querySelectorAll(".section");

    if (sectionsContainer && sections.length > 0) {
      // Scroll-Snap-Eigenschaften für den Hauptcontainer
      sectionsContainer.style.scrollSnapType = "y mandatory";
      sectionsContainer.style.overflowY = "scroll";
      sectionsContainer.style.height = "100vh";

      // Scroll-Snap-Eigenschaften für jede Sektion
      sections.forEach((section) => {
        section.style.scrollSnapAlign = "start";
        section.style.height = "100vh";
      });

      console.log("Scroll-Snap aktiviert für .sections und .section.");
    } else {
      console.warn("Keine gültigen .sections- oder .section-Elemente gefunden.");
    }
  });
