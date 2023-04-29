<template>
    <div class=" mt-10 px-6 lg:px-8">
        <div class="lg:mx-0" v-if="infoPersonal">
            <h2 class="text-3xl tracking-tight text-white sm:text-4xl"><span>Hola</span>, <span class=" font-bold"> {{ infoPersonal.type_user_id == 2 ? infoPersonal.name : infoPersonal.razon_social }} </span></h2>
            <p class="mt-10 text-lg leading-8 text-white">Selecciona una opción:</p>
            <div class="mt-2 max-w-[338px]">
                <router-link to="/dashboard/categorias" custom v-slot="{ navigate }">
                    <button type="button" @click="navigate" role="link"
                        class="button-anime-fuchsia">
                        Ver todas las categorías
                    </button>
                </router-link>
            </div>
            <div class="mt-5 max-w-[338px]">

                <router-link to="/dashboard/categorianueva" custom v-slot="{ navigate }">
                    <button type="button" @click="navigate" role="link"
                        class="button-anime-fuchsia">
                        Crear categorías
                    </button>
                </router-link>
            </div>
            <div class="mt-5 max-w-[338px]">
                    <button type="button" @click="logOut" role="link"
                        class="button-anime-fuchsia">
                        Cerrar sesión
                    </button>


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import functionsCustom from '@/mix/function'
export default {
    mixins: [functionsCustom],
    name: 'homeComponent',

    components: {
    },
    data() {
        return {
            apiKey: process.env.VUE_APP_PUBLIC_KEY,
            utcTimeStamp: null,
            signature: null,
            infoPersonal: null,
        }
    },
    
    created() {
        this.getTimezone();
        setTimeout(() => {
            var infoUser = localStorage.getItem("infoUser");

            if (localStorage.getItem("infoUser")) {
                this.infoPersonal = JSON.parse(localStorage.getItem("infoUser"))
            } else {
                this.infoUser();
            }

        }, 500);
    },
    methods: {
        infoUser() {
            this.signature = this.signatureApi;
            this.utcTimeStamp = this.timezoneApi;

            console.log(this.apiKey,
                this.utcTimeStamp,
                this.signature);

            axios
                .get(process.env.VUE_APP_ME + "?apiKey=" + this.apiKey + "&utcTimeStamp=" + this.utcTimeStamp + "&signature=" + this.signature, {
                    headers: {
                        "Referrer-Policy": "no-referrer",
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + localStorage.getItem("tokeOpperweb"),
                    },
                }).then(res => {
                    
                    localStorage.setItem("infoUser", JSON.stringify(res.data));

                    this.infoPersonal = JSON.parse(localStorage.getItem("infoUser"))

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