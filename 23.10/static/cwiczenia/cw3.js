const { Mesh } = require("../three")

window.addEventListener("load", function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    const axes = new THREE.AxesHelper(100)
    scene.add(axes)
    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position)
    renderer.setClearColor(0x0066ff);

    this.document.getElementById("main").appendChild(renderer.domElement)
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const texture = new THREE.TextureLoader().load('mats/donald.jpg')
    const material = {
        side: THREE.DoubleSide,
        map: texture,
    }
    let cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    function render() {
        Mesh.rotat
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
})