<template>
    <div>
        <div class="row">
            <h2 class="user-panel-title col-md-6">خیاط / فروشنده</h2>
            <div v-show="this.$store.getters['SellerOrTailor/GetSubmited']" ref="submited" style="margin-bottom:-35px;height:50px">
                <div class="alert-txt">با موفقیت ثبت شد</div>
                <a href="#" class="btn btn-sm btn-primary"><em class="ti ti-check"></em></a>
            </div>
        </div>
        <!-- .alert-box -->
        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#personal-data">ثبت خیاط / فروشنده</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#wallet-address" @click="GetSellerOrTailor">لیست خیاط / فروشنده ها</a>
        </li>
        </ul><!-- .nav-tabs-line -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="personal-data">
                <form action="#">
                    <label for="sur-name" class="input-item-label">ثبت خیاط / فروشنده</label>
                    <div class="row">
                        <div class="input-item input-with-label col-md-6">
                        <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="نام خیاط/فروشنده را وارد کنید" v-model="name">
                        </div><!-- .input-item -->
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="شماره همراه خیاط/فروشنده را وارد کنید" v-model="phonenumber">
                        </div><!-- .input-item -->
                    </div>
                    <div class="input-item input-with-label">
                        <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="ادرس خیاط/فروشنده را وارد کنید" style="height:150px" v-model="address">
                    </div><!-- .input-item -->
                    <div class="d-sm-flex justify-content-between align-items-center ">
                        <button class="btn btn-primary col-md-4" @click.prevent="AddSellerOrTailor">ثبت</button>
                        <div class="gaps-2x d-sm-none"></div> 
                    </div>
                </form><!-- form -->
            </div><!-- .tab-pane -->
            <div class="tab-pane fade" id="wallet-address">
                <h2 class="user-panel-title">لیست خیاط / فروشنده ها</h2>
                        <!-- if there is no transaction you can use this code -->
                        <!-- <div class="status status-empty">
                            <div class="status-icon">
                                <em class="ti ti-files"></em>
                                <div class="status-icon-sm">
                                    <em class="ti ti-close"></em>
                                </div>
                            </div>
                            <span class="status-text">هنوز خیاط/فروشنده ای وارد نکرده اید!</span>
                            <a href="tokens.html" class="btn btn-primary">Contribute Now</a>
                        </div> -->
                        <table class="data-table tranx-table col-md-12">
                            <thead>
                                <tr>
                                    <th class="tranx-status"></th>
                                    <th class="tranx-no"><span>نام خیاط / فروشنده</span></th>
                                    <th class="tranx-token"><span>شماره تماس خیاط / فروشنده</span></th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="sellerortailor in SellerOrTailor" :key="sellerortailor.id">
                                    <td class="tranx-status tranx-status-cancled"><span class="d-none">Canceled</span><em class="ti ti-close" style="left:-20px;position:relative"></em></td>
                                    <td class="tranx-no"><span>{{sellerortailor.name}}</span></td>
                                    <td class="tranx-token"><span>{{sellerortailor.phonenumber}}</span></td>
                                    <td class="tranx-amount"><em class="fas fa-info-circle" data-bs-toggle="tooltip" data-placement="bottom" title="1 ETH = 100 ICOX"></em></td>
                                    <td class="tranx-action">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#tranxApproved"><em class="ti ti-more-alt"></em></a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
            </div><!-- .tab-pane -->
        </div><!-- .tab-content -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            data:{},
            name:'',
            phonenumber:'',
            address:'',
        }
    },
    methods: {
        AddSellerOrTailor(){
            this.data = {
                'name':this.name,
                'phonenumber':this.phonenumber,
                'address':this.address
            }
            this.$store.dispatch('SellerOrTailor/AddSellerOrTailor' , this.data)
        },
        GetSellerOrTailor(){
            this.$store.dispatch('SellerOrTailor/GetSellerOrTailor')
        }
    },
    computed: {
        SellerOrTailor(){
            return this.$store.getters['SellerOrTailor/GetSellerOrTailor']
        },
        Submited(){
            return this.$store.getters['SellerOrTailor/GetSubmited']
        }
    },
    watch: {
        Submited(){
            if (this.$store.getters['SellerOrTailor/GetSubmited'] == true) {
                this.$refs.submited.classList = "animate__animated animate__fadeIn alert-box alert-primary col-md-6"
                setTimeout(()=>{
                    this.$refs.submited.classList = "animate__animated animate__fadeOut alert-box alert-primary col-md-6"
                },2000)
                setTimeout(()=>{
                    this.$store.commit('SellerOrTailor/SetSubmited' , false)
                },3000)
            }
        }
    }
}
</script>