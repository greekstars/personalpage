(() => {
  // Detect OS
  function detectOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(ua)) return "Windows Phone";
    if (/win/i.test(ua)) return "Windows";
    if (/android/i.test(ua)) return "Android";
    if (/linux/i.test(ua)) return "Linux";
    if (/mac/i.test(ua)) return "MacOS";
    if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
    return "Unknown OS";
  }

  // Detect Device
  function detectDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
      ? "Mobile"
      : "Desktop";
  }

  // Date key YYYY-MM-DD
  function getDateKey() {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }

  // Format timestamp to HH:mm:ss
  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString();
  }

  // Load visitors array from localStorage
  function loadVisitors() {
    const raw = localStorage.getItem(visitorsKey);
    return raw ? JSON.parse(raw) : [];
  }

  // Save visitors array to localStorage
  function saveVisitors(arr) {
    localStorage.setItem(visitorsKey, JSON.stringify(arr));
  }

  // Add current visit if not added this session
  const visitorsKey = "visitorList-" + getDateKey();
  const sessionKey = "visited-" + getDateKey();
  let visitors = loadVisitors();

  if (!sessionStorage.getItem(sessionKey)) {
    visitors.push({
      timestamp: Date.now(),
      device: detectDevice(),
      os: detectOS()
    });
    saveVisitors(visitors);
    sessionStorage.setItem(sessionKey, "true");
  }

  // Create slider div
  const slider = document.createElement("div");
  slider.style.position = "fixed";
  slider.style.bottom = "0";
  slider.style.left = "50%";
  slider.style.transform = "translateX(-50%)";
  slider.style.background = "#007bff"; // blue background
  slider.style.color = "white";
  slider.style.padding = "12px 25px";
  slider.style.border = "2px solid white";
  slider.style.borderRadius = "15px 15px 0 0";
  slider.style.fontFamily = "Arial, sans-serif";
  slider.style.fontSize = "16px";
  slider.style.zIndex = "999999";
  slider.style.maxWidth = "400px";
  slider.style.textAlign = "center";
  slider.style.userSelect = "none";
  slider.style.boxShadow = "0 -2px 10px rgba(0,0,0,0.3)";
  slider.style.cursor = "pointer";
  slider.title = "Click to toggle visitor details";

  // Create visitor list container (hidden by default)
  const listContainer = document.createElement("div");
  listContainer.style.position = "fixed";
  listContainer.style.bottom = "50px";
  listContainer.style.left = "50%";
  listContainer.style.transform = "translateX(-50%)";
  listContainer.style.background = "#ffffffcc";
  listContainer.style.color = "#000";
  listContainer.style.maxHeight = "200px";
  listContainer.style.overflowY = "auto";
  listContainer.style.border = "2px solid #007bff";
  listContainer.style.borderRadius = "10px";
  listContainer.style.padding = "10px 15px";
  listContainer.style.fontFamily = "Arial, sans-serif";
  listContainer.style.fontSize = "14px";
  listContainer.style.zIndex = "999999";
  listContainer.style.maxWidth = "400px";
  listContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  listContainer.style.display = "none";
  listContainer.style.userSelect = "text";

  // Update slider text
  function updateSlider() {
    visitors = loadVisitors();
    const count = visitors.length;
    // Current visitor info (last added)
    const currentVisit = visitors[visitors.length - 1] || {};
    slider.textContent = `Visitors Today: ${count} | Your Device: ${currentVisit.device || "?"} | Your OS: ${currentVisit.os || "?"}`;
  }

  // Build visitor list HTML
  function buildVisitorList() {
    visitors = loadVisitors();
    if (visitors.length === 0) {
      listContainer.innerHTML = "<i>No visitors recorded today.</i>";
      return;
    }

    // Build list items with timestamp, device, OS
    listContainer.innerHTML = visitors
      .map(
        (v, i) =>
          `<div><strong>${i + 1}.</strong> ${formatTime(v.timestamp)} — Device: ${v.device}, OS: ${v.os}</div>`
      )
      .join("");
  }

  // Toggle list visibility on click
  slider.addEventListener("click", () => {
    if (listContainer.style.display === "none") {
      buildVisitorList();
      listContainer.style.display = "block";
    } else {
      listContainer.style.display = "none";
    }
  });

  updateSlider();
  document.body.appendChild(slider);
  document.body.appendChild(listContainer);

  // Update every 5 seconds to keep count fresh if multiple tabs
  setInterval(() => {
    updateSlider();
    if (listContainer.style.display !== "none") {
      buildVisitorList();
    }
  }, 5000);
})();
