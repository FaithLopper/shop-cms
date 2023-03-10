const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    contentRootUrl: `${process.env.REACT_APP_API}/v1/file/download`,
    langKey: 'vi'
};

const StorageKeys = {
    userData: 'iservice-user-data'
}

const LayoutConfigs = {
    NAV_WIDTH_EXPANDED: 230,
    NAV_WIDTH_COLLAPSED: 80
}

const UserTypes = {
    ADMIN: 1,
    CUSTOMER: 2,
    EMPLOYEE: 3,
}

const GroupPermissonTypes = {
    ADMIN: 1,
    CUSTOMER: 2,
    EMPLOYEE: 3,
}

const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
}

const ProvinceKinds = {
    province: {
        name: 'LOCATION_KIND_PROVINCE',
        level: 1,
        text: 'Province'
    },
    district: {
        name: 'LOCATION_KIND_DISTRICT',
        level: 2,
        text: 'District'
    },
    commune: {
        name: 'LOCATION_KIND_WARD',
        level: 3,
        text: 'Commune'
    }
}

const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
}

export const LIMIT_IMAGE_SIZE = 512000;

// Pagination config
export const DEFAULT_TABLE_ITEM_SIZE = 10;
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';

// Common status
export const COMMON_STATUS = 0;
export const STATUS_PENDING = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_LOCK = -1;
export const STATUS_DELETE = -2;

// Order status
export const ORDER_STATUS = 1;
export const ORDER_STATUS_NEW = 1;
export const ORDER_STATUS_CHECKOUT = 2;
export const ORDER_STATUS_PAID = 3;
export const ORDER_STATUS_FAILED = 4;
export const ORDER_STATUS_DELIVERED = 5;
export const ORDER_STATUS_RETURNED = 6;
export const ORDER_STATUS_COMPLETED= 7;

export {
    AppConstants,
    StorageKeys,
    LayoutConfigs,
    UserTypes,
    GroupPermissonTypes,
    UploadFileTypes,
    ProvinceKinds,
    CurrentcyPositions,
};
