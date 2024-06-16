<template>
    <div class="user-modal">
        <button class="registerOrSignIn" v-if="!loggedIn" @click="changeUserView">{{ reg ? "Go to Sign In" : "Go to register" }}</button>
        <div class="register" v-if="reg && !loggedIn" v-motion-slide-right>
            <h1>Register</h1>
            <p><input type="text" placeholder="email" v-model="email"></p>
            <p><input type="password" placeholder="password" v-model="password"></p>
            <button @click="register">Register</button><br><br>
        </div>
        <div class="signin" v-else-if="!loggedIn" v-motion-slide-right>
            <h1>Sign In</h1>
            <p><input type="text" placeholder="email" v-model="email"></p>
            <p><input type="password" placeholder="password" v-model="password"></p>
            <button @click="signIn">Sign In</button><br><br>
        </div>
        <div v-else>
            <p class="current-user" v-if="loggedIn == true">{{ auth.currentUser.email.replace(/@[^@]+$/, '') }}</p>
            <button @click="handleSignOut">Sign Out</button><br><br>
        </div>
        <p v-motion-pop class="error" v-if="errMsg && !loggedIn">{{ errMsg }}</p>
    </div>
</template>

<script setup>
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
    import { useRouter } from "vue-router";
    import { defineModel, onMounted, ref } from "vue";
    const router = useRouter();

    const auth = getAuth();
    const loggedIn = ref();
    const reg = ref(false);
    const email = defineModel('email');
    const password = defineModel('password');
    const errMsg = ref();
    
    const changeUserView = () => {
        reg.value = !reg.value;
        email.value = "";
        password.value = "";
    };

    const register = () => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Succesfuly registered!");
            console.log(getAuth().currentUser);
            router.push("/");
        })
        .catch((error) => {
            switch(error. code){
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password";
                    break; 
                case "auth/email-already-in-use":
                    errMsg.value = "Email is already in use";
                    break;
                case "auth/weak-password":
                    errMsg.value = "Password is too short. It must be at least 6 characters long";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect";
                    break;
            }

            setTimeout(() => { errMsg.value = null }, 5000);
        });
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Succesfuly signed in!");
            console.log(getAuth().currentUser);
            router.push("/");
        })
        .catch((error) => {
            switch(error. code){
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password";
                    break; 
                default:
                    errMsg.value = "Email or password was incorrect";
                    break;
            }

            setTimeout(() => { errMsg.value = null }, 5000);
        });
    }
    
    onMounted(() => {
        loggedIn.value = auth;
    })

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

    .error {
        color: white;
        background-color: red;
        border-radius: 2em;
        margin-left: 1em;
        margin-right: 1em;
        margin-top: 0;
    }

    input {
        border-radius: 2em;
        padding: 0.5em;
    }

    .user-modal {
        text-align: center;
        width: fit-content;
        border-radius: 2em;
        box-shadow: 0 4px 10px 0 black;
        margin: auto;
        margin-top: 5em;
        background-color: rgb(40, 40, 50);
        color: white;
    }

    .current-user {
        margin: 1em;
        background-color: rgb(20, 125, 190);
        border-radius: 2em;
        padding: 0.2em;
    }

    .register {
        margin: 1em;
    }

    .signin {
        margin: 1em;
    }

    button {
        font-family: 'Courier New', Courier, monospace;
        border-radius: 1em;
        color: white;
        background-color: rgb(20, 190, 120);
        border: 0;
        padding: 0.4em;
        margin: 0.2em;
        cursor: pointer;
    }

    button:hover {
        scale: 1.2;
        background-color: rgb(20, 125, 190);
        transition: 0.2s;
    }

    .registerOrSignIn {
        margin-top: 1em;
        margin-bottom: 0;
    }
</style>