import { combineReducers } from 'redux';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';
import province from './province';
import customer from './customer';
import address from './address';
import ranks from './ranks';
import employee from './employee';
import productCategory from './productCategory';
import store from './store';
import variant from './variant';
import variantTemplate from './variantTemplate';
import product from './product';
import tags from './tags';
import order from './order';

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    user: user.reducer,
    groupPermission: groupPermission.reducer,
    category: category.reducer,
    news: news.reducer,
    province:province.reducer,
    customer:customer.reducer,
    address:address.reducer,
    ranks: ranks.reducer,
    employee: employee.reducer,
    productCategory: productCategory.reducer,
    store: store.reducer,
    variant: variant.reducer,
    variantTemplate: variantTemplate.reducer,
    product: product.reducer,
    tags: tags.reducer,
    order: order.reducer,
});

export default rootReducer;