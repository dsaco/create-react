import { observable, action, configure, runInAction } from 'mobx';

configure({ enforceActions: 'always' });

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export default class AboutStore {
    @observable list = [];

    @action fetchList = async () => {
        const list = await delay(3000).then(() => [1, 2, 3]);
        runInAction('get list', () => {
            this.list = this.list.concat(list);
        });
    }
}
