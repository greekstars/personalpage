fetch("https://ipwho.is/")
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      document.getElementById("output").textContent = "Error: Unable to retrieve IP information.";
      return;
    }

    const output = `
IP Address   : ${data.ip}
City         : ${data.city}
Region       : ${data.region}
Country      : ${data.country} (${data.country_code})
Continent    : ${data.continent} (${data.continent_code})
Latitude     : ${data.latitude}
Longitude    : ${data.longitude}
Timezone     : ${data.timezone?.id || "N/A"} (UTC${data.timezone?.utc_offset || ""})
ISP          : ${data.connection?.isp || "N/A"}
ASN          : ${data.connection?.asn || "N/A"}
Organization : ${data.connection?.org || "N/A"}
Currency     : ${data.currency?.name || "N/A"} (${data.currency?.code || ""})
Browser      : ${navigator.userAgent}
Screen Size  : ${screen.width}x${screen.height}
    `;

    document.getElementById("output").textContent = output.trim();
  })
  .catch(error => {
    document.getElementById("output").textContent = "Error loading IP information.";
    console.error(error);
  });
