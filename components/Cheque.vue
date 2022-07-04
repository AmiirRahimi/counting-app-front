<template>
    <div>
        <h2 class="user-panel-title col-md-6">چک</h2>
        <!-- .alert-box -->
        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#personal-data">ثبت چک</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#wallet-address" >لیست چک ها</a>
        </li>
        </ul><!-- .nav-tabs-line -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="personal-data">
                <form action="#">
                    <!-- <label for="sur-name" class="input-item-label">ثبت چک</label> -->
                    <div class="input-item input-with-label col-md-12">
                        <label for="full-name" class="input-item-label">تاریخ چک را وارد کنید</label>
                        <div class="row">
                            <div class="input-item input-with-label col-md-2 col-xs-2">
                                <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="سال" v-model="year">
                            </div><!-- .input-item -->
                            <div class="input-item input-with-label col-md-2 col-xs-2">
                                <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="ماه" v-model="month">
                            </div><!-- .input-item -->
                            <br>
                            <div class="input-item input-with-label col-md-2 col-xs-2">
                                <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="روز" v-model="day">
                            </div><!-- .input-item -->
                        </div><!-- .input-item -->
                    </div>
                    <div class="row">
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="سریال چک را وارد کنید" v-model="serial">
                        </div><!-- .input-item -->
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="شناسه صیادی چک را وارد کنید" v-model="code">
                        </div><!-- .input-item -->
                    </div>
                    <div class="input-item input-with-label">
                        <div class="row">
                            <div class="input-item input-with-label">
                                <label for="full-name" class="input-item-label"> نام واگذارنده چک</label>
                                <select class="input-bordered" name="swalllet" id="swalllet" v-model="customer" >
                                    <option disabled value="">نام واگذارنده چک را انتخاب کنید</option>
                                    <option :value="customer.id" v-for="customer in Customers" :key="customer.id">{{customer.name}}</option>
                                </select>
                            </div><!-- .input-item -->
                        </div><!-- .row -->
                    </div><!-- .input-item -->
                    <div class="row">
                        <div class="input-item input-with-label col-md-12">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="نام روی چک را وارد کنید" v-model="name" :disabled="CheckName ? true : flase">
                        </div><!-- .input-item -->
                    </div>
                    <div class="row">
                        <div class="input-item input-with-label col-md-12" style="direction:rtl">
                            <input v-model="CheckName" class="col-md-1" type="checkbox" id="checkbox"/>
                            <label for="checkbox">نام روی چک با نام واگذارنده برابر است </label>
                        </div><!-- .input-item -->
                    </div>
                    <div class="gaps-1x"></div> 
                    <div class="row">
                        <div class="d-sm-flex justify-content-between align-items-center col-md-6">
                            <button class="btn btn-primary col-md-8" @click="AddCheque">ثبت</button>
                            <div class="gaps-2x d-sm-none"></div>
                        </div>
                        <div v-show="this.$store.getters['Invoice/GetSubmited']" ref="submited" style="margin-bottom:-35px;height:50px">
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
                                
                                <!-- <tr v-for="cloth in Clothes" :key="cloth.id">
                                    <td class="tranx-status tranx-status-cancled"><span class="d-none">Canceled</span><em class="ti ti-close" style="left:-20px;position:relative"></em></td>
                                    <td class="tranx-no"><span>{{cloth.code}}</span></td>
                                    <td class="tranx-token"><span>{{cloth.count}}</span></td>
                                    <td class="tranx-amount"><em class="fas fa-info-circle" data-bs-toggle="tooltip" data-placement="bottom" title="1 ETH = 100 ICOX"></em></td>
                                    <td class="tranx-action">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#tranxApproved"><em class="ti ti-more-alt"></em></a>
                                    </td>
                                </tr> -->
                                
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
            CheckName : false,
            date:'',
            code:'',
            name:'',
            customer:'',
            serial:''
        }
    },
    mounted () {
        this.$store.dispatch('Customer/GetCustomers')
    },
    computed: {
        Customers(){
            return this.$store.getters['Customer/GetCustomers']
        }
    },
    methods: {
        AddCheque(){
            if (this.CheckName == false) {
                this.name = this.customer
            }
            this.$store.dispatch('')
        }
    }
}
</script>