<script context="module">
  import i18n from "../../i18n"

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
  export let article;
</script>

<div class="flex-row">
  <div class="flex-grow" />
  <a href={"/edit/" + article.id}>{i18n("editThisArticle")}</a>
</div>

<article>{@html article.html}</article>

<style>
</style>
