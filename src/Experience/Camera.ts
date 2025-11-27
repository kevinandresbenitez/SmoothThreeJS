
import Experience from "./Experience";
import { Sizes } from "./utils/Sizes";
import * as THREE from 'three';

export class Camera {
    mainExperience: Experience;

    #perspectiveCamera!: THREE.PerspectiveCamera;
    #orthographicCamera!: THREE.OrthographicCamera;
    #mainCamera!: THREE.Camera;

    constructor() {
        this.mainExperience = new Experience();
    }

    setMainCamera(camera: THREE.Camera): void {
        this.#mainCamera = camera;
    }

    getMainCamera(): THREE.Camera {
        return this.#mainCamera;
    }

    getPerspectiveCamera(): THREE.PerspectiveCamera {
        return this.#perspectiveCamera;
    }

    getOrthographicCamera(): THREE.OrthographicCamera {
        return this.#orthographicCamera;
    }

    addPerspectiveCamera(): void {

        if (this.getPerspectiveCamera()) {
            throw new Error('Perspective camera already exist');
        }

        let PerspectiveCamera = new THREE.PerspectiveCamera(35, Sizes.aspect, 0.1, 1000);
        this.#perspectiveCamera = PerspectiveCamera;
        this.mainExperience.scene.add(PerspectiveCamera);

    };

    addOrthographicCamera(): void {

        if (this.getOrthographicCamera()) {
            throw new Error('Orthographic camera already exist');
        }

        let OrthographicCamera = new THREE.OrthographicCamera(
            (-Sizes.aspect * Sizes.frustrum) / 2,
            (Sizes.aspect * Sizes.frustrum) / 2,
            (Sizes.frustrum / 2),
            (-Sizes.frustrum / 2),
            -20, 20
        );
        this.#orthographicCamera = OrthographicCamera;
        this.mainExperience.scene.add(OrthographicCamera);
        this.#mainCamera = this.#orthographicCamera

    };

    areCamerasEnabled(): boolean {
        return (this.getPerspectiveCamera() != null && this.getOrthographicCamera() != null)
    }

    updateProjectionMatrix(): void {
        if (!this.areCamerasEnabled()) {
            throw Error("Cameras are not enabled")
        }
        this.getPerspectiveCamera().updateProjectionMatrix();
        this.getOrthographicCamera().updateProjectionMatrix();
    }

    resize(): void {
        if (!this.areCamerasEnabled()) {
            throw Error("Cameras are not enabled")
        }

        // Update Aspect in cameras perspective 
        this.getPerspectiveCamera().aspect = Sizes.aspect;

        // Update properties in camera ortograpic 
        this.getOrthographicCamera().left = (-Sizes.aspect * Sizes.frustrum) / 2;
        this.getOrthographicCamera().right = (Sizes.aspect * Sizes.frustrum) / 2;
        this.getOrthographicCamera().top = (Sizes.frustrum / 2);
        this.getOrthographicCamera().bottom = (-Sizes.frustrum / 2);

    }


}