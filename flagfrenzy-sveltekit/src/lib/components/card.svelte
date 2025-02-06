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
</script>
<div class="transform transition-transform duration-200 hover:scale-105">
  <button on:click={openModal} class="card h-96 w-72 my-4 bg-custom-110 border-0 card-{colorPicker(challenge.Difficulty)} {challenge.Solved ? 'text-Default' : 'text-white'} rounded-2xl p-2.5">
    <h2 class="text-3xl text-center w-full block" class:text-EasyPastel={challenge.Difficulty === 'Easy'}
    class:text-MediumPastel={challenge.Difficulty === 'Medium'}
    class:text-HardPastel={challenge.Difficulty === 'Hard'}
    class:text-ExpertPastel={challenge.Difficulty === 'Expert'}>{challenge.ChallengeName}</h2>
    <hr class="my-4 border-t-2 border-gray-600 w-full opacity-100">
    <h3 class="text-2xl mb-4 text-left">Difficulty: <span class:text-Easy={challenge.Difficulty === 'Easy'}
      class:text-Medium={challenge.Difficulty === 'Medium'}
      class:text-Hard={challenge.Difficulty === 'Hard'}
      class:text-Expert={challenge.Difficulty === 'Expert'}>{challenge.Difficulty}</span></h3>
    <p class="{challenge.Solved ? 'text-Default' : 'text-gray-400'} text-justify">{challenge.Description.length > 130 ? challenge.Description.slice(0, 130) + "..." : challenge.Description}</p>
    <div class="flex items-center justify-around w-full h-1/2">
      <FontAwesomeIcon icon={faCircleCheck} class="text-{challenge.Solved ? challenge.Difficulty : 'Default'} fa-2xl" />
    </div>
  </button>
</div>
<div>
  <Modal isOpen={isModalOpen} data={challenge} user={user} on:close={closeModal}></Modal>
</div>