// Event functions
function OnLoad() {
  straightPage();
  countPages();
  overlay();
  scalePage();
  straightPage();
}

function Scroll() {
  // Height can change on mobile whilst scrolling e.g chrome
}

function Resize() {
  scalePage();
}
// Events
//
//Trigger OnLoad() when page is fully loaded.
$(document).ready(function() {
  OnLoad();
})
//
//When page is scrolled
$(window).scroll(function() {
  Scroll();
});
$(window).resize(function() {
  Resize();
});
//
//Functions
var currentPage = 0; // Start page
var pages = 0; // Amount of pages we have
// Count the amount of pages we have
function countPages() {
  for (var found = false; !found;) {
    if ($(".page" + pages).length == 1) {
      pages++;
    } else {
      found = true;
      pages--;
    }
  }
}
// Scroll up or down, to any page number or right under or above the current page
function movePage(newPage, down) {
  // Check for defined direction if not given calculate automaticly
  if (isNaN(down) && !isNaN(newPage)) {
    if ($(".page" + currentPage).css("top") > $(".page" + newPage).css("top")) {
      down = false;
    } else {
      down = true;
    }
    straightPage();
  }
  // Check for defined newPage
  if (isNaN(newPage)) {
    if (down) {
      newPage = currentPage + 1;
    } else if (currentPage !== 0) {
      newPage = currentPage - 1;
    }
    straightPage();
  }
  scalePage();
  // Enable animation
  $(".page" + currentPage).css("transition", "1s");
  $(".page" + newPage).css("transition", "1s");
  // Place the currentPage above or under the visible screen, depending on direction
  if (down) {
    $(".page" + currentPage).css("top", -$(".height" + currentPage).height() + "px");
  } else {
    $(".page" + currentPage).css("top", $(document).height() + "px");
  }
  // "Freeze" the page so it wont cause any issues while hidden
  $(".page" + currentPage).css("position", "fixed");
  // Bring in the new page
  $(".page" + newPage).css("top", "0px");
  // Wait for the animation
  setTimeout(function() {
    $(".page" + newPage).css("position", "initial");
    // Disable animation
    $(".page" + currentPage).css("transition", "0s");
    $(".page" + newPage).css("transition", "0s");
    // Update currentPage
    currentPage = newPage;
    overlay();
    scalePage();
  }, 1000);
}
// Set the right configuration of pages
function straightPage() {
  for (var i = 0; i <= pages; i++) {
    $(".height" + i).css("height", $(window).height()); // Reset the height
    $(".height" + i).css("height", $(document).height()); // Set the actual height
    if (i !== currentPage) {
      if (i < currentPage) {
        $(".page" + i).css("top", -$(".height" + i).height());
      } else if (i > currentPage) {
        $(".page" + i).css("top", $(document).height());
      }
    }
  }
}
// Scale the content, for performance sake we seperate the same code from straightPage()
function scalePage() {
  console.log("scale");
  $(".height" + currentPage).css("height", $(window).height()); // Reset the height
  $(".height" + currentPage).css("height", $(document).height()); // Set the actual height
}
// Animate the scroll buttons(hide and show on first and last page)
function overlay() {
  if (currentPage == 0) {
    $(".btn-up").css("opacity", "0");
    $(".btn-up").css("right", "-60px");
  } else {
    $(".btn-up").css("opacity", "1");
    $(".btn-up").css("right", "20px");
  }
  if (currentPage == pages) {
    $(".btn-down").css("opacity", "0");
    $(".btn-down").css("right", "-60px");
    $(".btn-up").css("bottom", "20px");
  } else {
    $(".btn-down").css("opacity", "1");
    $(".btn-down").css("right", "20px");
    $(".btn-up").css("bottom", "80px");
  }
  if (currentPage % 2 == 0) {
    $(".navbar-custom").css("background-color", "rgba(33, 33, 33, 0.7)")
  } else {
    $(".navbar-custom").css("background-color", "rgba(13, 13, 13, 0.7)")

  }
}
