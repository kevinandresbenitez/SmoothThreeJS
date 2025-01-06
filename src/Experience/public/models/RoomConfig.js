import * as THREE from 'three'

export function configureModel(model){
        // load element from the model
        model.scene.children.forEach((element)=>{
            element.castShadow = true;
            element.receiveShadow = true;          


            if (element instanceof THREE.Group) {
                element.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if (element.name === "Aquarium") {
                element.children[0].material = new THREE.MeshPhysicalMaterial();
                element.children[0].material.roughness = 0;
                element.children[0].material.color.set(0x549dd2);
                element.children[0].material.ior = 3;
                element.children[0].material.transmission = 1;
                element.children[0].material.opacity = 1;
            }

             //Elements in the mini floor
            
             if (element.name === "Mini_Floor") {
                
                 element.position.x = -0.289521;
                 element.position.z = 8.83572;
                 
             }
             if(element.name == 'Mailbox'){
                /*
                 element.position.x = 5;
                 element.position.z = 3;
                 */
                element.position.y = -7;
                
             }
             if(element.name == 'FloorFirst' || element.name == 'FloorSecond' || element.name == 'FloorThird'){
                /*
                 element.position.x = -3;
                 element.position.z = 3;
                 */
                element.scale.set(0)
             }
             if(element.name == 'Dirt'){
                /*
                 element.position.x = -3;
                 element.position.z = 3;
                 */
                element.scale.set(0)
             }
             if(element.name == 'Flower1' || element.name == 'Flower2'){
                /*
                 element.position.x = -3;
                 element.position.z = 3;
                 */
                element.scale.set(0)
             }
             if(element.name == 'Lamp'){
                /*
                 element.position.x = -3;
                 element.position.z = 3;
                 */
                element.scale.set(0)
             }
            
        })

        // Add Floor
        const geometry = new THREE.PlaneGeometry(40,40);
        const material = new THREE.MeshStandardMaterial( {color: '#c7e4d2', side: THREE.BackSide});
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI / 2;
        plane.rotation.z =Math.PI /4;
        plane.position.y = -1.5;
        plane.receiveShadow = true;
        model.scene.add(plane);

        // Size main model
        model.scene.scale.set(0.11,0.11,0.11)

}