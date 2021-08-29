<template>
  <div class="container">
    <h2 class="header text-white">On Upload Video</h2>
    <!--  @  body section start -->
    <div class="bar flex items-center">
      <!--  $  Graphic section start -->
      <svg>
        <circle cx="50%" cy="50%" r="50%"></circle>
      </svg>
      <!--  $  Graphic section End-->

      <!--  %  content section start -->
      <h1 class="number">{{$store.state.progress}}%</h1>
      <h4 class="config">Loading Robot</h4>
      <!-- %   content section End -->
  </div>
  <!--  @  body section End-->
</div>
</template>

<script>
export default {
  name: 'Progress Bar',
  props: [
    'progress'
  ]
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
.container .bar {
  width: 200px;
  height: 200px;
  /*   box-shadow: -10px -10px 20px #ffffffb2,
    inset 3px 3px 10px rgba(94, 104, 121, 0.288); */
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  background: #f9f9f9;
}
.bar::before {
  content: "";
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset -10px -10px 50px #ffffffb2,
    inset 10px 10px 50px rgba(94, 104, 121, 0.945);
}
svg {
  width: 100%;
  height: 100%;
  position: relative;
  fill: none;
}
svg circle {
  position: absolute;
  stroke: rgba(209, 213, 219, var(--tw-bg-opacity));
  stroke-width: 0px;
  stroke-dashoffset: 500px;
  stroke-dasharray: 1200px;
  transform-origin: center;
  transform: scale(2);
  animation: bar 4s ease-in-out forwards;
}
.number {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.6em;
  font-family: monospace;
  color: #000;
}
.header {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1em;
  font-family: "Lemonada", cursive;
  color: #000;
  letter-spacing: 1px;
  animation: header 500ms 1.8s linear;
}
.config {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-family: cursive;
  color: #000;
  letter-spacing: 1px;
  text-align: center;
  max-height: 0;
  animation: blink 500ms 1.8s forwards;
}
/* ///////////bar/////// */
@keyframes bar {
  0% {
    stroke-dashoffset: -800px;
  }
  100% {
    stroke-dashoffset: calc(500px - (500px * 90)/ 100);
    stroke-width: 40px;
    }
}

/* ///////////blink///////// */
@keyframes blink {
  to {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
}
/* ///////////blink///////// */
@keyframes header {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0.5;
  }
}

/* ------Start Media Queries Section------- */

@media (max-width: 768px) {
  .container {
    width: 100vw;
    height: 100vh;
    transform: scale(0.8);
  }
}
@media (max-width: 450px) {
  .container {
    width: 100vw;
    height: 100vh;
    transform: scale(0.4);
  }
}
@media (max-width: 170px) {
  .container {
    width: 100vw;
    height: 100vh;
    transform: scale(0.3);
  }
}
@media (max-width: 500px) {
  .header {
    text-align: center;
    font-size: 1em;
  }
}
@media (max-width: 300px) {
  .header {
    text-align: center;
    font-size: 14px;
  }
}
/* -------End Media Queries Section-------- */
</style>
