window.addEventListener("load", function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / this.window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    const raycaster = new THREE.Raycaster()
    const mouseVector = new THREE.Vector2()
    let clickvector = new THREE.Vector3(0, 0, 0)
    let directionVect = new THREE.Vector3(0, 0, 0)
    renderer.setSize(window.innerWidth, this.window.innerHeight)
    this.document.getElementById("main").appendChild(renderer.domElement)
    const axes = new THREE.AxesHelper(100)
    renderer.setClearColor(0x0066ff);

    scene.add(axes)
    class Szescian {

        constructor() {

            this.container = new THREE.Object3D()
            this.box = new THREE.BoxGeometry(20, 20, 20)
            this.material = new THREE.MeshNormalMaterial({})
            this.cube = new THREE.Mesh(this.box, this.material);

            this.axes = new THREE.AxesHelper(200)

            this.container.add(this.axes)
        }

        getCubeCont() {
            return this.container
        }

        getCubeMesh() {
            return this.cube
        }

    }

    class Sphere {
        constructor() {
            this.sphere = new THREE.SphereGeometry(4)
            this.material = new THREE.MeshNormalMaterial({})
            this.okrag = new THREE.Mesh(this.sphere, this.material)
        }

        getSphere() {
            return this.okrag
        }
    }

    class Plansza {
        constructor() {
            this.geometry = new THREE.PlaneGeometry(400, 400)
            this.material = new THREE.MeshBasicMaterial({
                color: 0xffff00, side:
                    THREE.DoubleSide
            })
            this.plane = new THREE.Mesh(this.geometry, this.material)
            this.plane.rotateX(1.57)
        }

        getPlane() {
            return this.plane
        }

    }
    let ally = new Sphere().getSphere()
    scene.add(ally)
    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position)
    let Plane = new Plansza().getPlane()
    scene.add(Plane)
    let cube = new Szescian()
    let container = cube.getCubeCont()
    let kostka = cube.getCubeMesh()
    container.add(kostka)
    scene.add(container)
    container.position.y = 10
    cube.getCubeMesh().position.y = 10
    ally.position.y = 10
    window.addEventListener("mousedown", (e) => {
        mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera)
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            let angle = Math.atan2(
                cube.getCubeCont().position.clone().x - clickvector.x,
                cube.getCubeCont().position.clone().z - clickvector.z
            )
            cube.getCubeMesh().rotation.y = angle

            clickvector = intersects[0].point
            console.log(clickvector)
            ally.position.x = clickvector.x
            ally.position.z = clickvector.z

            directionVect = clickvector.clone().sub(cube.getCubeCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
            console.log(directionVect)
            console.log(cube.getCubeCont().position.clone().distanceTo(clickvector))
        }
    })


    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
        camera.position.x = cube.getCubeCont().position.x
        camera.position.z = cube.getCubeCont().position.z + 200
        camera.position.y = cube.getCubeCont().position.y + 200
        camera.lookAt(cube.getCubeCont().position)
        if (cube.getCubeCont().position.clone().distanceTo(clickvector) > 1)
            cube.getCubeCont().translateOnAxis(directionVect, 2)
        // console.log(cube.getCubeCont().position.clone().distanceTo(clickvector))
    }
    render()
})