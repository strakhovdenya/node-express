import EntityDriver from '../../libs/entities/entityDriver.js';
import config from 'config';

const postEntity = config.get("post_entity");


export default class PostModel extends EntityDriver {
    constructor() {
        super([postEntity]);
    }

    get(id) {
        return super.get(postEntity, id);
    }

    create(entity) {
        return super.create(postEntity, entity)
    }

    delete(id) {
        return super.delete(postEntity, id)
    }

    update(entity) {
        return super.update(postEntity, entity)
    }
}