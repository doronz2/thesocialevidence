<script>
  import * as sapper from "@sapper/app";
  import i18n from "../i18n"
//a post request (with a specified url for atricle author)
  let title = "";
  async function create() {
    title = title.trim();
    if (!title) return;
    const response = await fetch("/api/articles.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author: firebase.auth().currentUser.email,
      }),
    });
    const article = await response.json();
    sapper.goto("/edit/" + article.id);
  }
</script>

<h1>{i18n("newArticle")}</h1>
<!-- on clicking submit, call the create function -->
<form class="flex-row" on:submit|preventDefault={create}>  
  <input class="flex-grow" type="text" bind:value={title} placeholder={i18n("title")} />
  <div class="flex-gap" />
  <input type="submit" value={i18n("create")} />
</form>

<style>
</style>
