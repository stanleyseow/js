Vue.component('my-comp', {
	data: function() {
  		return {
      	status: 0
      }
  },
  template: `<div>
  <p>Server Status: {{ status }} ( 
  			<button @click="changeStatus"> Change </button> ) </p>
        </div>`,
  methods: {
  	changeStatus: function() {
    	this.status = !+this.status;
    }
  
  }
} // end of components

)
new Vue({
  el: "#app",
  data: {

  },
})
