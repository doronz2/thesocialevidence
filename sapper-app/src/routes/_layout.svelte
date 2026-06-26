<script>
  import * as sapper from "@sapper/app";
  import { user, login, logout } from "../auth.js";
  import i18n from "../i18n"

  let query = "";
  function search() {
    if (query) sapper.goto("/?q=" + encodeURIComponent(query));
    else sapper.goto("/");
  }
</script>

<nav class="flex-row flex-center">
  <a class="logo" href="/">{i18n("title")}</a>
  <div class="flex-gap" />
  <a rel="prefetch" href="/about">{i18n("about")}</a>
  {#if $user}
    <div class="flex-gap" />
    <a rel="prefetch" href="/new">{i18n("newArticle")}</a>
  {/if}
  <div class="flex-gap" />
  <form class="flex-grow" action="/" method="GET" on:submit|preventDefault={search}>
    <input type="text" placeholder={"🔍 "+ i18n("search")} bind:value={query} />
  </form>
  <div class="flex-gap" />
  {#if $user}
    <a href={"/user/" + $user.email} class="flex-row flex-center">
      <img src={$user.photoURL} class="avatar" alt="avatar" />
      <div class="flex-gap" />
      {$user.displayName}
    </a>
    <div class="flex-gap" />
    <button on:click={logout}>{i18n("logout")}</button>
  {:else}
    <button on:click={login}>{i18n("login")}</button>
  {/if}
</nav>

<main>
</main>

<style>
  nav {
    position: fixed;
    top: 0;
    left: -1em;
    right: -1em;
    padding: 0 2em;
    height: 48px;
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.125);
    background: white;
    z-index: 1;
  }
  main {
    margin: auto;
    margin-top: 64px;
    max-width: 48em;
  }
  .logo {
    font-family: "Akaya Telivigala", cursive;
    font-size: 32px;
  }
  input {
    display: block;
    outline: none;
    border: 1px solid transparent;
    width: 100%;
  }
  input:focus {
    border-bottom: 1px dashed dodgerblue;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
</style>
