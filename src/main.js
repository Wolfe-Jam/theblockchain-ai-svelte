// my-theblockchain-ai-app/src/main.js
import './app.css'; // This line imports your global Tailwind CSS styles
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
