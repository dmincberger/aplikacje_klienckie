window.addEventListener("load", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    const axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    const raycaster = new THREE.Raycaster()
    const mouseVector = new THREE.Vector2()
    this.document.getElementById("root").appendChild(renderer.domElement);
    renderer.useLegacyLights = true
    const light = new THREE.SpotLight(0xffff00, 10);
    light.position.set(100, 100, 100);

    scene.add(light);
    light.intensity = 1
    intens = document.getElementById('intens')
    posY = document.getElementById('y')

    kula = this.document.getElementById('kula')
    pudlo = this.document.getElementById('pudlo')
    kat = this.document.getElementById('kat')
    class Player {

        constructor() {

            this.container = new THREE.Object3D()
            this.material = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                specular: 0xffffff,
                shininess: 50,
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load("mats/test.jpg"),
            })
            this.geometry = new THREE.BoxGeometry(25, 25, 25)

            this.player = new THREE.Mesh(this.geometry, this.material)

            this.container.add(this.player)

            this.axes = new THREE.AxesHelper(200)

            this.container.add(this.axes)
        }

        getPlayerCont() {
            return this.container
        }

        getPlayerMesh() {
            return this.player
        }

    }

    const ally_geo = new THREE.SphereGeometry(4)
    const ally_material = new THREE.MeshNormalMaterial({})
    let ally = new THREE.Mesh(ally_geo, ally_material)

    scene.add(ally)
    ally.position.set(50, 4, 10)

    const texture = new THREE.TextureLoader().load("mats/test.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    const plane_geo = new THREE.PlaneGeometry(500, 500)
    const plane_material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture })
    const plane = new THREE.Mesh(plane_geo, plane_material)
    plane.rotateX(1.57)
    scene.add(plane)

    let cube = new Player().getPlayerMesh()
    let container = new Player().getPlayerCont()

    scene.add(container)

    light.target = container

    camera.position.set(150, 100, 300)
    camera.lookAt(scene.position);

    window.addEventListener("mousedown", (e) => {
        mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        console.log(intersects.length)
        if (intersects.length > 0) {

            console.log(intersects[0].object);

        }
    });

    kula.addEventListener('change', function () {
        light.target = ally
    })

    pudlo.addEventListener('change', function () {
        light.target = cube
    })

    intens.addEventListener('input', function () {
        light.intensity = intens.value
        console.log(intens.value)
    })

    kat.addEventListener('input', function () {
        ally.position.z = 100 * Math.cos(kat.value * Math.PI / 180)
        ally.position.x = 100 * Math.sin(kat.value * Math.PI / 180)
        console.log(ally.position)
    })

    posY.addEventListener('input', function () {
        light.position.y = posY.value
        console.log(intens.value)
    })

    function render() {
        requestAnimationFrame(render);
        console.log("render leci")
        renderer.render(scene, camera);
    }
    render();
})