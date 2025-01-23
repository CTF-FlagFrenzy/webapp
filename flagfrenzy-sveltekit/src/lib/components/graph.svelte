<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let chart;
  export let data;

  onMount(() => {
    // Daten für die Teams gruppieren
    const groupedData = groupDataByTeams(data);
    const labels = extractUniqueTimestamps(data); // Extrahiere Zeitstempel für die X-Achse
    const datasets = createDatasets(groupedData, labels);

    // Chart-Optionen
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Points',
          },
          beginAtZero: true,
        },
      },
    };

    // Erstelle den Chart
    const ctx = document.getElementById('teamChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options,
    });

    return () => {
      chart.destroy(); // Aufräumen beim Entfernen der Komponente
    };
  });

  //Gruppiere Daten nach TeamID
  function groupDataByTeams(data) {
    return data.reduce((acc, curr) => {
      // Transformiere den Zeitstempel, um nur die Uhrzeit zu behalten
      const timeOnly = new Date(curr.Time).toLocaleTimeString('en-GB'); // HH:mm:ss

      if (!acc[curr.TeamID]) {
        acc[curr.TeamID] = [];
      }

      // Ersetze den Zeitstempel mit der Uhrzeit
      acc[curr.TeamID].push({ ...curr, Time: timeOnly });

      return acc;
    }, {});
  }

  //Extrahiere eindeutige Zeitstempel und sortiere sie
  function extractUniqueTimestamps(data) {
    const timestamps = [...new Set(data.map((item) => item.Time))];
    return timestamps
      .sort((a, b) => new Date(a) - new Date(b))
      .map((timestamp) => new Date(timestamp).toLocaleTimeString('en-GB')); // Nur die Zeit (hh:mm:ss) extrahieren
  }

  //Erstelle Datensätze für jedes Team
  function createDatasets(groupedData, labels) {
    let index = 0;

    return Object.keys(groupedData).map((teamID) => {
      const allTeams = Object.keys(groupedData);
      const teamData = groupedData[teamID];
      let lastKnownValue = 0; // Startwert für Punkte

      const dataPoints = labels.map((timestamp) => {
        const record = teamData.find((item) => item.Time === timestamp);
        if (record) {
          lastKnownValue = record.Points; // Aktualisiere den letzten bekannten Wert
        }
        return lastKnownValue; // Behalte den letzten bekannten Wert bei
      });

      const hue = (index / allTeams.length) * 360; // Verteile die Farben gleichmäßig über den Farbkreis
      const borderColor = `hsl(${hue}, 70%, 50%)`;
      const backgroundColor = `hsl(${hue}, 70%, 80%)`;

      const dataset = {
        label: `Team ${teamID}`,
        data: dataPoints,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        tension: 0, // Glättung (0 = keine)
        spanGaps: true, // Keine Lücken überbrücken
      };
      index++;
      return dataset;
    });
  }
</script>

<canvas id="teamChart"></canvas>