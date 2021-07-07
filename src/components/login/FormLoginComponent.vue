<template>
    <div class="wrapper fadeInDown row align-items-center">
        <div id="formContent">
            <!-- Tabs Titles -->

            <!-- Icon -->
            <div class="fadeIn first">
            <img src="../../assets/logo-hey.png" id="icon" alt="Logo" />
            </div>

            <!-- Login Form -->
            <input v-model="user"  @keyup.enter="login" type="text" id="login" class="fadeIn second text-login" name="login" placeholder="User">
            <!--<input type="text" id="password" class="fadeIn third" name="login" placeholder="password">-->
            <button class="fadeIn fourth login" @click="login" >Ingresar</button>
        </div>
    </div>
</template>
<script>

export default {
    name: "login",
    data () {
        return {
            user: ''
        }
    },
    methods: {
        login() {
            if(this.user !== '') {
                this.$store.commit('assignUsername', this.user)
                    this.$router.push({
                    name: 'chatRooms'
                });
            }
            else {
                alert('you need to enter a user')
            }
        },
    },
    mounted() {
        
    }

}
</script>