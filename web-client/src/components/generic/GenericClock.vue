<template>
  <div :class="className">
    <clock size="200px" :time="time" :color="color"></clock>
  </div>
</template>

<script>
import Clock from "vue-clock2";
export default {
  components: { Clock },

  props: {
    color: {
      type: String,
      required: false,
    },

    className: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      time: "10:40",
    };
  },
};
</script>
