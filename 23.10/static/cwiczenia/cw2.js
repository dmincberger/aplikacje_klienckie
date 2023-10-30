window.addEventListener("load", function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    this.document.getElementById("main").appendChild(renderer.domElement)
    this.window.addEventListener("keydown", (e) => {
        this.document.getElementById("main").replaceChildren()
        this.document.getElementById("main").append(e.keyCode)
    })
})