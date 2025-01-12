/*
// laz-i.com Custom Id   

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(function(section) {
        // Find the div with a custom-section-id attribute within the section
        var divWithCustomId = section.querySelector('div[custom-section-id]');
        if (divWithCustomId && divWithCustomId.getAttribute('custom-section-id')) {
            // Set the section's id to match the div's custom-section-id attribute value
            section.id = divWithCustomId.getAttribute('custom-section-id');
            
            // Handles overlapping code block
            var feBlock = divWithCustomId.closest('.fe-block');
            if (feBlock) {
                feBlock.style.pointerEvents = 'none';
            }
        }
    });
  });
*/

// Custom ID v 2

  document.addEventListener('DOMContentLoaded', function () {
    // Loop through all sections
    document.querySelectorAll('section').forEach(function (section) {
      // Check if there is a child div with the custom-section-id attribute
      const divWithCustomId = section.querySelector('div[custom-section-id]');
      if (divWithCustomId) {
        // Retrieve the custom-section-id value
        const customId = divWithCustomId.getAttribute('custom-section-id');
        if (customId) {
          // Assign the custom ID to the section element
          section.id = customId;

          // Optional: Handle overlapping code block scenarios
          const feBlock = divWithCustomId.closest('.fe-block');
          if (feBlock) {
            feBlock.style.pointerEvents = 'none';
          }
        }
      }
    });
  });

