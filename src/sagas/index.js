import { all } from 'redux-saga/effects';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';
import provinces from './province'
import customer from './customer'
import address from './address'
import ranks from './ranks';
import employee from './employee'
import productCategory from './productCategory'
import store from './store'
import variant from './variant'
import variantTemplate from './variantTemplate'
import product from './product'
import tags from './tags'
import order from './order'

const sagas = [
    ...appCommon,
    ...account,
    ...user,
    ...groupPermission,
    ...category,
    ...news,
    ...provinces,
    ...customer,
    ...address,
    ...ranks,
    ...employee,
    ...productCategory,
    ...store,
    ...variant,
    ...variantTemplate,
    ...product,
    ...tags,
    ...order,
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
