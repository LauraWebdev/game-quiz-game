<template>
  <footer>
    <div class="wrapper">
      <div class="copyright">&copy; 2022 - Laura</div>
      <div class="info">Luca hat auch was gemacht I guess der macht mir den content lmao</div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  & .wrapper {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-gap: 10px;
    align-items: center;
    max-width: 1140px;
    margin: 0 auto;
    padding: 20px 0;

    & .info {
      opacity: 0.4;
      line-height: 1.5em;
      text-align: right;
    }
  }
}
</style>