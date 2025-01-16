<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let chart;

  // Beispiel-Daten
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Zeit auf der x-Achse
    datasets: [
      {
        label: 'Team A',
        data: [10, 20, 30, 40, 50, 60], // Punkteverlauf für Team A
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4, // Glättung der Linie
      },
      {
        label: 'Team B',
        data: [15, 25, 35, 45, 55, 65], // Punkteverlauf für Team B
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Team C',
        data: [5, 15, 25, 35, 45, 55], // Punkteverlauf für Team C
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Zeit',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Punktestand',
        },
        beginAtZero: true,
      },
    },
  };

  onMount(() => {
    const ctx = document.getElementById('teamChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data,
      options,
    });

    return () => {
      chart.destroy(); // Aufräumen beim Entfernen der Komponente
    };
  });
</script>

<div style="height: 400px; width: 600px;">
  <canvas id="teamChart"></canvas>
</div>