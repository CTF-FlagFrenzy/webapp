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
          labels: {
            color: 'white',
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 8,
            boxHeight: 8,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
          grid: {
            color: '#444444', // Y-Achsen-Gitterlinien in Weiß
          },
        },
        y: {
          title: {
            display: true,
            text: 'Points',
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
          grid: {
            color: '#444444', // Y-Achsen-Gitterlinien in Weiß
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
      // Zeitstempel um eine Stunde verschieben und im korrekten Format speichern
      const date = new Date(curr.Time);
      const adjustedTime = date.toLocaleTimeString('en-GB'); // HH:mm:ss

      if (!acc[curr.Teamname]) {
        acc[curr.Teamname] = [];
      }

      // Zeitstempel aktualisieren
      acc[curr.Teamname].push({ ...curr, Time: adjustedTime });

      return acc;
    }, {});
  }

  //Extrahiere eindeutige Zeitstempel und sortiere sie
  function extractUniqueTimestamps(data) {
    const timestamps = [...new Set(data.map((item) => item.Time))];
    return timestamps
      .sort((a, b) => new Date(a) - new Date(b))
      .map((timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-GB'); // Nur die Zeit (hh:mm:ss) extrahieren
      });
  }

  //Erstelle Datensätze für jedes Team
  function createDatasets(groupedData, labels) {
    let index = 0;

    return Object.keys(groupedData).map((teamname) => {
      const allTeams = Object.keys(groupedData);
      const teamData = groupedData[teamname];
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
        label: `${teamname}`,
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

<canvas id="teamChart" class="text-white !w-full !h-full"></canvas>