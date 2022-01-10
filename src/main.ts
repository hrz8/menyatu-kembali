import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'sweetalert2/dist/sweetalert2.all'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props: {
    ready: false
  }
});

(window as any).initMap = function ready() {
	app.$set({ ready: true });
}

export default app
