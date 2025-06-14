var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}

// --- Nouvelle fonctionnalité : Ouverture et fermeture par glissé ---

let touchstartX = 0;
let touchendX = 0;
// Garde une trace si le toucher a commencé sur le menu lui-même ou sur le corps de la page
let isTouchingSidenav = false;

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
  // Vérifie si le toucher initial est sur le menu latéral
  if (sidenav.contains(e.target)) {
    isTouchingSidenav = true;
  } else {
    isTouchingSidenav = false;
  }
});

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Nombre de pixels pour détecter un glissé significatif

  // Glissé de gauche à droite (pour fermer le menu)
  if (touchendX > touchstartX + swipeThreshold && isTouchingSidenav) {
    if (sidenav.classList.contains("active")) {
      closeNav();
    }
  }
  // Glissé de droite à gauche (pour ouvrir le menu)
  else if (touchendX < touchstartX - swipeThreshold && !isTouchingSidenav) {
    // S'assure que le glissé commence près du bord droit de l'écran pour l'ouverture
    const screenWidth = window.innerWidth;
    const startPositionFromRight = screenWidth - touchstartX;
    const activationZone = 100; // Nombre de pixels depuis le bord droit pour activer l'ouverture

    if (startPositionFromRight <= activationZone && !sidenav.classList.contains("active")) {
      openNav();
    }
  }
}

// Optionnel : Permettre aussi de fermer en cliquant en dehors du menu
document.addEventListener('click', function(event) {
  // Si le clic n'est pas à l'intérieur du menu et que le menu est ouvert, et que le clic n'est pas sur le bouton d'ouverture
  if (!sidenav.contains(event.target) && !openBtn.contains(event.target) && sidenav.classList.contains("active")) {
    closeNav();
  }
});