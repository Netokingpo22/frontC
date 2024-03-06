<script setup>
const props = defineProps({
    dialogDeleteOpen: Boolean,
    tittle: String,
});
</script>
<template>
    <v-dialog :model-value="dialogDeleteOpen" @update:modelValue="dialogDeleteOpen = $event" max-width="500" class="font-mono">
        <template v-slot:default="{ dialogDeleteOpen }">
            <v-card>
                <v-card-text class="bg-slate-200 text-slate-800">
                    <div>
                        <h1 class="text-center text-4xl font-bold antialiased">Eliminar</h1>
                    </div>
                    <div class="w-full h-[2px] bg-slate-800 mt-2"></div>
                    <div class="flex flex-col m-6 pb-4 max-w-lg">
                        <slot></slot>
                        <v-btn class="text-none w-full my-1" color="#e6a1a1" variant="outlined"
                            @click="dialogDeleteOpen = false">
                            <p class="font-bold">Cancelar</p>
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>