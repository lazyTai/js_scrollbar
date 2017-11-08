function query(str) {
    return document.querySelector('str')
}
function getSizePos(element) {
    var rect = element.getBoundingClientRect();
    return rect
}
export { query, getSizePos }