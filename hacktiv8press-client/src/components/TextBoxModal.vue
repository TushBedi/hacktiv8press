<template>
  <div>
    <button @click="clearInput" v-if="!id" type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#textBoxModal">
      Post new article
    </button>
    <button @click="clearInput" v-if="id" type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#textBoxModal">
      Edit
    </button>
    <button @click="deleteArticle(id)" v-if="id" type="button" class="btn btn-outline-danger">Delete</button>

    <div class="modal fade" id="textBoxModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="!id" class="modal-title">New Article</h5>
            <h5 v-if="id" class="modal-title">Edit Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input v-model="articleTitle" type="email" class="form-control" placeholder="Article Title">
            </div>
            <div class="form-group">
              <label>Upload an image here</label>
              <input name="image" ref="image" v-on:change="handleUploadImage"
              type="file" accept="image/*">
            </div>
            <div class="form-group">
              <vue-editor v-model="articleContent" :editorToolbar="customToolbar"></vue-editor>
            </div>
          </div>
          <div class="modal-footer">
            <button v-if="!id" @click="postArticle" type="button" :disabled="!articleTitle || !articleContent" class="btn btn-primary" data-dismiss="modal">Post Article</button>
            <button v-if="id" @click="editArticle" type="button" :disabled="!articleTitle && !articleContent" class="btn btn-primary" data-dismiss="modal">Update Article</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'TextBoxModal',
  components: {
    VueEditor
  },
  props: {
    id: {
      default: ''
    },
    item: {
      default: ''
    }
  },
  data () {
    return {
      articleTitle: '',
      articleContent: '',
      articleCategory: '',
      image: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'color': [] }, { 'background': [] }]
      ]
    }
  },
  methods: {
    ...mapActions([
      'addArticle',
      'updateArticle',
      'deleteArticle'
    ]),
    postArticle () {
      let payload = {
        title: this.articleTitle,
        content: this.articleContent,
        category: this.category,
        image: this.image
      }
      this.clearInput()
      this.addArticle(payload)
    },
    editArticle () {
      let payload = {
        title: this.articleTitle,
        content: this.articleContent,
        category: this.category,
        image: this.image,
        articleId: this.id
      }
      this.clearInput()
      this.updateArticle(payload)
    },
    handleUploadImage: function () {
      this.image = this.$refs.image.files[0]
      console.log(this.image)
    },
    clearInput () {
      this.articleTitle = ''
      this.articleContent = ''
      this.articleCategory = ''
      this.image = ''
    }
  }
}
</script>

<style lang="scss">
.modal-body {
  height: 350px;
  .quillWrapper {
    height: 210px;
  }
}

.form-group {
  padding-top: 10px;
}
</style>
