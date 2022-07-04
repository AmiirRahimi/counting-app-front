<template>
    <div>
        <div class="row">
            <h2 class="user-panel-title col-md-6">البسه</h2>
            <div v-show="this.$store.getters['Clothes/GetSubmited']" ref="submited" style="margin-bottom:-35px;height:50px">
                <div class="alert-txt">با موفقیت ثبت شد</div>
                <a href="#" class="btn btn-sm btn-primary"><em class="ti ti-check"></em></a>
            </div>
        </div>
        <!-- .alert-box -->
        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#personal-data">ثبت البسه</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#wallet-address" @click="GetClothes">لیست لباس ها</a>
        </li>
        </ul><!-- .nav-tabs-line -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="personal-data">
                <form action="#">
                    <label for="sur-name" class="input-item-label">ثبت البسه</label>
                    <div class="row">
                        <div class="input-item input-with-label col-md-6">
                        <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="نام لباس را وارد کنید" v-model="name">
                        </div><!-- .input-item -->
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="کد لباس را وارد کنید" v-model="code">
                        </div><!-- .input-item -->
                    </div>
                    <div class="row">
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="تعداد لباس را وارد کنید" v-model="count">
                        </div><!-- .input-item -->
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="قیمت خریداری شده / دوخت لباس را وارد کنید" v-model="v_price">
                        </div><!-- .input-item -->
                    </div>
                    <div class="input-item input-with-label">
                        <div class="row">
                            <div class="input-item input-with-label">
                                <label for="full-name" class="input-item-label"> نام خیاط / فروشنده لباس</label>
                                <select class="input-bordered" name="swalllet" id="swalllet" v-model="sellerortailors" >
                                    <option disabled value="">نام خیاط / فروشنده لباس را انتخاب کنید</option>
                                    <option :value="sellerortailor.id" v-for="sellerortailor in SellerOrTailor" :key="sellerortailor.id">{{sellerortailor.name}}</option>
                                </select>
                            </div><!-- .input-item -->
                        </div><!-- .row -->
                    </div><!-- .input-item -->
                    <div class="gaps-1x"></div>
                    <div class="row">
                        <div class="d-sm-flex justify-content-between align-items-center col-md-6">
                            <button class="btn btn-primary col-md-8" @click.prevent="AddCloth">ثبت</button>
                            <div class="gaps-2x d-sm-none"></div>
                        </div>
                        <div v-show="this.$store.getters['Clothes/GetSubmited']" style="margin-bottom:-35px;height:50px" ref="submited">
                            <div class="alert-txt">با موفقیت ثبت شد</div>
                            <a href="#" class="btn btn-sm btn-primary"><em class="ti ti-check"></em></a>
                        </div>
                    </div> 
                </form><!-- form -->
            </div><!-- .tab-pane -->
            <div class="tab-pane fade" id="wallet-address">
                        <!-- if there is no transaction you can use this code -->
                        <!-- <div class="status status-empty">
                            <div class="status-icon">
                                <em class="ti ti-files"></em>
                                <div class="status-icon-sm">
                                    <em class="ti ti-close"></em>
                                </div>
                            </div>
                            <span class="status-text">You have not contributed yet! You should make some.</span>
                            <a href="tokens.html" class="btn btn-primary">Contribute Now</a>
                        </div> -->
                        <table class="data-table tranx-table col-md-12">
                            <thead>
                                <tr>
                                    <th class="tranx-status"></th>
                                    <th class="tranx-no"><span>کد لباس</span></th>
                                    <th class="tranx-token"><span>تعداد لباس </span></th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="cloth in Clothes" :key="cloth.id">
                                    <td class="tranx-status tranx-status-cancled"><span class="d-none">Canceled</span><em class="ti ti-close" style="left:-20px;position:relative"></em></td>
                                    <td class="tranx-no"><span>{{cloth.code}}</span></td>
                                    <td class="tranx-token"><span>{{cloth.count}}</span></td>
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
            data : {},
            name:'',
            code:'',
            count:'',
            sellerortailors:'نام خیاط / فروشنده لباس را انتخاب کنید',
            v_price:''
        }
    },
    methods: {
        AddCloth(){
            this.data = {
                'name' : this.name,
                'code' : this.code,
                'count' :  this.count,
                'sellerortailor': this.sellerortailors,
                'v_price' : this.v_price
            }
            this.$store.dispatch('Clothes/AddCloth' , this.data)
        },
        GetClothes(){
            this.$store.dispatch('Clothes/GetClothes')
        }
    },
    computed: {
        SellerOrTailor(){
            return this.$store.getters['SellerOrTailor/GetSellerOrTailor']
        },
        Clothes(){
            return this.$store.getters['Clothes/GetClothes']
        },
        Submited(){
            return this.$store.getters['Clothes/GetSubmited']
        }
    },
    mounted () {
        this.$store.dispatch('SellerOrTailor/GetSellerOrTailor')
    },
    watch: {
        Submited(){
            if (this.$store.getters['Clothes/GetSubmited'] == true) {
                this.$refs.submited.classList = "animate__animated animate__fadeIn alert-box alert-primary col-md-6"
                setTimeout(()=>{
                    this.$refs.submited.classList = "animate__animated animate__fadeOut alert-box alert-primary col-md-6"
                },2000)
                setTimeout(()=>{
                    this.$store.commit('Clothes/SetSubmited' , false)
                },3000)
            }
        }
    }
}
</script>