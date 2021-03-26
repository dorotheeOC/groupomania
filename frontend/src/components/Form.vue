<template>
<section id="main">
    <div class="col-lg-2 mx-auto my-auto">
        <small><p class="alert text-center" v-if="alert">{{error}}</p></small>
        <div class="card card-container align-items-center">
            <div class="marked">
                <p class="font-weight-bold" v-if="login === true">Connecte-toi !</p>
                <p class="font-weight-bold" v-else>Inscris-toi !</p>
                <div class="gradient-marked"></div>
            </div>
            <img id="profile-img" src="http://localhost:3000/images/default.png" alt="image utilisateur" class="profile-img-card" />
            <form name="form" @submit.prevent="find" v-if="login == true">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" v-model="currentUser.email"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" v-model="currentUser.password"/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">
                        <span>Valider</span>
                    </button>
                </div>
            </form>
            <form name="form" @submit.prevent="save" v-else>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" v-model="currentUser.email"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" v-model="currentUser.password"/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">
                        <span>Valider</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
</template>
<script>

import { mapState } from "vuex";
import store from '../store';

export default {
    name: 'Form',
    computed: {
		...mapState({
			currentUser: "currentUser",
            login: "login",
            alert: "alert",
            error: "error"
		}),
	},
    beforeDestroy() {
        store.state.error = '';
    },
    methods: {
        find() {
            this.$http.post('auth/login',
            {email: store.state.currentUser.email, password: store.state.currentUser.password}, 
            {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                response.json().then((data) => {
                    localStorage.setItem('jwt', JSON.stringify(data))
                    store.state.auth = true;
                    if(store.state.currentUser.email === "admin@gmail.com") {
                        store.state.currentUser.role = 'admin';
                        this.$router.push("/report");
                    } else {
                        this.$router.push("/feed");
                    }   
                })  
            })
            .catch(() => {
                store.state.alert = true;
                store.state.error = 'Ton email ou ton mot de passe est incorrect !';
                setTimeout(() => { store.state.alert = false; }, 2000);
            })
		},
        save() {
            this.$http.post('auth/signup', 
            {email: store.state.currentUser.email, password: store.state.currentUser.password},
            {headers: {'Content-Type': 'application/json'}})
            .then((response) => { 
                console.log(response)
                this.$router.push("/");
            })
            .catch(() => {
                store.state.alert = true;
                store.state.error = 'Ton email existe déjà !';
                setTimeout(() => { store.state.alert = false; }, 2000);
            })
		}
	},

	
}
</script>
<style lang="scss">
.profile-img-card {
  border-radius: 8rem;
  width: 5rem;
}
</style>