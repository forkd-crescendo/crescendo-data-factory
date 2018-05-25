<template>
  <div id="app">
    <section>
      <div class="container">
        <table class="table is-striped is-fullwidth">
          <thead>
            <th>Avatar</th>
            <th>Code</th>
            <th>Videos</th>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.name">
              <td class="td-avatar">
                <img :src="user.avatar" :alt="user.name">
              </td>
              <td class="code">
                <pre>{{ user }}</pre>
              </td>
              <td class="td-videos">
                <div>
                  <div v-for="artwork in user.artworks" :key="artwork.videoURL">
                    <a :href="artwork.videoURL">
                      <img :src="artwork.thumbnail" :alt="artwork.title">
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import users from "@/../factory/users";

export default {
  name: "app",
  data() {
    return {
      users
    };
  }
};
</script>

<style lang="scss" scoped>
.td-avatar {
  vertical-align: middle;
}
.td-videos {
  vertical-align: middle;
}
.code {
  pre {
    word-wrap: break-word;
    white-space: pre-wrap;
  }
}
</style>
