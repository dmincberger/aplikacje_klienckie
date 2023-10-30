

window.addEventListener("load", function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / this.window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    const raycaster = new THREE.Raycaster()
    const mousevector2 = new THREE.Vector2()
    renderer.setSize(window.innerWidth, window.innerHeight)

    this.document.getElementById("main").appendChild(renderer.domElement)
    camera.position.x = 20
    camera.position.y = 20
    camera.position.z = 20
    camera.lookAt(0, 0, 0)
    const obj = new THREE.Object3D()
    const material = new THREE.MeshNormalMaterial()
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0)
    obj.add(cube);
    scene.add(obj);

    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
})