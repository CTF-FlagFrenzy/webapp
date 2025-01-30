<script>
  import Modal from '$lib/components/Modal.svelte';
  import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  export let challenge;
  export let user;
  let isModalOpen = false;

  function openModal() {
    isModalOpen = true;
    console.log('isModalOpen:', isModalOpen); // Debugging
  }

  function closeModal() {
    isModalOpen = false;
  }

  function colorPicker(difficulty) {
    if (challenge.Solved) {
      return 'Default';
    } else {
      return difficulty;
    }
  }
  function iconColor() {
    return challenge.Solved ? 'text-green-500' : 'text-Default';
  }
  function textColor() {
    return challenge.Solved ? 'text-Default' : 'text-white';
  }
</script>

<button on:click={openModal} class="card h-96 w-72 my-4 bg-custom-110 card-{colorPicker(challenge.Difficulty)} {textColor()} rounded-2xl text-left p-2.5">
  <h2 class="text-4xl">{challenge.ChallengeName}</h2>
  <h3 class="text-3xl pb-2">Difficulty: <span class="text-{challenge.Difficulty}">{challenge.Difficulty}</span></h3>
  <h3 class="text-3xl">Description:</h3>
  <p>{challenge.Description}</p>
  <div class="flex items-center justify-around w-full h-1/2">
    <FontAwesomeIcon icon={faCircleCheck} class="{iconColor()} fa-2xl" />
  </div>
</button>

<Modal isOpen={isModalOpen} data={challenge} user={user} on:close={closeModal}></Modal>