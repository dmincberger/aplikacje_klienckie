

window.addEventListener("load", function () {
    let angle = 0
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
    const mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

    document.getElementById("main").appendChild(renderer.domElement);
    camera.position.x = 200
    camera.position.y = 200
    camera.position.z = 200
    const axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    camera.lookAt(scene.position)

    renderer.setSize(window.innerWidth, window.innerHeight)

    camera.lookAt(scene.position)

    let geometry = new THREE.BoxGeometry(100, 100, 100)
    const texture = new THREE.TextureLoader().load('mats/donald.jpg')
    texture.colorSpace = THREE.SRGBColorSpace

    let materials = []

    for (let i = 0; i < 6; i++) {
        materials.push(new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: texture,
        }))
    }

    let cube = new THREE.Mesh(geometry, materials)

    scene.add(cube)


    window.addEventListener("keydown", (e) => {
        camera.position.x++
        camera.position.y += Math.sin(angle)
        camera.position.x = 200 * Math.cos(angle / 180)
        camera.position.z = 200 * Math.cos(angle / 180)
        camera.lookAt(scene.position)
        angle += 0.1
    })

    window.addEventListener("mousedown", (e) => {
        mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
        const intersects = raycaster.intersectObjects(scene.children);
        console.log(intersects)

    });
    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
        raycaster.setFromCamera(mouseVector, camera);
    }
    render()
})