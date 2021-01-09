class Utils {

    static sleep() {
        return new Promise(resolve => setTimeout(resolve, Config.DialogTransitionTime));
    }
}