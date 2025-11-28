import { Sizes } from "../../utils/Sizes";

export class ScaleModel {



    static getSmallScale() {

        if (Sizes.width < 1250) {
            return Sizes.width / 40000;
        }

        return Sizes.width / 70000;
    }

    static getBigScale() {
        if (Sizes.width < 1250) {
            return Sizes.width / 15000;
        }
        return Sizes.width / 20000;
    }


}