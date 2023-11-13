window.addEventListener("load", function () {
    angle = 0
    flaga = false
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / this.window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    const axes = new THREE.AxesHelper(100)
    scene.add(axes)
    const raycaster = new THREE.Raycaster()
    const mousevector = new THREE.Vector2()
    this.document.getElementById("main").appendChild(renderer.domElement)
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const Material = new THREE.MeshNormalMaterial({})
    const cube = new THREE.Mesh(geometry, Material)
    scene.add(cube)
    cube.position.set(20, 0, 20)
    camera.position.y = 0
    camera.position.z = 50
    camera.position.x = 50

    baton = document.getElementById('krec')

    baton.addEventListener("click", function () {
        if (flaga) {
            flaga = false
        } else
            flaga = true
    })

    camera.lookAt(scene.position)
    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
        if (flaga) {
            angle += Math.PI / 180
            camera.position.x = 50 * Math.sin(angle)
            camera.position.z = 50 * Math.cos(angle)
            camera.lookAt(scene.position)
            console.log(angle)
        }
    }
    render()
})