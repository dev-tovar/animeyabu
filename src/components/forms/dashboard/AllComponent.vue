<template>
    <div class="mt-10 px-6 lg:px-8">

        <div class="lg:mx-0">
            <h2 class="text-3xl tracking-tight text-white sm:text-4xl"><span class=" font-bold">Lista de Categorías</span>
            </h2>
            <div v-if="loadData" class="mt-20 grid justify-items-center  ">
                <div class="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-fuchsia-950 border-t-transparent"></div>
            </div>



            <div v-else class="mt-10 text-white">
                <div class="grid grid-cols-3 gap-4 pa-10">
                    <div v-for="(item, index) in itemsCategorias.categorias" :key="index" href="#"
                        class=" p-6 bg-fuchsia-950 rounded-lg shadow relative">
                        <div class="h-20 grid justify-items-center content-center">
                            <h5 class="mb-2 text-3xl font-bold tracking-tight text-white dark:text-white">
                                {{ item.nombre }}
                            </h5>
                        </div>


                        <router-link  :to="`/dashboard/categorias/${item.id}/${item.nombre}`"
                            class="absolute right-[10px] bottom-[10px] underline decoration-1"
                            >Editar</router-link>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import functionsCustom from '@/mix/function'

export default {
    mixins: [functionsCustom],

    name: 'allComponent',
    components: {
    },
    data() {
        return {
            apiKey: process.env.VUE_APP_PUBLIC_KEY,
            utcTimeStamp: null,
            signature: null,
            infoPersonal: null,
            itemsCategorias: [], 
            loadData: true,
        }
    },
    created() {
        this.getTimezone();
        setTimeout(() => {

            this.getCategorias();

        }, 1000);
    },
    methods: {
       
        getCategorias() {
            this.signature = this.signatureApi;
            this.utcTimeStamp = this.timezoneApi;



            axios
                .get(process.env.VUE_APP_CATEGORIAS + "?apiKey=" + this.apiKey + "&utcTimeStamp=" + this.utcTimeStamp + "&signature=" + this.signature, {
                    headers: {
                        "Referrer-Policy": "no-referrer",
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + localStorage.getItem("tokeOpperweb"),
                    },
                }).then(res => {
                    this.itemsCategorias = res.data;
                    this.loadData = false;
                }).catch(err => {
                    if (err.response.status == 401) {
                        location.href = "/";
                    }
                })
        }

    },
    watch: {
    },
}
</script>

