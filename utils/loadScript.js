export default function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}
