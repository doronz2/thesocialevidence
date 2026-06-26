<script context="module">
  export async function preload({ params, query }) {
    let url = "/api/articles.json";
    if (query.q) {
      url = url + "?q=" + encodeURIComponent(query.q);
    }
    console.log("url", url);
    const res = await this.fetch(url);
    const data = await res.json();
    if (res.status === 200) {
      return { articles: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let articles;
</script>

<table>
  {#each articles as article}
    <tr>
      <td>
        <a rel="prefetch" href={"/user/" + article.author}>
          <img class="avatar" src={"/api/user/" + article.author + ".image"} alt={article.author} />
        </a>
      </td>
      <td class="flex-gap" />
      <td class="title">
        <a rel="prefetch" href={"/read/" + article.id}>{article.title}</a>
      </td>
      <td class="flex-gap" />
      <td>
        <a rel="prefetch" href={"/date/" + article.createdAt.split("T")[0]}>{article.createdAtFromNow}</a>
      </td>
    </tr>
  {/each}
</table>

<style>
  .title {
    max-width: 32em;
    overflow: hidden;
    text-overflow: ellipsis;
    color: dodgerblue;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: relative;
    top: 4px;
  }
</style>
