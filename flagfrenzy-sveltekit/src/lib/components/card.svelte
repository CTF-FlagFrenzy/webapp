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
  <button on:click={openModal} class="card h-96 w-72 my-4 bg-custom-110 border-0 card-{colorPicker(challenge.Difficulty)} {challenge.Solved ? 'text-Default' : 'text-white'} rounded-2xl text-left p-2.5">
    <h2 class="text-4xl" class:text-EasyPastel={challenge.Difficulty === 'Easy'}
    class:text-MediumPastel={challenge.Difficulty === 'Medium'}
    class:text-HardPastel={challenge.Difficulty === 'Hard'}
    class:text-ExpertPastel={challenge.Difficulty === 'Expert'}>{challenge.ChallengeName}</h2>
    <h3 class="text-3xl pb-2">Difficulty: <span class:text-Easy={challenge.Difficulty === 'Easy'}
      class:text-Medium={challenge.Difficulty === 'Medium'}
      class:text-Hard={challenge.Difficulty === 'Hard'}
      class:text-Expert={challenge.Difficulty === 'Expert'}>{challenge.Difficulty}</span></h3>
    <h3 class="text-3xl">Description:</h3>
    <p class=" text-gray-400">{challenge.Description.length > 130 ? challenge.Description.slice(0, 130) + "..." : challenge.Description}</p>
    <div class="flex items-center justify-around w-full h-1/2">
      <FontAwesomeIcon icon={faCircleCheck} class="{challenge.Solved ? 'text-Easy' : 'text-Default'} fa-2xl" />
    </div>
  </button>
</div>
<div>
  <Modal isOpen={isModalOpen} data={challenge} user={user} on:close={closeModal}></Modal>
</div>

<style lang="postcss">
</style>