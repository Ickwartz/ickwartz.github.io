import {EditExercisesHandler} from "./modules/editExercisesHandler.js";
import {EditExerciseModal} from "./webComponents/editExerciseModal.js";


window.onload = () => {
    window.customElements.define("edit-modal", EditExerciseModal);
    let editHandler = new EditExercisesHandler();
    editHandler.loadExercises();
    editHandler.snackbar.addSnackbar();
};