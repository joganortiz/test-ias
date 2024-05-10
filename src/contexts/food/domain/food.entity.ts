import { FoodId } from "./value-object/food-id";
import { FoodName } from "./value-object/food-name";

export class Food {
    public readonly id: FoodId;
    public readonly name: FoodName;

    constructor({ id, name }: { id: FoodId; name: FoodName }) {
        this.id = id
        this.name = name
    }

    static create({ id, name }: { id: string; name: string }) {
        return new Food({ id: new FoodId(id), name: new FoodName(name) })
    }

    toPrimitives(): {
        _id: string;
        name: string
    } {
        return {
            _id: this.id.value,
            name: this.name.value
        }
    }

    static fromPrimitives(dataFood: {_id: string; name: string}) {
        return new Food({id: new FoodId(dataFood._id), name: new FoodName(dataFood.name)})
    }
}
