///////////////
var mainContainer = document.getElementById('main-container');
var width = mainContainer.offsetWidth,
height = 500;
const backgroundColor = '#eee';

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 );

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.setClearColor( backgroundColor );//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(  width, height );
}, false );

elem = document.getElementById('webgl-container');
elem.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.set(93, 1.12, 113);

controls.rotateSpeed = 0.07;
controls.zoomSpeed = 0.5;

controls.minDistance = 1;
controls.maxDistance = 1000;
controls.autoRotate  = true;
controls.autoRotateSpeed  = 0.03;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.07;

renderCalls.push(function(){
  controls.update()
});
function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

/* ////////////////////////////////////////////////////////////////////////// */


// var light = new THREE.PointLight( 0xffffcc, 7, 50 );
// light.position.set(10 , 10, 10 );
// light.castShadow = true;            // default false

// scene.add( light );

var light2 = new THREE.AmbientLight( 0x20202A, 7, 100 );
light2.position.set( 30, -10, 30 );
scene.add( light2 );

var light3 = new THREE.PointLight( 0xffffcc, 7, 40 );
light3.position.set( -10, -10, 2 );
light3.castShadow = true;  
scene.add( light3 );
/* ////////////////////////////////////////////////////////////////////////// */

var loader = new THREE.ObjectLoader();
loader.load(
	// resource URL
	"models/gun2/mp5k.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
		scene.add( obj );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);
// // Instantiate a loader
// var loader = new THREE.GLTFLoader();

// // Load a glTF resource
// loader.load(
// 	// resource URL
// 	'models/mp5k.gltf',
// 	// called when the resource is loaded
// 	function ( gltf ) {

// 		scene.add( gltf.scene );

// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object

// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );


