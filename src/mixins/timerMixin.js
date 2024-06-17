export default {
    data() {
      return {
        timer: null,
      };
    },
    methods: {
      updateTime() {
        this.$store.dispatch('updateElapsedTime');
      },
    },
    mounted() {
      this.timer = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  };
  