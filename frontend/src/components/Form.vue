<template>
<section id="main">
    <div class="col-lg-3 mx-auto my-auto">
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
                    <button class="btn btn-primary btn-block" v-if="!show">
                        <span>Valider</span>
                    </button>
                    <Timer v-else />
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
import Timer from './Timer'

export default {
    name: 'Form',
    components: { Timer },
    computed: {
		...mapState({
			currentUser: "currentUser",
            login: "login",
            alert: "alert",
            error: "error",
            show: "show"
		}),
	},
    beforeDestroy() {
        store.state.error = '';
    },
    methods: {
        find() {
            if(!store.state.show) {
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
                .catch((error) => {
                    store.state.alert = true;
                    if(error.status === 429) {
                        store.state.error = error.bodyText;
                        store.state.show = true;
                        let duration = 15 * 60 * 1000;
                        const timer = setInterval(() => {
                            store.state.limit.sec--;
                            if(store.state.limit.sec === 0) {
                                store.state.limit.sec = 60; 
                                store.state.limit.min--;
                            }
                        }, 1000)
                        setTimeout(() => {
                            clearInterval(timer)
                            store.state.show = false;
                        }, duration)
                    } else { 
                        store.state.error = error.body.error;
                    }
                    setTimeout(() => { store.state.alert = false; }, 2000);
                })
            }
		},
        save() {
            this.$http.post('auth/signup', 
            {email: store.state.currentUser.email, password: store.state.currentUser.password},
            {headers: {'Content-Type': 'application/json'}})
            .then((response) => { 
                console.log(response)
                this.$router.push("/");
            })
            .catch((error) => { console.log(error)
                store.state.alert = true;
                store.state.error = error.body.message;
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
