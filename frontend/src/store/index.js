import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //data
    companyName: 'Groupomania',
    auth: false,
    token: null,
    currentUser: {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      role: null,
      userImage: {
        name: null
      }
    },
    file: null,
    imageUrl: '',
    user: {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      role: null,
      userImage: {
        name: null
      }
    },
    userFav: [],
    favId: 0,
    followers: [],
		following: false,
    userId: 0,
    login: true,
    message: false,
    visible: false,
    posts: [],
    comments: [],
    postsReported: [],
    commentsReported: [],
    totalItems: 0,
    totalPages: 0,
    pagination: [],
    currentPage: 0,
    search: {
      query: null
    },
    post: {
      userId: 0,
      title: null,
      author: null,
      createdAt: null,
      postContent: null,
      liked: 0,
      commented: 0,
      postComment:[]
    },
    liked: false,
    newPost: {}, 
    comment: {
      commentText: null
    },
    alert: false,
    error: null, 
    reportMsg: null
  },
  getters: {//computed
    auth: (state) => {
			return state.auth;
		},
    login: (state) => {
			return state.login;
		},
    userId: (state) => {
			return state.userId;
		},
    currentUser: (state) => {
			return state.currentUser;
		},
    user: (state) => {
			return state.user;
		},
    imageUrl: (state) => {
      const api = 'http://localhost:3000/images/'
      if(state.currentUser.userImage !== null) {
        return `${api}${state.currentUser.userImage.name}`
      } else {
        return `${api}default.png`
      } 
    },
    imageUrlUser: (state) => {
      const api = 'http://localhost:3000/images/'
      if(state.user.userImage !== null) {
        return `${api}${state.user.userImage.name}`
      } else {
        return `${api}default.png`
      } 
    },
    file: (state) => {
      return state.file;
    },
    posts: (state) => {
      return state.posts;
    },
    newPost: (state) => { 
      return state.newPost;
    },
    comments: (state) => {
      return state.comments;
    },
    postsReported: (state) => {
      return state.postsReported;
    },
    commentsReported: (state) => {
      return state.commentsReported;
    },
    totalItems: (state) => { 
      return state.totalItems;
    },
    totalPages: (state) => { 
      return state.totalPages;
    },
    pagination: (state) => { 
      return state.pagination;
    },
    search: (state) => { 
      return state.search;
    },
    post: (state) => { // un seul post
      return state.post;
    },
    liked: (state) => {
      return state.liked;
    },
    commentText: (state) => {
      return state.commentText;
    },
    footer: (state) => {
			const currentYear = new Date().getFullYear()
			return `${state.companyName} ${currentYear}`
		}
  },
  mutations: {//modification du state
    LOG_OUT(state) {
			state.auth = false;
      router.push("/");
      localStorage.clear();
      state.currentUser = {}
		},
    LOG_IN(state) {
			state.auth = true;
      router.push("/feed");
		},
    SHOW_INPUT(state) {
      state.visible = true;
    },
    HIDE_INPUT(state) {
      state.visible = false;
    },
    CONFIRM_DELETE(state) {
      state.message = true;
    },
    CANCEL(state) {
      state.message = false;
    },
  },
  actions: {//methods
    logout({ commit }) {
			commit("LOG_OUT")
		},
    login({ commit }) {
			commit("LOG_IN")
		},
    showInput({ commit }) {
			commit("SHOW_INPUT")
		},
    hideInput({ commit }) {
			commit("HIDE_INPUT")
		},
    confirmDelete({ commit }) {
			commit("CONFIRM_DELETE")
		},
    cancel({ commit }) {
			commit("CANCEL")
		},		
  },
  modules: {
  }
})
