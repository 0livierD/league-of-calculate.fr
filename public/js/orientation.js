// Détecter si l'appareil est une tablette ou un téléphone
function isMobileDevice() {
    return (typeof window.screen !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Forcer le mode paysage
function forceLandscapeMode() {
    if (isMobileDevice()) {
        if (window.innerHeight > window.innerWidth) {
            alert("Veuillez basculer votre appareil en mode paysage.");
        }
    }
}

// Appeler la fonction pour forcer le mode paysage lors du chargement de la page
window.addEventListener("load", forceLandscapeMode);