
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:col-start-1 md:col-auto">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img width="277" class="mx-auto  w-auto" src="@/assets/images/icon-login.png" alt="Your Company" />
            <h2 class="text-center text-3xl font-bold leading-9 tracking-tight text-white">ひさしぶり!</h2>
            <p class="text-center italic tracking-tight text-white">¡Hola, te extrañamos!</p>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form @submit.prevent @keydown.enter="$event.preventDefault()" ref="formLogin" class="space-y-6" action="#" method="POST" v-slot="{ errors }">
                <div>
                    <label for="email" class="block text-sm text-white ">Email</label>
                    <div class="mt-2">
                        <Field :class="errors.email ? 'border-2 border-red-500' : ''" :rules="isEmail"
                            v-model="formLogin.email" id="email" name="email" type="email" autocomplete="email" required=""
                            class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white   sm:text-sm sm:leading-6" />
                        <span class="text-red-500 float-right">{{ errors.email }}</span>
                    </div>

                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm text-white">Contraseña</label>

                    </div>
                    <div class="mt-2">
                        <Field :class="errors.password ? 'border-2 border-red-500' : ''" :rules="isRequired"
                            v-model="formLogin.password" id="password" name="password" type="password"
                            autocomplete="current-password" required=""
                            class="block bg-gray-500 w-full font-semibold rounded-md border-0 py-4 text-white   sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <a href="#"
                            class="font-semibold float-right text-fuchsia-400 hover:text-fuchsia-500 leading-9">¿Olvido
                            la contraseña?</a>

                       
                    </div>


                </div>

                <div>
                    &nbsp;
                </div>
                <div>
                    <button type="button" @click="loginUser" class="button-anime-fuchsia">
                        Acceder
                    </button>
                </div>

                <div class="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 sm:col-start-1 md:col-auto">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <p class="text-center tracking-tight text-white">Regístrate también con</p>
                    </div>


                </div>
                <figcaption class="mt-0">

                    <div class="mt-0 flex items-center justify-center space-x-3 text-base">
                        <div class="text-gray-600"><img src="@/assets/images/social1.png" alt="" srcset=""></div>
                        <div class="text-gray-600"><img src="@/assets/images/social2.png" alt="" srcset=""></div>
                        <div class="text-gray-600"><img src="@/assets/images/social3.png" alt="" srcset=""></div>
                    </div>
                </figcaption>


            </Form>

            <p class="mt-10 text-center  text-white">
                Quieres registrarte?
                <router-link to="/register"
                    class="font-semibold leading-6 text-fuchsia-500 hover:text-fuchsia-400">Registrate</router-link>

            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import functionsCustom from '@/mix/function'
import { Field, Form } from 'vee-validate';


export default {
    mixins: [functionsCustom],

    name: 'loginComponent',
    components: {
        Field,
        Form,
    },
    data() {
        return {
            formLogin: {
                email: null,
                password: null,
                apiKey: process.env.VUE_APP_PUBLIC_KEY,
                utcTimeStamp: null,
                signature: null
            }
        }
    },
    created() {
        this.getTimezone();
    },
    methods: {
       
        loginUser() {

            this.$refs.formLogin.validate().then(validate => {
                if (validate.valid) {


                    this.formLogin.signature = this.signatureApi;
                    this.formLogin.utcTimeStamp = this.timezoneApi;
                    axios.post(process.env.VUE_APP_LOGIN,
                        this.formLogin
                    )
                        .then(res => {
                            if (res.data.access_token) {
                                //SE AUTENTICO OK
                                localStorage.setItem("tokeOpperweb", res.data.access_token);
                                this.$router.push({ path: '/dashboard' })

                            }
                        })
                        .catch(err => {

                            if (err.response.status == 422) {

                                var errores = '';

                                if (err.response.data.errors) {
                                    let erroresForm = err.response.data.errors;

                                    let claves = Object.keys(erroresForm); // claves = ["nombre", "color", "macho", "edad"]
                                    for (let i = 0; i < claves.length; i++) {
                                        let clave = claves[i];

                                        if (Array.isArray(erroresForm[clave])) {
                                            erroresForm[clave].forEach(element => {

                                                errores = errores.concat("<li>" + element + "</li>");
                                            });
                                        }
                                    }
                                }

                                this.$swal.fire({
                                    title: '<strong>¡Ups!</strong>',
                                    html: 'No se ha podido procesar la solicitud. <ul class="errores-form"> ' + errores + ' </ul>',
                                    icon: 'warning'
                                })

                            } else if (err.response.data.error && err.response.data.error == 'Unauthorized') {
                                this.$swal.fire(
                                    '¡Ups!',
                                    'El email o contraseña son incorrectos, vuelve a intentarlo.',
                                    'error'
                                )
                            } else {
                                this.$swal.fire(
                                    '¡Ups!',
                                    'Algo ha salido mal, vuelve a intentarlo más tarde.',
                                    'error'
                                )
                            }

                        })
                }
            });



        }

    },
    watch: {
    },
}
</script>
