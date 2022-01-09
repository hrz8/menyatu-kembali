import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'sweetalert2/dist/sweetalert2.all'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
