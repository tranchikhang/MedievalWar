class Utils {

    static sleep(time = Config.DialogTransitionTime) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}