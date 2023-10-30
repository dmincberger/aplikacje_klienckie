
window.addEventListener("load", function () {
    const Scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / this.window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    const Raycaster = new THREE.Raycaster()
    const MouseVector = new THREE.Vector2()
    this.document.getElementById("main").appendChild(renderer.domElement)
    let rotate = false
    let obrot = 0
    let current_mesh = null
    let obiekty = []

    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 100
    camera.lookAt(0, 0, 0)
    const box_geometry = new THREE.BoxGeometry(10, 10, 10)
    const box_mesh = new THREE.MeshNormalMaterial()
    const cube_1 = new THREE.Mesh(box_geometry, box_mesh)
    const cube_2 = new THREE.Mesh(box_geometry, box_mesh)
    const cube_3 = new THREE.Mesh(box_geometry, box_mesh)

    cube_2.position.y = 20
    cube_2.position.z = 10
    cube_3.position.y = -20
    cube_3.position.z = 10
    renderer.setSize(window.innerWidth, window.innerHeight)
    cube_1.name = "cube2"
    cube_2.name = "cube1"
    cube_3.name = "cube3"
    Scene.add(cube_1)
    Scene.add(cube_2)
    Scene.add(cube_3)



    window.addEventListener("mousedown", (e) => {
        MouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
        MouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
        Raycaster.setFromCamera(MouseVector, camera)
        const intersects = Raycaster.intersectObjects(Scene.children);
        current_mesh = intersects[0].object
        if (obiekty.includes(current_mesh)) {
            delete obiekty[obiekty.indexOf(current_mesh)]
        } else {
            obiekty.push(current_mesh)

        }
        console.log(obiekty)
    });

    function render() {
        requestAnimationFrame(render)
        renderer.render(Scene, camera)
        for (let index = 0; index < obiekty.length; index++) {
            if (obiekty[index]) {
                obiekty[index].rotation.y += 0.1
            }
        }
    }
    render()
})