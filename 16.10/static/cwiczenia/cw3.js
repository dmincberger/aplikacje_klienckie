window.addEventListener("load", function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, this.window.innerWidth / this.window.innerHeight, 0.1, 10000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xffffff);
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    document.getElementById("main").appendChild(renderer.domElement);
    const orbitControl = new THREE.OrbitControls(camera, renderer.domElement);

    let FOV = this.document.getElementById('FOV')
    let PosY = this.document.getElementById('Y')
    let kostki = this.document.getElementById('kostki')

    camera.position.set(500, 1000, 700)
    camera.lookAt(scene.position);
    const axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5
    });
    let cube = new THREE.Mesh(geometry, material);

    kostki.addEventListener("input", function () {
        for (var i = scene.children.length - 1; i >= 0; i--) {
            obj = scene.children[i];
            scene.remove(obj);
        }
        let dlugosc = 10 + kostki.value
        console.log(kostki.value)
        console.log(scene.children)
        for (let i = 0; i < 11; i++) {
            let cubek = new THREE.Mesh(geometry, material);
            scene.add(cubek)
            cubek.position.x = i * 50
            cubek.position.y = i * 50
            let cube = new THREE.Mesh(geometry, material)
            scene.add(cube)
            cube.position.x = 550
            cube.position.z = i * 50
            cube.position.y = 550 - 50 * i
            let kostek = new THREE.Mesh(geometry, material);
            scene.add(kostek)
            kostek.position.y = i * 50
            kostek.position.x = 550 - 50 * i
            kostek.position.z = 550
            let bostek = new THREE.Mesh(geometry, material);
            scene.add(bostek)
            bostek.position.y = 550 - i * 50
            bostek.position.z = 550 - i * 50
        }
    })


    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });

    function render() {
        requestAnimationFrame(render);
        console.log("render leci")
        renderer.render(scene, camera)
    }
    render();

})