<template>
    <div class=" mt-10 px-6 lg:px-8">
        <div class="lg:mx-0">
            <h2 class="text-3xl tracking-tight text-white sm:text-4xl"><span class=" font-bold">{{ typeForm == 'new' ?
                'Crear categoría' : 'Actualizar categoría' }} </span></h2>
            <div class="mt-10">
                <Form @submit.prevent @keydown.enter="$event.preventDefault()" ref="formCategoria" v-slot="{ errors }" class="space-y-6 max-w-[338px]">
                    <div>
                        <label for="nombre" class="block text-sm text-white ">Nombre de categoría</label>
                        <div class="mt-2">
                            <Field :class="errors.nombre ? 'border-2 border-red-500' : ''" :rules="isRequired" v-model="formCategoria.nombre" id="nombre" name="nombre" type="text" required=""
                                class="block bg-gray-500  w-full font-semibold rounded-md border-0 py-4 text-white " />
                                <span class="text-red-500 float-right">{{ errors.nombre }}</span>
                        </div>

                    </div>
                    <div>
                        <div class="mt-10">
                            <button v-if="typeForm == 'new'" type="button" @click="createCategoria()"
                                class="button-anime-fuchsia">
                                Crear
                            </button>
                            <button v-else-if="typeForm == 'edit'" type="button" @click="updateCategoria()"
                                class="button-anime-fuchsia">
                                Actualizar
                            </button>

                        </div>

                    </div>

                </Form>
            </div>

        </div>
    </div>
</template>


<script>
import axios from 'axios'
import functionsCustom from '@/mix/function'
import { Field, Form } from 'vee-validate';

export default {
    mixins: [functionsCustom],

    name: 'newComponent',
    components: {
        Field, Form
    },
    data() {
        return {


            formCategoria: {
                nombre: null,
                apiKey: process.env.VUE_APP_PUBLIC_KEY,
                utcTimeStamp: null,
                signature: null,
            },

            infoCategoria: null,
            typeForm: 'new'

        }
    },
    created() {
        this.getTimezone();
        if (this.$route.params.id) {
            this.typeForm = "edit";
            this.formCategoria.nombre = this.$route.params.name
        }

    },
    methods: {
        updateCategoria() {


            this.formCategoria.signature = this.signatureApi;
            this.formCategoria.utcTimeStamp = this.timezoneApi;


            this.$refs.formCategoria.validate().then(validate => {
                if (validate.valid) {

                    axios
                        .put(process.env.VUE_APP_CATEGORIA_UPDATE + this.$route.params.id,
                            this.formCategoria, {
                            headers: {
                                "Referrer-Policy": "no-referrer",
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "application/json",
                                Authorization: 'Bearer ' + localStorage.getItem("tokeOpperweb"),
                            },
                        }).then(res => {


                            if (res.data.categoria) {
                                this.$swal.fire(
                                    '¡Buen trabajo!',
                                    'La información ha sido actualizada correctamente.',
                                    'success'
                                ).then(function () {
                                    window.location = "/dashboard/categorias";
                                });
                            }


                        }).catch(err => {
                            if (err.response.status == 401) {
                                location.href = "/";
                            }


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

                            } else {
                                this.$swal.fire(
                                    '¡Ups!',
                                    'Algo ha salido mal, vuelve a intentarlo más tarde.',
                                    'error'
                                )
                            }
                        })
                }
            })



        },
        createCategoria() {
            this.formCategoria.signature = this.signatureApi;
            this.formCategoria.utcTimeStamp = this.timezoneApi;


            this.$refs.formCategoria.validate().then(validate => {
                if (validate.valid) {

                    axios
                        .post(process.env.VUE_APP_CATEGORIA_CREATE,
                            this.formCategoria, {
                            headers: {
                                "Referrer-Policy": "no-referrer",
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "application/json",
                                Authorization: 'Bearer ' + localStorage.getItem("tokeOpperweb"),
                            },
                        }).then(res => {
                            if (res.data.categoria) {
                                this.$swal.fire(
                                    '¡Buen trabajo!',
                                    'La información ha sido creada correctamente.',
                                    'success'
                                ).then(function () {
                                    window.location = "/dashboard/categorias";
                                });
                            }
                        }).catch(err => {
                            if (err.response.status == 401) {
                                location.href = "/";
                            }


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

                            } else {
                                this.$swal.fire(
                                    '¡Ups!',
                                    'Algo ha salido mal, vuelve a intentarlo más tarde.',
                                    'error'
                                )
                            }
                        })
                }
            })
        }

    },
    watch: {
    },
}
</script>

