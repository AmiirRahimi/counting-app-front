<template>
    <client-only>
        <body class="user-dashboard no-touch">
            <SharedTopBar/>
            <div class="user-wraper">
                <div class="container">
                    <div class="row">
                        <div class="d-flex">
                            <!-- <client-only> -->
                                <SharedUserSlideBar/>
                                <div class="user-content" style="height:min-content">
                                    <div class="user-panel">
                                        <Nuxt/>
                                    </div>
                                </div>
                            <!-- </client-only> -->
                        </div>
                    </div>
                    <!-- .d-flex -->
                </div>
                <!-- .container -->
            </div>
            <!-- UserWraper End -->
                <SharedFooter/>
        </body>
    </client-only>
</template>

<script>
export default {
    name:'default',
    data () {
        return {
        }
    },
    computed: {
        // CheckUserAuthentication(){
        //     this.$store.dispatch('Account/ChechAuthenticated')
        // },
        UserAuthenticationState(){
            return this.$store.getters['Account/GetUserAuthenticationState']
        },
        
    },
    mounted () {
        if (this.$cookies.get('access') != null) {
            this.$store.dispatch('Account/ChechAuthenticated')
        }else{
            this.$router.push('/login')
        }
    },
    watch: {
        UserAuthenticationState(){
            if (this.$store.getters['Account/GetUserAuthenticationState'] == false) {
                this.$router.push('/login')
            }
        }
    }
}
</script>