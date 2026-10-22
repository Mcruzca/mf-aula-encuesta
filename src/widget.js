// El navegador entiende esta clase; no es un componente Angular.
class Encuesta extends HTMLElement {
 constructor() { super(); this.attachShadow({ mode: 'open' }); }
 connectedCallback() {
   this.control?.abort();
   this.control = new AbortController();
   this.shadowRoot.innerHTML = `
    <style>:host {display:block} section {border:2px solid #087f8c;padding:20px;border-radius:8px} button {padding:10px;margin:5px;cursor:pointer}</style>
    <section><small>JAVASCRIPT PURO · localhost:4304</small><h2>Encuesta del taller</h2>
    <p id="saludo"></p><p>¿Te quedó clara la explicación?</p>
    <button data-respuesta="Sí, entendí">Sí, entendí</button>
    <button data-respuesta="Necesito otro ejemplo">Otro ejemplo</button>
    <p id="resultado" aria-live="polite">Todavía no respondiste.</p></section>`;
   this.shadowRoot.querySelector('#saludo').textContent = 'Tu opinión, ' + (this.getAttribute('participante') || 'participante');
   this.shadowRoot.querySelectorAll('button').forEach(button => {
     button.addEventListener('click', () => {
       const respuesta = button.dataset.respuesta;
       this.shadowRoot.querySelector('#resultado').textContent = 'Respuesta: ' + respuesta;
       this.dispatchEvent(new CustomEvent('aula-cambio', {
         detail: { message: respuesta }, bubbles: true, composed: true
       }));
     }, { signal: this.control.signal });
   });
 }
 disconnectedCallback() { this.control?.abort(); }
}
if (!customElements.get('aula-encuesta')) customElements.define('aula-encuesta', Encuesta);
