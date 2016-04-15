function getDocHeight() {
    return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
            );
}
function resetDocumentHeight() {
    var func = function () {
        document.body.style.minHeight = "100%";
    };
    setTimeout(func, 100);

}
function changeDocumentHeight() {
    var hei = getDocHeight();
    document.body.style.minHeight = hei + "px";
}
    