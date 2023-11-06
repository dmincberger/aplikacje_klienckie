window.addEventListener("load", function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / this.window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    const raycaster = new THREE.Raycaster()
    const mousevector2 = new THREE.Vector2()
    renderer.setSize(window.innerWidth, window.innerHeight)
    const axes = new THREE.AxesHelper(100)
    scene.add(axes)
    renderer.setClearColor(0x0066ff);
    camera.position.set(200, 50, 100)
    let cubeX = this.document.getElementById("cubeX")
    let objX = this.document.getElementById("objX")



    class Szescian {

        constructor() {

            this.container = new THREE.Object3D()
            this.box = new THREE.BoxGeometry(20, 20, 20)
            this.material = new THREE.MeshNormalMaterial({})
            this.cube = new THREE.Mesh(this.box, this.material); // player sześcian

            this.axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu

            this.container.add(this.axes)
        }



        //funkcja zwracająca cały kontener

        getCubeCont() {
            return this.container
        }

        //funkcja zwracająca playera czyli sam sześcian

        getCubeMesh() {
            return this.cube
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
    const plane = new Plansza().getPlane()
    scene.add(plane)
    const cube_1 = new Szescian().getCubeMesh()
    const cube_2 = new Szescian().getCubeMesh()
    const cube_3 = new Szescian().getCubeMesh()
    cube_1.position.set(0, 0, 0)
    cube_2.position.set(0, 30, 0)
    cube_3.position.set(30, 0, 0)
    const container = new Szescian().getCubeCont()
    container.add(cube_1)
    container.add(cube_2)
    container.add(cube_3)
    scene.add(container)
    this.document.getElementById("main").appendChild(renderer.domElement)
    camera.lookAt(scene.position)

    cubeX.addEventListener("input", function () {
        cube_1.position.x = cubeX.value
        console.log(objX.value)
    })

    objX.addEventListener("input", function () {
        container.position.x = objX.value
        console.log(objX.value)
    })

    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
})