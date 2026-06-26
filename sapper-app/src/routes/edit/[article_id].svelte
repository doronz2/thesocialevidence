<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`/api/article/${params.article_id}.json`);
    const data = await res.json();
    if (res.status === 200) {
      return { article: data };
    } else {
      this.error(res.status, data.message);
    }
  }
  
</script>

<script>
  import i18n from "../../i18n";
  export let article;

  import { onDestroy, onMount } from "svelte";

  let mirror;
  let html = article.html;
  let textarea;

  let stopped = false;
  onMount(() => {
    mirror = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      mode: "markdown",
    });
    console.log("Aid", article.id);
    const ref = firebase.database().ref().child(article.id);
    Firepad.fromCodeMirror(ref, mirror, {
      defaultText: article.text,
    });
    const md = window.markdownit({
      linkify: true,
      html: true,
    });

    let last = null;
    requestAnimationFrame(function loop() {
      const text = mirror.getValue();
      if (last != text) {
        last = text;
        html = md.render(text);
      }
      if (!stopped) {
        requestAnimationFrame(loop);
      }
    });
  });

  onDestroy(() => {
    stopped = true;
  });

  async function publish(article) {
    const response = await fetch(`/api/article/${article.id}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: mirror.getValue(),
        published: true,
      }),
    });
    await response.json();
  }

  async function unpublish(article) {
    const response = await fetch(`/api/article/${article.id}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        published: false,
      }),
    });
    await response.json();
  }
</script>

<div class="edit">
  <article>{@html html}</article>
  <div class="editor flex-column">
    <div class="flex-column">
      <div class="flex-gap" />
      <div class="flex-row">
        <a href={"/read/" + article.id}>{i18n("readPublishedVersion")}</a>
        <div class="flex-grow" />
        <button on:click={() => publish(article)}>{i18n("publish")}</button>
        <div class="flex-gap" />
        <button on:click={() => unpublish(article)}>{i18n("unpublish")}</button>
        <div class="flex-gap" />
      </div>
      <div class="flex-gap" />
    </div>
    <div class="code-mirror flex-grow">
      <textarea bind:this={textarea} class="textarea" />
    </div>
  </div>
</div>

<style>
  .edit {
    position: fixed;
    top: 48px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  article {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    overflow: auto;
    padding: 1em;
    box-sizing: border-box;
  }
  .editor {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 100%;
  }
  @media screen and (max-width: 1024px) {
    article {
      height: 50%;
      width: 100%;
    }
    .editor {
      width: 100%;
      height: 50%;
    }
  }
  .code-mirror textarea {
    display: none;
  }
</style>
