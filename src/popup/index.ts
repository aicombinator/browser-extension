import "../app.css";
import UI from '../components/UI.svelte';

const target = document.getElementById('app');
async function render() {
//   const {count} = await chrome.storage.sync.get({count: 0});
  new UI({target, props: {}});
}
document.addEventListener('DOMContentLoaded', render);