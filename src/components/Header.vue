<template>
  <header>
    <div class="wrapper">
      <div class="brand">Game Quiz Game</div>
      <nav>
        <router-link to="/">Game</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  & .wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    align-items: center;
    max-width: 1140px;
    margin: 0 auto;

    & .brand {
      font-size: 14px;
      padding: 20px;
    }

    & nav {
      display: flex;
      gap: 10px;

      & a {
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #ffffff;

        &:hover {
          color: rgba(255,255,255,0.4);
        }
      }
    }
  }
}
</style>