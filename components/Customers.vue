<template>
    <div>
        <h2 class="user-panel-title col-md-6">مشتری</h2>
        <!-- .alert-box -->
        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#personal-data">ثبت مشتری</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#wallet-address" @click="GetCustomers">لیست مشتری ها</a>
            </li>
        </ul><!-- .nav-tabs-line -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="personal-data">
                <form action="#">
                    <label for="sur-name" class="input-item-label">ثبت مشتری</label>
                    <div class="row">
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="نام و نام خانوادگی مشتری را وارد کنید" v-model="CustomerName">
                        </div><!-- .input-item -->
                        <div class="input-item input-with-label col-md-6">
                            <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="شماره همراه مشتری را وارد کنید" v-model="CustomerPhonenumber">
                        </div><!-- .input-item -->
                    </div>
                    <div class="input-item input-with-label">
                        <input class="input-bordered" type="text" id="email-address" name="email-address" placeholder="ادرس مشتری را وارد کنید" style="height:150px" v-model="CustomerAddress">
                    </div><!-- .input-item -->
                    <div class="row">
                        <div class="d-sm-flex justify-content-between align-items-center col-md-6">
                            <button class="btn btn-primary col-md-8" @click.prevent="AddCustomer">ثبت</button>
                            <div class="gaps-2x d-sm-none"></div>
                        </div>
                        <div v-show="this.$store.getters['Customer/GetSubmited']" style="margin-bottom:-35px;height:50px" ref="submited">
                            <div class="alert-txt">با موفقیت ثبت شد</div>
                            <a href="#" class="btn btn-sm btn-primary"><em class="ti ti-check"></em></a>
                        </div>
                    </div>
                </form><!-- form -->
            </div><!-- .tab-pane -->
            <div class="tab-pane fade" id="wallet-address">
                <h2 class="user-panel-title">لیست مشتری ها</h2>
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
                                    <th class="tranx-no"><span>نام مشتری</span></th>
                                    <th class="tranx-token"><span>شماره تماس مشتری</span></th>
                                    <th class="tranx-amount"><span>تاریخ اولین خرید</span></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="customer in Customers" :key="customer.id">
                                    <td class="tranx-status tranx-status-cancled"><span class="d-none">Canceled</span><em class="ti ti-close" style="left:-20px;position:relative"></em></td>
                                    <td class="tranx-no"><span>{{customer.name}}</span></td>
                                    <td class="tranx-token"><span>{{customer.phonenumber}}</span></td>
                                    <td class="tranx-amount"><span>{{customer.address}}</span><em class="fas fa-info-circle" data-bs-toggle="tooltip" data-placement="bottom" title="1 ETH = 100 ICOX"></em></td>
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
            CustomerName:'',
            CustomerAddress:'',
            CustomerPhonenumber:'',
            data:{},
        }
    },
    methods: {
        AddCustomer(){
            this.data = {
                'name' : this.CustomerName,
                'address' : this.CustomerAddress,
                'phonenumber' : this.CustomerPhonenumber
            }
            this.$store.dispatch('Customer/AddCustomer' , this.data)
        },
        GetCustomers(){
            this.$store.dispatch('Customer/GetCustomers')
        }
    },
    computed: {
        Customers(){
            return this.$store.getters['Customer/GetCustomers']
        },
        Submited(){
            return this.$store.getters['Customer/GetSubmited']
        }
    },
    watch: {
        Submited(){
            if (this.$store.getters['Customer/GetSubmited'] == true) {
                this.$refs.submited.classList = "animate__animated animate__fadeIn alert-box alert-primary col-md-6"
                setTimeout(()=>{
                    this.$refs.submited.classList = "animate__animated animate__fadeOut alert-box alert-primary col-md-6"
                },2000)
                setTimeout(()=>{
                    this.$store.commit('Customer/SetSubmited' , false)
                },3000)
            }
        }
    }
}
</script>