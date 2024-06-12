<template>
    <div class="user-modal">
        <div>
            <button v-if="loggedIn" @click="handleSignOut">Sign Out</button><br><br>
            <button @click="reg = !reg">Sign In / Register</button>
        </div>
        <div class="register" v-if="reg" v-motion-slide-right>
            <h1>Register</h1>
            <p><input type="text" placeholder="email" v-model="email"></p>
            <p><input type="password" placeholder="password" v-model="password"></p>
            <button @click="register">Register</button><br><br>
        </div>
        <div class="signin" v-else v-motion-slide-right>
            <h1>Sign In</h1>
            <p><input type="text" placeholder="email" v-model="email"></p>
            <p><input type="password" placeholder="password" v-model="password"></p>
            <button @click="signIn">Sign In</button><br><br>
            <button @click="SignInWithGoogle">Sign in with google</button>
            <p v-if="error">{{  }}</p>
        </div>
    </div>
</template>

<script setup>
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
    import { useRouter } from "vue-router";
    import { defineModel, ref } from "vue";
    const router = useRouter();

    const loggedIn = ref();
    const reg = ref(false);
    const email = defineModel("email");
    const password = defineModel("password");
    const error = ref();

    const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Succesfuly registered!");
            console.log(getAuth().currentUser);
            router.push("/");
        })
        .catch((error) => {
            console.log(error.code);
        })
    };

    const signIn = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Succesfuly signed in!");
            console.log(getAuth().currentUser);
            router.push("/");
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg. value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg. value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errMsg. value = "Incorrect password";
                    break; 
                default:
                    errMsg. value = "Email or password was incorrect";
                    break;
            }
        });
    }
    
    onAuthStateChanged(getAuth(), (user) => {
        user ? loggedIn.value = true : loggedIn.value = false;
    });

    const handleSignOut = () => {
        signOut(getAuth());
        console.log("Singed out");
    };

    const signInWithGoogle = () => {
        console.log("signInWithGoogle");
    };
</script>

<style scoped>
    .user-modal {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        border-radius: 2em;
        box-shadow: 0 4px 10px 0 black;
        margin: auto;
        margin-top: 5em;
        background-color: rgb(40, 40, 50);
    }

    .register {
        margin: 1em;
    }

    .signin {
        margin: 1em;
    }
</style>