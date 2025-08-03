fetch("https://ipwho.is/")
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      document.getElementById("output").textContent = "Error: Unable to retrieve IP information.";
      return;
    }

    const output = `
| IP Address            : ${data.ip || "N/A"}
| City                  : ${data.city || "N/A"}
| Region                : ${data.region || "N/A"}
| Postal Code           : ${data.postal || "N/A"}
| Country               : ${data.country || "N/A"} (${data.country_code || "N/A"})
| Country Capital       : ${data.country_capital || "N/A"}
| Country Area (km²)    : ${data.country_area || "N/A"}
| Country Population    : ${data.country_population || "N/A"}
| Country Languages     : ${data.country_languages || "N/A"}
| Continent             : ${data.continent || "N/A"} (${data.continent_code || "N/A"})
| Latitude              : ${data.latitude || "N/A"}
| Longitude             : ${data.longitude || "N/A"}
| Timezone ID           : ${data.timezone?.id || "N/A"}
| Timezone Abbr         : ${data.timezone?.abbr || "N/A"}
| Timezone Code         : ${data.timezone?.code || "N/A"}
| Timezone UTC Offset   : ${data.timezone?.utc_offset || "N/A"}
| Timezone Offset (sec) : ${data.timezone?.offset_sec || "N/A"}
| DST Active            : ${data.timezone?.is_dst ? "true" : "N/A"}
| ISP                   : ${data.connection?.isp || "N/A"}
| ASN                   : ${data.connection?.asn || "N/A"}
| Organization          : ${data.connection?.org || "N/A"}
| Connection Domain     : ${data.connection?.domain || "N/A"}
| Connection Transport  : ${data.connection?.transport || "N/A"}
| Proxy                 : ${data.connection?.proxy ? "true" : "N/A"}
| Mobile Network        : ${data.connection?.mobile ? "true" : "N/A"}
| Currency Name         : ${data.currency?.name || "N/A"}
| Currency Code         : ${data.currency?.code || "N/A"}
| Currency Symbol       : ${data.currency?.symbol || "N/A"}
| Currency Plural       : ${data.currency?.plural || "N/A"}
| Currency ExchangeRate : ${data.currency?.exchange_rate || "N/A"}
| Threat - TOR          : ${data.threat?.is_tor ? "true" : "N/A"}
| Threat - Proxy        : ${data.threat?.is_proxy ? "true" : "N/A"}
| Threat - Anonymous    : ${data.threat?.is_anonymous ? "true" : "N/A"}
| Threat - Attacker     : ${data.threat?.is_known_attacker ? "true" : "N/A"}
| Threat - Abuser       : ${data.threat?.is_known_abuser ? "true" : "N/A"}
| Threat - Threat       : ${data.threat?.is_threat ? "true" : "N/A"}
| Threat - Bogon        : ${data.threat?.is_bogon ? "true" : "N/A"}
| Security - Is Crawler : ${data.security?.is_crawler ? "true" : "N/A"}
| Security - Is Datacenter: ${data.security?.is_datacenter ? "true" : "N/A"}
| Security - Is Anonymous: ${data.security?.is_anonymous ? "true" : "N/A"}
| Security - Is Public Proxy: ${data.security?.is_public_proxy ? "true" : "N/A"}
| Country Flag URL      : ${data.country_flag || "N/A"}
| Country Flag Emoji    : ${data.country_flag_emoji || "N/A"}
| Country Flag Unicode  : ${data.country_flag_emoji_unicode || "N/A"}
| Browser UserAgent     : ${navigator.userAgent || "N/A"}
| Screen Size           : ${screen.width && screen.height ? screen.width + "x" + screen.height : "N/A"}
`;


    document.getElementById("output").textContent = output.trim();
  })
  .catch(error => {
    document.getElementById("output").textContent = "Error loading IP information.";
    console.error(error);
  });
