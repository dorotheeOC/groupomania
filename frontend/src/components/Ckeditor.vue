<template>
<section id="main">
    <small><p class="alert text-center" v-if="alert">{{reportMsg}}</p></small>
    <div class="col-lg-6 my-auto mx-auto">
        <div class="card bg-white pt-4 px-4">
            <form name="form" @submit.prevent="editPost()">
                <div class="marked">
                    <p>Ecris ton nouveau super post !</p>
                    <div class="gradient-marked"></div>
                </div>
                <div class="form-group">
                    <label for="title">
                        <span class="sr-only">Titre</span>
                    </label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Titre du post" v-model="newPost.title"/>
                </div>
                <ckeditor :config="editorConfig" v-model="newPost.postContent"></ckeditor>
                <div class="form-group d-flex justify-content-end">
                <button class="btn btn-outline-primary btn-sm mt-2">
                    <span>Envoyer</span>
                </button>
                </div>
            </form>
        </div>
    </div>
</section>
</template>

<script>
import CKEditor from 'ckeditor4-vue';
import store from '../store';
import { mapState, mapGetters } from "vuex";

export default {
    name: 'Ckeditor',
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            editorId: 'editor',
            sent: '',
            editorConfig: {
                toolbar: [  
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic'] },
                    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'paragraph' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Language' ] },
                    { name: 'links', groups: [ 'links' ], items: [ 'Link', 'Unlink' ] },
                    { name: 'insert', groups: [ 'insert' ], items: [ 'Image', 'SpecialChar' ] },
                    { name: 'styles', groups: [ 'styles' ], items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },          
                ]
            }   
        }
    },
    beforeDestroy() {
        store.state.newPost = {};
        store.state.postId = null;
    },
    computed: {
        ...mapState({
            alert: "alert",
            reportMsg: "reportMsg"
        }),
        ...mapGetters({
            newPost: "newPost"
        }),
    },
    methods: {
        editPost() {
            this.sent = store.state.newPost.postContent;
            if(!store.state.postId) {
                this.$http.post('posts/', {
                    userId: store.state.userId, 
                    ...store.state.newPost
                }, {headers: {'Content-Type': 'application/json'}})
                .then((response) => {
                    store.state.totalItems++;
                    store.state.posts.unshift({...response.body, liked: 0, commented: 0}); //affiche le dernier post
                    store.state.posts.pop(); //supprime le 6e élément
                    let lastPage = store.state.pagination[store.state.pagination.length - 1]
                    if(store.state.posts.length >= 5 && store.state.totalItems % 5 == 1) { // 5 élements ? on ajoute une page à la pagination
                        lastPage++;
                        store.state.pagination.push(lastPage);
                    }
                    this.$router.push('/feed');
                })
                .catch(() => {
                    store.state.alert = true;
                    store.state.reportMsg = 'Il manque un titre ou un contenu !';
                    setTimeout(() => { store.state.alert = false; }, 2000);
                })
            } else {
                this.$http.put('posts/' + store.state.postId, {...store.state.newPost}, {headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    store.state.post.title = store.state.newPost.title;
                    store.state.post.postContent = store.state.newPost.postContent;
                    store.state.alert = true;
                    store.state.reportMsg = 'Le post a bien été modifié !';
                    setTimeout(() => { store.state.alert = false; }, 2000);
                    this.$router.go(-1);
                })
                .catch(error => {error});
            }     
        }
    }
}
</script>
<style lang="scss">
.cke_bottom {
        display:none!important;
}
.cke_contents {
        height: auto!important;
}
</style>