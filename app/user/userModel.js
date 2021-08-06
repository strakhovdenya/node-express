import EntityDriver from '../../libs/entities/entityDriver.js';
import config from 'config';

const userEntity = config.get("user_entity");

export default class UserModel extends EntityDriver {
    constructor() {
        super([userEntity]);
    }

    get(id) {
        return super.get(userEntity, id)
    }

    create(entity) {
        return super.create(userEntity, entity)
    }

    delete(id) {
        return super.delete(userEntity, id)
    }

    update(entity) {
        return super.update(userEntity, entity)
    }

}