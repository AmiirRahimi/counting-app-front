<template>
    <body class="user-ath">
        <div class="user-ath-page">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-8  text-center animate__slow" v-if="PhonenumberCondition" ref = "phonenumber">
                        <div class="user-ath-logo">
                            <a href="#">
                                <img src="images/logo-sm.png" srcset="images/logo-sm2x.png 2x" alt="icon">
                            </a>
                        </div>
                        <div class="user-ath-box">
                            <h4>جهت ورود شماره همراه خود را وارد کنید</h4>
                            <form action="index.html" class="user-ath-form">
                                <div class="note note-lg note-no-icon note-danger" v-show="ShowErr" ref="ShowErr">
                                    <p ref="ErrMsg"></p>
                                </div>
                                <div class="input-item">
                                    <input type="text" placeholder="09*********" class="input-bordered" v-model="phonenumber">
                                </div>
                                
                                <div class="gaps"></div>
                                <div class="d-flex justify-content-between align-items-center ">
                                    <button class="btn btn-primary col-md-12" @click.prevent="CheckPhonenumber">ورود به پنل</button>
                                </div>
                            </form>
                            <!-- <div class="or-saparator"><span>or</span></div>
                            <span class="small-heading">Log in with:</span>
                            <ul class="btn-grp guttar-30px">
                                <li><a href="#" class="btn btn-sm btn-icon btn-facebook"><em class="fab fa-facebook-f"></em>Facebook</a></li>
                                <li><a href="#" class="btn btn-sm btn-icon btn-google"><em class="fab fa-google"></em>Google</a></li>
                            </ul> -->
                        </div>
                        <div class="gaps-2x"></div>
                        <div class="form-note"> هنوز عضو نشده اید؟ <a href="signup.html">حالا ثبت نام کنید</a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-8  text-center animate__animated animate__fadeIn" v-if="PasswordCondition">
                        <div class="user-ath-logo">
                            <a href="#">
                                <img src="images/logo-sm.png" srcset="images/logo-sm2x.png 2x" alt="icon">
                            </a>
                        </div>
                        <div class="user-ath-box">
                            <h4>کد ارسال شده به شماره همراه خودرا وارد کنید</h4>
                            <form action="index.html" class="user-ath-form">
                                <div class="note note-lg note-no-icon note-danger" v-show="WrongPass">
                                    <p ref = "WrongPass"></p>
                                </div>
                                <div class="input-item">
                                    <input type="text" placeholder="کد را وارد کنید" class="input-bordered" v-model="password">
                                </div>
                                
                                <div class="gaps"></div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn btn-primary" @click.prevent="Login">تایید کد</button>
                                    <a href="recovery.html" class="simple-link">رمز عبور خود را فراموش کرده اید؟</a>
                                </div>
                            </form>
                            <!-- <div class="or-saparator"><span>or</span></div>
                            <span class="small-heading">Log in with:</span>
                            <ul class="btn-grp guttar-30px">
                                <li><a href="#" class="btn btn-sm btn-icon btn-facebook"><em class="fab fa-facebook-f"></em>Facebook</a></li>
                                <li><a href="#" class="btn btn-sm btn-icon btn-google"><em class="fab fa-google"></em>Google</a></li>
                            </ul> -->
                        </div>
                        <!-- <div class="gaps-2x"></div>
                        <div class="form-note"> هنوز عضو نشده اید؟ <a href="signup.html">حالا ثبت نام کنید</a> -->
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    data () {
        return {
            phonenumber:'',
            password:'',
            ShowErr: false,
            WrongPass:false
        }
    },
    methods: {
        CheckPhonenumber(){
            this.ShowErr = false
            if (this.phonenumber == '') {
                this.ShowErr = true
                this.$refs.ErrMsg.innerHTML = 'شماره تماس نباید خالی باشد'
            }else{
                this.$store.dispatch('LoginErrs/CheckPhonenumberStructure', this.phonenumber)
                if (this.$store.getters["LoginErrs/GetPhonenumberStructureState"] == false) {
                    this.$refs.ErrMsg.innerHTML = this.$store.getters['LoginErrs/GetPhonenumberStructureMsg']
                }else{
                    this.$store.dispatch('Account/CheckPhonenumber' , this.phonenumber)
                }
                if (this.$store.getters['LoginErrs/GetNotFoundUserState'] == false || this.$store.getters['LoginErrs/GetPhonenumberStructureState'] == false) {
                this.ShowErr = true
                }
            }
        },
        Login(){
            this.$store.dispatch('Account/Login' , this.password)
            if (this.$store.getters["LoginErrs/GetWrongPasswordState"] == false) {
                this.WrongPass = true
            }
        }
    },
    computed: {
        PhonenumberCondition(){
            if (this.$store.getters['Account/PhonenumberCondition'] == false) {
                this.$refs.phonenumber.classList = "animate__animated animate__fadeOut "
            }
            return this.$store.getters['Account/PhonenumberCondition']
        },
        PasswordCondition(){
            return this.$store.getters['Account/PasswordCondition']
        },
        NotFoundUserState(){
            return this.$store.getters["LoginErrs/GetNotFoundUserState"]
        },
        WrongPasswordState(){
            return this.$store.getters["LoginErrs/GetWrongPasswordState"]
        }
    },
    watch: {
        NotFoundUserState(){
            if (this.$store.getters["LoginErrs/GetNotFoundUserState"] == false) {
                this.ShowErr = true
                this.$refs.ErrMsg.innerHTML = this.$store.getters['LoginErrs/GetNotFoundUserMsg']
            }
        },
        // ShowErr(){
        //     if (this.ShowErr == true) {
        //         setTimeout(() => {
        //             this.ShowErr = false
        //             this.$refs.ShowErr.classList = "animate__animated animate__fadeOut "
        //         }, 3000);
        //     }
        // },
        WrongPasswordState(){
            if (this.$store.getters["LoginErrs/GetWrongPasswordState"] == false) {
                this.WrongPass = true
                this.$refs.WrongPass.innerHTML = this.$store.getters['LoginErrs/GetWrongPasswordMsg']
            }
        }
    }
}
</script>