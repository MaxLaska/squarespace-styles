// Snap Scrolling

  document.addEventListener("DOMContentLoaded", function () {
    // Prüfen, ob Squarespace im Bearbeitungsmodus ist
    const isEditMode = document.body.classList.contains("sqs-edit-mode");

    if (!isEditMode) {
      // Scroll-Snapping aktivieren
      const sections = document.querySelectorAll(".page-section");

      // Aktivieren von Scroll-Snapping für den Live-Modus
      document.body.style.scrollSnapType = "y mandatory";
      sections.forEach(section => {
        section.style.scrollSnapAlign = "start";
      });
    } else {
      // Scroll-Snapping im Bearbeitungsmodus deaktivieren
      document.body.style.scrollSnapType = "none";
    }
  });
