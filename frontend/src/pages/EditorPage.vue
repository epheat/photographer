<template>
  <div class="ps-editor-page">
    <h1>Post Editor 💻</h1>
    <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
    <div class="options">
      <form-field v-model="title" label="Title" />
    </div>
    <div class="editor">
      <textarea :value="content" @input="update"/>
      <div class="rendered" v-html="compiledMarkdown"></div>
    </div>
    <div class="actions">
      <button @click="submit">Submit</button>
    </div>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import { marked } from 'marked';
import FormField from '../components/FormField.vue';
import { API, Auth } from 'aws-amplify';

export default {
  name: 'EditorPage',
  props: {

  },
  data() {
    return {
      title: "",
      content: "",
      successMessage: undefined,
      errorMessage: undefined,
    }
  },
  methods: {
    update(e) {
      this.content = e.target.value;
    },
    async submit() {
      try {
        let token = (await Auth.currentSession()).getIdToken().getJwtToken();
        let response = await API.post('ps-api', '/posts/new', {
          body: {
            post: {
              title: this.title,
              content: this.content,
            }
          },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.successMessage = response.message;
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitized: true });
    }
  },
  components: {
    Footer,
    FormField,
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/_colors.scss";

.ps-editor-page {
  padding: 0 10px;

  .options {
    margin: 0 auto;
    max-width: 500px;
  }
  h1 {
    text-align: center;
  }

  .success-message {
    color: $ps-green;
    text-align: center;
  }
  .error-message {
    color: $ps-red;
  }
}
.editor {
  display: flex;
  margin-bottom: 10px;
  textarea {
    flex: 1;
    padding: 15px;
    border: none;
    resize: none;
    outline: none;
  }
  .rendered {
    background-color: $ps-white;
    flex: 1;
    font-family: sans-serif;
    padding: 15px;
  }
}
</style>