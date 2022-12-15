import {
    STATUS_ACTIVE,
    STATUS_LOCK,
    STATUS_PENDING,
    GroupPermissonTypes,
    ORDER_STATUS_NEW,
    ORDER_STATUS_CHECKOUT,
    ORDER_STATUS_PAID,
    ORDER_STATUS_FAILED,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_RETURNED,
    ORDER_STATUS_COMPLETED
} from './';

export const groupPermissionTypes = [
    { value: GroupPermissonTypes.ADMIN, label: 'Quản trị viên' },
    { value: GroupPermissonTypes.CUSTOMER, label: 'Khách hàng'}
]

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Kích hoạt', color: 'green' },
    { value: STATUS_PENDING, label: 'Đang chờ', color: 'warning' },
    { value: STATUS_LOCK, label: 'Đang khóa', color: 'red' },
]

export const orderStatus = [
    { value: ORDER_STATUS_NEW, label: 'Mới', color: 'warning' },
    { value: ORDER_STATUS_CHECKOUT, label: 'Đang xử lý', color: 'processing' },
    { value: ORDER_STATUS_PAID, label: 'Đã thanh toán', color: 'success' },
    { value: ORDER_STATUS_FAILED, label: 'Bị hủy', color: 'default' },
    { value: ORDER_STATUS_DELIVERED, label: 'Đang vận chuyển', color: 'processing' },
    { value: ORDER_STATUS_RETURNED, label: 'Trả về', color: 'gray' },
    { value: ORDER_STATUS_COMPLETED, label: 'Hoàn thành', color: 'springgreen' },
]

export const categoryType = [
    { value: 1, label: 'news'},
    { value: 2, label: 'jobs'},
    { value: 3, label: 'departments'},
]

export const commonLanguages = [
    { value: 'vi', label: 'Việt Nam'},
    { value: 'en', label: 'English'},
    { value: 'de', label: 'German'},
]

export const commonKinds = [
    { value: 1, label: 'Tin tức'},
    { value: 2, label: 'Dịch vụ'},
]

export const commonSex = [
    { value: 1, label: 'Nữ' },
    { value: 2, label: 'Nam' }
]

const GENDER_MALE = 1
const GENDER_FEMALE = 2
const GENDER_OTHER = 3

export const genders = [
    { value: GENDER_MALE, label: 'Nam' },
    { value: GENDER_FEMALE, label: 'Nữ' },
    { value: GENDER_OTHER, label: 'Khác' },
]

export const commonRatioImageSetting = [
    {
        value: 16/9,
        label: "16:9",
    },
    {
        value: 1/1,
        label: "1:1",
    },
    {
        value: 40/9,
        label: "40:9",
    },
]

const CATEGORY_KIND_NEWS = 1;
const CATEGORY_KIND_JOBS = 2;
const CATEGORY_KIND_DEPARTMENTS = 3;

export const categoryKinds = {
    CATEGORY_KIND_NEWS,
    CATEGORY_KIND_JOBS,
    CATEGORY_KIND_DEPARTMENTS,
}

export const variantKinds = [
    { value: 1, label: 'Kích thước' },
    { value: 2, label: 'Màu sắc' },
    { value: 10, label: 'Khác' },
]

export const variantTemplateConfig = [
    { value: 1, label: 'Một lựa chọn' },
    { value: 2, label: 'Nhiều lựa chọn' },
    // { value: 10, label: 'Khác' },
]

export const productKind = [
    { value: 1, label: 'Sản phẩm thường' },
    { value: 2, label: 'Sản phẩm theo nhóm' },
    // { value: 10, label: 'Khác' },
]

export const paymentMethods = [
    { value: 3, label: 'COD' },
    { value: 2, label: 'ONLINE' },
]

export const ASPECT_CATEGORY_AVATAR = 16/9