<template>
  <q-page>
    <div class="row q-pa-md flex flex-center">
      <!-- <div class="col col-sm-12 col-md-8 col-xl-4">
        <search-bar></search-bar>
      </div> -->
    </div>
    <div class="row flex flex-center q-pa-md">
      <div
        class="col col-sm-12 col-md-8 col-xl-4 menu-card-position flex flex-center"
      >
        <menu-card></menu-card>
      </div>
    </div>
    <q-btn @click="promptInfo">INFO</q-btn>
    <q-btn @click="promptConfirm">CONFIRM</q-btn>
    <q-btn @click="promptError">ERROR</q-btn>
    <q-btn @click="promptSuccess">SUCCESS</q-btn>
    <q-btn @click="promptWarning">WARNING</q-btn>
  </q-page>
  <q-dialog v-model="info">
    <info-modal :infoMessage="message"></info-modal>
  </q-dialog>
  <q-dialog v-model="confirm">
    <confirmation-modal :confirmMessage="message"></confirmation-modal>
  </q-dialog>
  <q-dialog v-model="error">
    <error-modal :errorMessage="message"></error-modal>
  </q-dialog>
  <q-dialog v-model="success">
    <success-modal :successMessage="message"></success-modal>
  </q-dialog>
  <q-dialog v-model="warning">
    <warning-modal :warningMessage="message"></warning-modal>
  </q-dialog>
</template>

<script>
import SearchBar from "src/components/SearchBar.vue";
import MenuCard from "../components/MenuCard.vue";
import InfoModal from "src/components/InfoModal.vue";
import { ref } from "vue";
import ConfirmationModal from "src/components/ConfirmationModal.vue";
import ErrorModal from "src/components/ErrorModal.vue";
import SuccessModal from "src/components/SuccessModal.vue";
import WarningModal from "src/components/WarningModal.vue";

export default {
  name: "DashboardPage",
  components: {
    MenuCard,
    // SearchBar,
    InfoModal,
    ConfirmationModal,
    ErrorModal,
    SuccessModal,
    WarningModal,
  },
  data() {
    console.log("dashboard");
    return {
      info: ref(false),
      confirm: ref(false),
      error: ref(false),
      success: ref(false),
      warning: ref(false),
      message: ref(null),
    };
  },
  methods: {
    promptInfo() {
      this.info = !this.info;
      this.message = "INFOINFONINFO123asda";
    },
    promptConfirm() {
      this.confirm = !this.confirm;
      this.message = "CONFIRMCONFIRMASDA";
    },
    promptError() {
      this.error = !this.error;
      this.message = "ERRORRRRASDAD";
    },
    promptSuccess() {
      this.success = !this.success;
      this.message = "SUCCESSSYEYEYEY";
    },
    promptWarning() {
      this.warning = !this.warning;
      this.message = "WARNINGWARNINGNINONINO";
    },
  },
  mounted() {
    console.log(this.message);
  },
};
</script>

<style scoped>
.menu-card-position {
  height: 600px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
