<script>
  import Modal from '$lib/components/Modal.svelte';

  export let challenge;
  let isModalOpen = false;

  function openModal() {
    isModalOpen = true;
		console.log('isModalOpen:', isModalOpen); // Debugging
  }

  function closeModal() {
    isModalOpen = false;
  }
  function colorPicker(difficulty) {
    if(difficulty === 'Done') {
      return 'Default';
    } else {
      return difficulty;
    }
  }
</script>


<button on:click={openModal} class="card h-96 w-72 my-4 bg-custom-110 card-{colorPicker(challenge.Difficulty)} text-white rounded-2xl text-left p-2.5">
  <h2 class="text-4xl">{challenge.ChallengeName}</h2>
  <h3 class="text-3xl pb-2">Difficulty: <span class="text-{colorPicker(challenge.Difficulty)}">{challenge.Difficulty}</span></h3>
  <h3 class="text-3xl">Description:</h3>
  <p>{challenge.Description}</p>
  <div class="flex items-center justify-around w-full h-1/2">
    <i class="fa-regular fa-circle-check fa-xl"></i>
  </div>
</button>

<Modal isOpen={isModalOpen} data={challenge} on:close={closeModal}></Modal>