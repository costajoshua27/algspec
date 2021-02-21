<template>
  <svg width="315" height="190" viewBox="0 0 315 190" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <path d="M228.375 91.8124C216.397 44.2412 296.467 10.7828 338 0V227.866H2.12623C0.392722 229.54 -0.153022 229.207 0.0353448 227.866H2.12623C6.95399 223.204 20.9941 202.972 54.0456 145.568C98.965 67.5511 188.982 77.2239 228.375 91.8124Z" fill="#293857"/>
    </g>
    <defs>
      <filter id="filter0_d" x="0" y="0" width="356" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dx="10" dy="8"/>
        <feGaussianBlur stdDeviation="4"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'Blob3'
}
</script>

<style lang="scss" scoped>
  svg {
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>