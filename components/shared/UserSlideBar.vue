<template>
    <div>
        <div class="user-sidebar">
                <div class="user-sidebar-overlay"></div>
                    <div class="user-box d-none d-lg-block">
                        <div class="user-image">
                            <img src="/images/user-thumb-lg.png" alt="thumb">
                        </div>
                        <h6 class="user-name" ref="full_name"></h6>
                        <div class="user-uid" >phonenumber: <span ref="phonenumber"><span></span></span></div>
                        <ul class="btn-grp guttar-10px">
                            <li><a href="#" class="btn btn-xs btn-warning">Confirm Email</a></li>
                            <li><a href="kyc.html" class="btn btn-xs btn-warning">KYC Pending</a></li>
                        </ul>
                    </div><!-- .user-box -->
                    <ul class="user-icon-nav">
                        <li :class="{active:this.$route.name === 'dashboard' ? true : false}"><nuxt-link to="/dashboard"><em class="ti ti-dashboard"></em>داشبورد</nuxt-link></li>
                        <li :class="{active:this.$route.name === 'invoice' ? true : false}"><nuxt-link to="/invoice"><em class="ti ti-files"></em>فاکتور</nuxt-link></li>
                        <li :class="{active:this.$route.name === 'clothes' ? true : false}"><nuxt-link to="/clothes"><em class="ti ti-pie-chart"></em>البسه</nuxt-link></li>
                        <li :class="{active:this.$route.name === 'customers' ? true : false}"><nuxt-link to="/customers"><em class="ti ti-user"></em>مشتری</nuxt-link></li>
                        <li :class="{active:this.$route.name === 'seller_or_tailor' ? true : false}"><nuxt-link to="/seller_or_tailor"><em class="ti ti-user"></em> خیاط/فروشنده</nuxt-link></li>
                        <li :class="{active:this.$route.name === 'cheque' ? true : false}"><nuxt-link to="/cheque"><em class="ti ti-control-shuffle"></em>چک</nuxt-link></li>
                        <li><a href="referrals.html"><em class="ti ti-infinite"></em>Referral</a></li>
                        <li><a href="security.html"><em class="ti ti-lock"></em>Security</a></li>
                    </ul><!-- .user-icon-nav -->
                    <div class="user-sidebar-sap"></div><!-- .user-sidebar-sap -->
                    <ul class="user-nav">
                        <li><a href="how-to.html">How to buy?</a></li>
                        <li><a href="faq.html">Faqs</a></li>
                        <li><a href="#">Whitepaper</a></li>
                        <li>Contact Support<span>info@icocrypto.com</span></li>
                    </ul><!-- .user-nav -->
                    <div class="d-lg-none">
                        <div class="user-sidebar-sap"></div>
                        <div class="gaps-1x"></div>
                        <ul class="topbar-action-list">
                            <li class="topbar-action-item topbar-action-link">
                                <a href="#"><em class="ti ti-home"></em> Go to main site</a>
                            </li><!-- .topbar-action-item -->
                            <li class="dropup topbar-action-item topbar-action-language">
                                <a href="#" data-bs-toggle="dropdown" aria-haspopup="true"> EN <em class="ti ti-angle-up"></em> </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">FR</a></li>
                                    <li><a href="#">JY</a></li>
                                    <li><a href="#">CH</a></li>
                                </ul>
                            </li><!-- .topbar-action-item -->
                        </ul><!-- .topbar-action-list -->
                    </div>
                </div>
                <!-- .user-sidebar -->
    </div>
</template>

<script>
export default {
    computed: {
        UserDataState(){
            return this.$store.getters['Account/GetUserDataState']
        },
    },
    mounted () {
        this.$store.dispatch('Account/GetUserData')
    },
    watch: {
        UserDataState(){
            if (this.$store.getters['Account/GetUserDataState'] == true) {
                this.$refs.full_name.innerHTML = this.$store.getters['Account/GetUserFullname']
                this.$refs.phonenumber.innerHTML = '0' + this.$store.getters['Account/GetUserPhonenumber'].toString()
            }
        }
    }
}
</script>