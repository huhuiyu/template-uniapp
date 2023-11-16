<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	.d-flex {
    display: flex;
  }
  .d-flex-center {
    justify-content: center;
  }
  .p-1 {
    padding: 1rem;
  }
  .text-center {
    text-align: center;
  }
</style>
