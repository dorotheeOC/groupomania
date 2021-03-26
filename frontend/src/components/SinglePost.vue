<template>
<section id="main">
    <div class="mx-4">
        <small><p class="alert text-center" v-if="alert">{{reportMsg}}</p></small>
        <div class="col-lg-6 p-4 my-4 mx-auto">
            <div class="card py-4" >
                <a @click="goBack" class="back font-weight-bold px-4">	&larr; Retour</a>
            <div class="post-title pl-4 my-0">
                <h2 class="card-text my-0">{{post.title}}</h2>
                <div class="d-md-flex justify-content-start align-items-center">
                    <div class="card-text">
                        <small class="text-muted">De <a @click="getProfile(post.userId)">{{post.author}} </a></small>
                        <small class="text-muted mr-2" v-if="post.createdAt"> le {{dateFormat(post.createdAt)}}</small>
                    </div>
                    <a class="edit d-md-block" @click="editOnePost" v-if="post.userId === currentUser.id"><i class="fas fa-pen mr-1 p-0"></i>Modifier</a>
                </div>
                
            </div>
            <div class="card-body">
                <div class="card-text" v-html="post.postContent"></div>
                <div class="d-flex justify-content-start align-items-center stat-single">
                    <button @click.stop="likeOnePost" class="btn btn-outline-primary btn-sm">Aimer ce post</button>
                    <span  class="card-text my-0">
                    <i class="far fa-heart" v-if="!liked"></i>
                    <i class="fas fa-heart" v-else></i>
                        {{post.liked }}
                    </span>
                    <span class="card-text my-0"><i class="far fa-comment-dots"></i>{{post.commented}}</span>
                    <a class="report text-muted ml-3 p-1" @click.prevent="deleteOnePost(post.id)" v-if="currentUser.role === 'admin' && post.createdAt || currentUser.id === post.userId && post.id">
                        <i class="fas fa-trash"></i>
                        <span>Supprimer</span>
                    </a>
                </div>
            </div>
            <ul class="list-group list-group-flush pt-4 p-md-4">
                <h3 class="card-text pl-4 pl-lg-0 my-0">Commentaires</h3>
                <p class="ml-4" v-if="post.commented === 0">Ecris le premier commentaire !</p>
                <li class="list-group-item ml-2"  v-for="(comment, index) in post.postComment" :key="comment.index">
                    <div class="card-text my-0 ml-lg-2 p-0">
                        <small class="text-muted" v-if="comment.userId !== null">De <a @click="getProfile(comment.userId)">{{comment.author}} </a></small>
                        <small class="text-muted" v-else>Utilisateur supprimé </small>
                        <small class="text-muted" v-if="comment.createdAt">le {{dateFormat(comment.createdAt)}}</small>
                        <small class="text-muted" v-else>maintenant</small>
                    </div>
                    <div class="d-lg-flex align-items-center">
                        <p class="card-text comment m-0" :class="'comment--'+ index">{{comment.commentText}}</p>
                        <small>
                            <a class="report text-muted ml-3" @click.prevent="deleteOneComment(comment.id)" v-if="currentUser.role === 'admin' || comment.id === currentUser.id">
                                <i class="fas fa-trash"></i>
                                <span>Supprimer ce commentaire</span>
                            </a>
                        </small>
                        <small>
                            <a class="report text-muted ml-3" @click="reportComment(comment.id)" v-if="currentUser.role === 'user' && comment.userId !== currentUser.id">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>Signaler ce commentaire</span>
                            </a>
                        </small>
                    </div>
                </li>
            </ul>
            <Comment v-model="commentText"/>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import Comment from '../components/Comment'
import store from '../store';
import { mapState, mapGetters } from "vuex";

export default {
    name: 'SinglePost',
    components: { Comment },
    data() {
        return {
            postId: this.$route.params.id,
            commentText: {}
		}
	},
    computed: {
        ...mapState({
            currentUser: "currentUser",
            alert: "alert",
            reportMsg: "reportMsg"
        }),
        ...mapGetters({
            post: "post",
            liked: "liked",
        })
    },
	mounted() {
        this.$http.get('posts/' + this.postId)
        .then((response) => { response.json()
            .then((data) => { 
                store.state.post = data;
                store.state.newPost = {
                    title: store.state.post.title, 
                    postContent: store.state.post.postContent
                }
                for (let liked of data.postLike) {
                    if (liked.userId === store.state.userId){
                        store.state.liked = true;
                    }
                }
            })  
        })
        .catch(error => {error})
	},
    beforeDestroy() {
        store.state.liked = false;
        store.state.newPost ={};
    },
    methods: {
        dateFormat(date) {
            const day = date.substring(8, 10);
            const month = date.substring(5, 7);
            const year = date.substring(0, 4);
            return `${day}.${month}.${year}`
        },
        editOnePost() {
            this.$router.push('/ckeditor');
            store.state.postId = this.postId;
        },
        likeOnePost() {
            this.$http.post('posts/' + this.postId + '/likes', {userId: store.state.userId}, {headers: {'Content-Type': 'application/json'}})
            .then((response) => { 
                store.state.post.liked += response.body.like //incrémente ou décrémente
                if (response.body.like === 1) {
                    store.state.liked = true;
                } else {
                    store.state.liked = false;
                }
            })
            .catch(error => {error})
        },
        deleteOnePost() {
            this.$http.delete('posts/' + this.postId)
            .then(() => { 
                this.$router.go(-1);
            })
            .catch(error => {error})
        },
        reportComment(id) {
            this.$http.put('posts/' + this.postId + '/comments/' + id, {reported: true}, {headers: {'Content-Type': 'application/json'}})
            .then(() => { 
                store.state.alert = true;
                store.state.reportMsg = 'Le signalement a bien été soumis !';
                setTimeout(() => { store.state.alert = false; }, 2000);
            })
            .catch(error => {error})
        },
        deleteOneComment(id) {
            this.$http.delete('posts/' + this.postId + '/comments/' + id)
            .then(() => { 
                for (let i = 0; i < store.state.post.postComment.length; i++) {
                    if (store.state.post.postComment[i].id === id) {
                        const index = i
                        store.state.post.postComment.splice(index, 1)
                        store.state.post.commented--
                        break;
                    }
                }
            })
            .catch(error => {error})
        },
        getProfile(id) {
            if(id !== store.state.userId && id !== null) {
                this.$router.push(`/users/${id}`);
            } else {
                this.$router.push('/profile');
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss">
.profile-img-card {
  border-radius: 8rem;
  width: 5rem;
}
</style>