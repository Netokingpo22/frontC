<script setup></script>

<template >
  <RouterView />
</template>

<style scoped></style>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #94a3b8;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #64748b;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

.v-table {
  background: rgb(226 232 240);
}

.v-list {
  background: rgb(226 232 240);
}

.v-list-item {
  background: rgb(226 232 240);
}

.v-menu>.v-overlay__content>.v-card,
.v-menu>.v-overlay__content>.v-sheet,
.v-menu>.v-overlay__content>.v-list {
  background: rgb(226 232 240);
}

.v-dialog>.v-overlay__content>.v-card,
.v-dialog>.v-overlay__content>form>.v-card {
  background: rgb(226 232 240);
}

.v-select .v-select__selection-text {
  font-size: 0.75rem;
  line-height: 1rem;
}

.v-list-item-title {
  font-size: 0.75rem;
  line-height: 1rem;
}

.v-data-table__tr {
  text-align: left;
  align-items: start;
  justify-items: left;
}
</style>
