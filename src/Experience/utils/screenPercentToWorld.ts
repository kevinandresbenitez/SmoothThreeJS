import * as THREE from 'three';

export function screenPercentToWorldX(camera: any, screenPercent: number, worldZ: number) {
    // Perspective camera
    if ((camera as any).isPerspectiveCamera) {
        const ndcX = screenPercent * 2 - 1;
        const ndc = new THREE.Vector3(ndcX, 0, 0.5).unproject(camera);
        const dir = ndc.sub(camera.position).normalize();
        const distance = (worldZ - camera.position.z) / dir.z;
        return camera.position.clone().add(dir.multiplyScalar(distance)).x;
    }

    // Orthographic camera
    if ((camera as any).isOrthographicCamera) {
        const width = camera.right - camera.left;
        return camera.left + screenPercent * width;
    }

    return 0;
}