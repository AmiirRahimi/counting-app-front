<template>
    <div>
        <h2 class="user-panel-title">فاکتور</h2>
        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#personal-data">ثبت فاکتور</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#wallet-address">تصفیه فاکتور</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#wallet-address"> لیست فاکتور ها</a>
            </li>
        </ul><!-- .nav-tabs-line -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="personal-data">
                <form action="#">
                    <div class="input-item input-with-label">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="input-item input-with-label">
                                    <label for="full-name" class="input-item-label"> انتخاب مشتری</label>
                                    <select class="input-bordered" name="swalllet" id="swalllet" v-model="Customer" @change="GetNotRegisterdInvoice($event)">
                                        <option value="" disabled selected>مشتری مورد نظر خود را انتخاب کنید</option>
                                        <option :value="customer.id" v-for="customer in Customers" :key="customer.id">{{customer.name}}</option>
                                    </select>
                                </div><!-- .input-item -->
                            </div><!-- .col -->
                        </div><!-- .row -->
                    </div><!-- .input-item -->
                    <div class="sap"></div>
                    <label for="sur-name" class="input-item-label">اضافه کردن آیتم های فاکتور</label>
                    <div class="input-item input-with-label">
                        <select class="input-bordered" name="swalllet" id="swalllet" v-model="Cloth">
                            <option value="" disabled selected>لباس مورد نظر خود را انتخاب کنید</option>
                            <option :value="cloth.id" v-for="cloth in Clothes" :key="cloth.id">{{cloth.code}}</option>
                        </select>
                    </div><!-- .input-item -->
                    <div class="row">
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered " type="text" id="email-address" name="email-address" placeholder="تعداد شلوار را وارد کنید" v-model="Count">
                        </div><!-- .input-item -->
                        <div class="input-item input-with-label col-md-6">
                            <div class="payment-input ">
                                <input class="input-bordered " type="text" id="paymentGet" placeholder="قیمت شلوار را وارد کنید" v-model="Price">
                                <span class="payment-get-cur payment-cal-cur">ریال</span>
                            </div>
                        </div><!-- .input-item -->
                    </div>
                    <div class="row">
                        <div class="d-sm-flex justify-content-between align-items-center col-md-6">
                            <button class="btn btn-primary" @click.prevent="AddItemForNotRegisterdInvoice">افزودن</button>
                            <div class="gaps-2x d-sm-none"></div>
                        </div>
                        <div v-show="this.$store.getters['Invoice/GetRegistered']" ref="registered" style="margin-bottom:-35px;height:50px">
                            <div class="alert-txt">با موفقیت افزوده شد</div>
                            <a href="#" class="btn btn-sm btn-primary"><em class="ti ti-check"></em></a>
                        </div>
                    </div>
                    <div class="sap"></div>
                    <label for="sur-name" class="input-item-label">ایتم های فاکتور</label>
                        <div class="status status-empty" v-show="this.$store.getters['Invoice/GetNoContent']" >
                            <div class="status-icon">
                                <em class="ti ti-files"></em>
                                <div class="status-icon-sm">
                                    <em class="ti ti-close"></em>
                                </div>
                            </div>
                            <span class="status-text">هنوز مقداری افزوده نشده است</span>
                        </div>
                        <div class="status status-empty" v-show="!this.$store.getters['Invoice/GetNoContent']" style='overflow-y:scroll; height:400px'>
                            <table class="data-table tranx-table col-md-12">
                                <thead>
                                    <tr>
                                        <th class="tranx-status"></th>
                                        <th class="tranx-no"><span>کد لباس</span></th>
                                        <th class="tranx-token"><span>تعداد لباس</span></th>
                                        <th class="tranx-amount"><span>قیمت لباس</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="invoice in NotRegisteredInvoices" :key="invoice.id">
                                        <td class="tranx-status tranx-status-cancled"><span class="d-none">Canceled</span><a href=""><em class="ti ti-close"></em></a></td>
                                        <td class="tranx-no"><span>{{invoice.code}}</span>کد</td>
                                        <td class="tranx-token"><span>{{invoice.count}}</span>عدد</td>
                                        <td class="tranx-amount"><span>{{invoice.price}}</span>IRR </td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>
                    <div class="sap"></div>
                    
                    <div class="gaps-1x"></div><!-- 10px gap -->
                    <div class="payment-summary">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="payment-summary-item payment-summary-final">
                                        <h6 class="payment-summary-title">تعداد کل شلوار ها</h6>
                                        <div class="payment-summary-info">
                                            <span class="payment-summary-amount">{{Totals.total_count}}</span> <span>عدد</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="payment-summary-item payment-summary-tokens">
                                        <h6 class="payment-summary-title">جمع کل فاکتور</h6>
                                        <div class="payment-summary-info">
                                            <span class="payment-summary-amount">{{Totals.total_price}}</span> <span>IRR</span>
                                        </div>
                                    </div>
                                </div><!-- .col -->
                            </div><!-- .row -->
                        </div><!-- .payment-summary -->
                    <div class="gaps-1x"></div><!-- 10px gap -->
                    <div class="row">
                        <div class="d-sm-flex justify-content-between align-items-center col-md-6">
                            <button class="btn btn-primary col-md-8" @click.prevent="SubmitInvoice">ثبت</button>
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
                <form action="#">
                    <div class="input-item input-with-label">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="input-item input-with-label">
                                    <label for="full-name" class="input-item-label"> انتخاب مشتری</label>
                                    <select class="input-bordered" name="swalllet" id="swalllet" v-model="Customer" @change="GetInvoices($event)">
                                        <option value="" disabled selected>مشتری مورد نظر خود را انتخاب کنید</option>
                                        <option :value="customer.id" v-for="customer in Customers" :key="customer.id">{{customer.name}}</option>
                                    </select>
                                </div><!-- .input-item -->
                            </div><!-- .col -->
                        </div><!-- .row -->
                    </div><!-- .input-item -->
                    <div v-show="this.$store.getters['Invoice/GetShowContent']">
                        <div class="input-item input-with-label">
                            <div class="row">
                                <div class="">
                                    <div class="input-item input-with-label">
                                        <label for="full-name" class="input-item-label">انتخاب فاکتور</label>
                                        <select class="input-bordered" name="swalllet" id="swalllet" v-model="Customer">
                                            <option value="" disabled selected>فاکتور مورد نظر خود را انتخاب کنید</option>
                                            <option :value="invoice.id" v-for="invoice in Invoices" :key="invoice.id">{{invoice.id}}</option>
                                        </select>
                                    </div><!-- .input-item -->
                                </div><!-- .col -->
                            </div><!-- .row -->
                        </div><!-- .input-item -->
                        <div>
                            <div class="payment-calculator">
                                <div class="payment-get">
                                    <label for="paymentGet">تخفیف</label>
                                    <div class="payment-input">
                                        <input class="input-bordered col-md-6" type="text" id="paymentGet" v-model="Discount">
                                        <span class="payment-get-cur payment-cal-cur">ریال</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="">
                                <div class="payment-get ">
                                    <label for="paymentGet">توضیحات</label>
                                    <div class="payment-input">
                                        <input class="input-bordered" type="text" id="paymentGet" style="height:150px" v-model="Description">
                                    </div>
                                </div>
                            </div>
                        </div><!-- .row -->
                        <div class="gaps-1x"></div><!-- 10px gap -->
                        <div class="payment-summary">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="payment-summary-item payment-summary-final">
                                            <h6 class="payment-summary-title">تعداد کل شلوار ها</h6>
                                            <div class="payment-summary-info">
                                                <span class="payment-summary-amount">{{Totals.total_count}}</span> <span>عدد</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="payment-summary-item payment-summary-tokens">
                                            <h6 class="payment-summary-title">جمع کل فاکتور</h6>
                                            <div class="payment-summary-info">
                                                <span class="payment-summary-amount">{{Totals.total_price}}</span> <span>IRR</span>
                                            </div>
                                        </div>
                                    </div><!-- .col -->
                                </div><!-- .row -->
                            </div><!-- .payment-summary -->
                        <div class="gaps-1x"></div><!-- 10px gap -->
                        <div class="row">
                            <div class="d-sm-flex justify-content-between align-items-center col-md-6">
                                <button class="btn btn-primary col-md-8" @click.prevent="SubmitInvoice">ثبت</button>
                                <div class="gaps-2x d-sm-none"></div>
                            </div>
                            <div v-show="this.$store.getters['Invoice/GetSubmited']" style="margin-bottom:-35px;height:50px">
                                <div class="alert-txt">با موفقیت ثبت شد</div>
                                <a href="#" class="btn btn-sm btn-primary"><em class="ti ti-check"></em></a>
                            </div>
                        </div>
                    </div>
                </form><!-- form -->
            </div><!-- .tab-pane -->
        </div><!-- .tab-content -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            data:{},
            Customer:'',
            Cloth:'',
            Count:'',
            Price:'',
            Discount:'',
            Description:'',
        }
    },
    methods: {
        AddItemForNotRegisterdInvoice(){
            this.data={
                'customer': this.Customer,
                'cloth':this.Cloth,
                'count':this.Count,
                'price':this.Price
            }
            this.$store.dispatch('Invoice/AddItemForNotRegisterdInvoice' , this.data)
        },
        GetNotRegisterdInvoice(event){
            const data = {'customer': event.target.value}
            this.$store.dispatch('Invoice/SetNotRegisterdInvoices' , data)
            this.$store.dispatch('Invoice/GetTotals' , data)
        },
        SubmitInvoice(){
            this.data={
                'customer':this.Customer,
                'discount':parseInt(this.Discount),
                'description':this.Description
            }
            this.$store.dispatch('Invoice/SubmitInvoice' , this.data)
        },
        GetInvoices(event){
            const data = {'customer': event.target.value}
            this.$store.dispatch('Invoice/GetInvoices' , data)
        }
    },
    mounted () {
        this.$store.dispatch('Customer/GetCustomers')
        this.$store.dispatch('Clothes/GetClothes')
    },
    computed: {
        Customers(){
            return this.$store.getters['Customer/GetCustomers']
        },
        Clothes(){
            return this.$store.getters['Clothes/GetClothes']
        },
        NotRegisteredInvoices(){
            return this.$store.getters['Invoice/GetNotRegisterdInvoice']
        },
        Registered(){
            return this.$store.getters['Invoice/GetRegistered']
        },
        Submited(){
            return this.$store.getters['Invoice/GetSubmited']
        },
        Totals(){
            if (this.$store.getters['Invoice/GetTotals'].total_count == undefined || this.$store.getters['Invoice/GetTotals'].total_price == undefined) {
                return {'total_count' : 0 , 'total_price' : 0}
            }
            return this.$store.getters['Invoice/GetTotals']
        },
        Invoices(){
            return this.$store.getters['Invoice/GetInvoices']
        }
    },
    watch: {
        Registered(){
            if (this.$store.getters['Invoice/GetRegistered'] == true) {
                this.$refs.registered.classList = "animate__animated animate__fadeIn alert-box alert-primary col-md-6"
                setTimeout(()=>{
                    this.$refs.registered.classList = "animate__animated animate__fadeOut alert-box alert-primary col-md-6"
                },2000)
                setTimeout(()=>{
                    this.$store.commit('Invoice/SetRegistered' , false)
                },3000)
                this.Cloth=''
                this.Count=''
                this.Price=''
            }
        },
        Submited(){
            if (this.$store.getters['Invoice/GetSubmited'] == true) {
                this.$refs.submited.classList = "animate__animated animate__fadeIn alert-box alert-primary col-md-6"
                setTimeout(()=>{
                    this.$refs.submited.classList = "animate__animated animate__fadeOut alert-box alert-primary col-md-6"
                },2000)
                setTimeout(()=>{
                    this.$store.commit('Invoice/SetSubmited' , false)
                },3000)
                this.Customer = ''
                this.Cloth=''
                this.Count=''
                this.Price=''
                this.$store.commit('Invoice/SetNoContent' , true)
                this.$store.commit('Invoice/SetTotals' , {})
            }
        }
    }
}
</script>