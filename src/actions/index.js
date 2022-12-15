import { actions as appCommonActions, actionTypes as appCommonTypes } from './appCommon';
import { actions as accountActions, actionTypes as accountTypes } from './account';
import { actions as userActions, actionTypes as userTypes } from './user';
import { actions as groupPermissionActions, actionTypes as groupPermissionTypes } from './groupPermission';
import {actions as categoryActions, actionTypes as categoryTypes} from './category';
import {actions as newsActions, actionTypes as newsTypes} from './news';
import {actions as provinceActions, actionTypes as provinceTypes} from './province';
import {actions as customerActions, actionTypes as customerTypes} from './customer';
import {actions as addressActions, actionTypes as addressTypes} from './address';
import {actions as ranksActions, actionTypes as ranksTypes} from './ranks';
import {actions as employeeActions, actionTypes as employeeTypes} from './employee';
import {actions as productCategoryActions, actionTypes as productCategoryTypes} from './productCategory';
import {actions as storeActions, actionTypes as storeTypes} from './store';
import {actions as variantActions, actionTypes as variantTypes} from './variant';
import {actions as variantTemplateActions, actionTypes as variantTemplateTypes} from './variantTemplate';
import {actions as productActions, actionTypes as productTypes} from './product';
import {actions as tagsActions, actionTypes as tagsTypes} from './tags';
import {actions as orderActions, actionTypes as orderTypes} from './order';

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...userActions,
    ...groupPermissionActions,
    ...categoryActions,
    ...newsActions,
    ...provinceActions,
    ...customerActions,
    ...addressActions,
    ...ranksActions,
    ...employeeActions,
    ...productCategoryActions,
    ...storeActions,
    ...variantActions,
    ...variantTemplateActions,
    ...productActions,
    ...tagsActions,
    ...orderActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...userTypes,
    ...groupPermissionTypes,
    ...categoryTypes,
    ...newsTypes,
    ...provinceTypes,
    ...customerTypes,
    ...addressTypes,
    ...ranksTypes,
    ...employeeTypes,
    ...productCategoryTypes,
    ...storeTypes,
    ...variantTypes,
    ...variantTemplateTypes,
    ...productTypes,
    ...tagsTypes,
    ...orderTypes,
}