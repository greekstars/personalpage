document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ipwho.is/")
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        document.getElementById("output").textContent = "Error: Unable to retrieve IP information.";
        return;
      }

      const fields = [
        ['IP Address', data.ip],
        ['City', data.city],
        ['Region', data.region],
        ['Postal Code', data.postal],
        ['Country', data.country ? `${data.country} (${data.country_code})` : null],
        // Removed country_capital, country_area, country_population, country_languages - often empty
        ['Continent', data.continent ? `${data.continent} (${data.continent_code})` : null],
        ['Latitude', data.latitude],
        ['Longitude', data.longitude],
        ['Timezone ID', data.timezone?.id],
        ['Timezone Abbr', data.timezone?.abbr],
        ['Timezone UTC Offset', data.timezone?.utc_offset],
        // Removed timezone code, offset_sec, is_dst - sometimes missing
        ['ISP', data.connection?.isp],
        ['ASN', data.connection?.asn],
        ['Organization', data.connection?.org],
        // Removed connection.domain, transport, proxy, mobile - often missing
        ['Currency Name', data.currency?.name],
        ['Currency Code', data.currency?.code],
        ['Currency Symbol', data.currency?.symbol],
        // Removed currency plural, exchange_rate - often missing
        // Removed threat fields - often empty unless special IPs
        // Removed security fields - often empty
        ['Country Flag URL', data.country_flag],
        ['Country Flag Emoji', data.country_flag_emoji],
        ['Browser UserAgent', navigator.userAgent],
        ['Screen Size', (screen.width && screen.height) ? `${screen.width}x${screen.height}` : null],
      ];

      const output = fields
        .filter(([_, value]) => value !== null && value !== undefined && value !== "")
        .map(([label, value]) => `| ${label.padEnd(22)} : ${value}`)
        .join("\n");

      document.getElementById("output").textContent = output;
    })
    .catch(error => {
      document.getElementById("output").textContent = "Error loading IP information.";
      console.error(error);
    });
});
