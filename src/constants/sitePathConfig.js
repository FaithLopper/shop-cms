import apiConfig from "./apiConfig";
import LoginPage from "../containers/account/LoginPage";
import ProfilePage from "../containers/account/ProfilePage";
// import DashBoard from '../containers/Dashboard';
import UserAdminListPage from "../containers/users/UserAdminListPage";
import GroupPermissionListPage from "../containers/groupPermission/GroupPermissionListPage";
import NewsListPage from "../containers/adminNews/NewsListPage";
import UserAminUpdate from "../containers/users/UserAminUpdate";
import ProvinceListPage from "../containers/province/ProvinceListPage";
import DistrictListPage from "../containers/province/DistrictListPage";
import CommuneListPage from "../containers/province/CommuneListPage";
import CategoryNewsListPage from "../containers/category/CategoryNewsListPage";
import CategoryNewsUpdate from "../containers/category/CategoryNewsUpdate";
import CategoryJobsListPage from "../containers/category/CategoryJobsListPage";
import CategoryJobsUpdate from "../containers/category/CategoryJobsUpdate";
import CategoryDepartmentsListPage from "../containers/category/CategoryDepartmentsListPage";
import CategoryDepartmentsUpdate from "../containers/category/CategoryDepartmentsUpdate";
import CustomerListPage from "../containers/customer/CustomerListPage";
import CustomerUpdatePage from "../containers/customer/CustomerUpdatePage";
import AddressListPage from "../containers/customer/AddressListPage";
import AddressUpdatePage from "../containers/customer/AddressUpdatePage";
import RanksListPage from "../containers/ranks/RanksListPage";
import RanksUpdate from "../containers/ranks/RanksUpdate";
import NewsUpdate from "../containers/adminNews/NewsUpdate";
import EmployeeListPage from "../containers/employee/EmployeeListPage";
import EmployeeUpdate from "../containers/employee/EmployeeUpdate";
import CategoryProductListPage from "../containers/categoryProduct/CategoryProductListPage";
import CategoryProductUpdate from "../containers/categoryProduct/CategoryProductUpdate";
import CategoryProductSubListPage from "../containers/categoryProduct/CategoryProductSubListPage";
import CategoryProductSubUpdate from "../containers/categoryProduct/CategoryProductSubUpdate";
import TagsListPage from "../containers/tags/TagsListPage";
import OrderListPage from "../containers/order/OrderListPage";
import OrderUpdate from "../containers/order/OrderUpdate";

export const sitePathConfig = {
    login: {
        path: '/login',
        component:LoginPage,
    },
    profile: {
        path: '/profile',
        component:ProfilePage
    },
    admin: {
        path: '/admins',
        component:UserAdminListPage,
        childrenKeys: ['/admins/create','/admins/:id'],  //nếu có trang Update thì để childPath dạng ['/parent/create','/parent/update']
        permissions: [
            apiConfig.user.getAdminList.path,
            apiConfig.user.getAdminById.path,
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
            apiConfig.user.deleteAdmin.path
        ],
    },
    adminUpdate: {
        path: '/admins/:id',
        component:UserAminUpdate,
        permissions: [
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
        ]
    },
    forbidden: {
        path: '/forbidden'
    },
    groupPermission: {
        path: '/group-permission',
        component:GroupPermissionListPage,
        permissions: [
            apiConfig.groupPermission.getList.path,
            apiConfig.groupPermission.getById.path,
            apiConfig.groupPermission.create.path,
            apiConfig.groupPermission.update.path,
            'not_have_delete',
            apiConfig.groupPermission.getPermissionList.path,
        ]
    },
    categoryNews: {
        path: '/category-news',
        childrenKeys:['/category-news/:id','/category-news/create'],
        component:CategoryNewsListPage,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categoryNewsUpdate: {
        path: '/category-news/:id',
        component:CategoryNewsUpdate,
        permissions: [
            apiConfig.category.create.path,
            apiConfig.category.update.path,
        ]
    },
    categoryJobs: {
        path: '/category-jobs',
        childrenKeys:['/category-jobs/:id','/category-jobs/create'],
        component:CategoryJobsListPage,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categoryJobsUpdate: {
        path: '/category-jobs/:id',
        component:CategoryJobsUpdate,
        permissions: [
            apiConfig.category.create.path,
            apiConfig.category.update.path,
        ]
    },
    categoryDepartments: {
        path: '/category-departments',
        childrenKeys:['/category-departments/:id','/category-departments/create'],
        component:CategoryDepartmentsListPage,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categoryDepartmentsUpdate: {
        path: '/category-departments/:id',
        component:CategoryDepartmentsUpdate,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    adminNews: {
        path: '/news',
        component:NewsListPage,
        childrenKeys:['/news/:id','/news/create'],
        permissions: [
            apiConfig.news.getList.path,
            apiConfig.news.getById.path, //xxxx dup
            apiConfig.news.create.path, //xxxx dup
            apiConfig.news.update.path, //xxxx dup
            apiConfig.news.delete.path,
            apiConfig.news.categoryAutoComplete.path,
        ]
    },
    adminNewsUpdate: {
        path: '/news/:id',
        component:NewsUpdate,
        permissions: [
            apiConfig.news.getById.path, //xxxx dup
            apiConfig.news.create.path, //xxxx dup
            apiConfig.news.update.path, //xxxx dup
            apiConfig.news.delete.path,
            apiConfig.news.categoryAutoComplete.path,
        ]
    },
    province:{
        path:'/province',
        component:ProvinceListPage,
        childrenKeys: ['/province-district','/province-district-commune'],
        permissions:[
            apiConfig.province.getList.path,
            apiConfig.province.getById.path,
            apiConfig.province.create.path,
            apiConfig.province.update.path,
            apiConfig.province.delete.path,
            apiConfig.province.provinceAutoComplete.path,
        ]
    },
    district:{
        path:'/province-district',
        component:DistrictListPage,
        permissions:[
            apiConfig.province.getList.path,
            apiConfig.province.getById.path,
            apiConfig.province.create.path,
            apiConfig.province.update.path,
            apiConfig.province.delete.path,
            apiConfig.province.provinceAutoComplete.path,
        ]
    },
    commune:{
        path:'/province-district-commune',
        component:CommuneListPage,
        permissions:[
            apiConfig.province.getList.path,
            apiConfig.province.getById.path,
            apiConfig.province.create.path,
            apiConfig.province.update.path,
            apiConfig.province.delete.path,
            apiConfig.province.provinceAutoComplete.path,
        ]
    },
    customer: {
        path: '/customer',
        component:CustomerListPage,
        childrenKeys: ['/customer/create','/customer/:id','/address','/address/:id'],  //nếu có trang Update thì để childPath dạng ['/parent/create','/parent/update']
        permissions: [
            apiConfig.customer.getList.path,
            apiConfig.customer.getById.path,
            apiConfig.customer.create.path,
            apiConfig.customer.update.path,
            apiConfig.customer.delete.path,
            apiConfig.customer.customerAutoComplete.path,
            apiConfig.addressCustomer.getList.path,
        ]
    },
    customerUpdate: {
        path: '/customer/:id',
        // childrenKeys: ['/address'],
        component:CustomerUpdatePage,
        permissions: [
            apiConfig.customer.getById.path,
            apiConfig.customer.create.path,
            apiConfig.customer.update.path,
        ]
    },
    address: {
        path: '/address',
        component:AddressListPage,
        childrenKeys: ['/address/create'],  //nếu có trang Update thì để childPath dạng ['/parent/create','/parent/update']
        permissions: [
            apiConfig.addressCustomer.getList.path,
            apiConfig.addressCustomer.getById.path,
            apiConfig.addressCustomer.create.path,
            apiConfig.addressCustomer.update.path,
            apiConfig.addressCustomer.delete.path,
        ]
    },
    addressUpdate: {
        path: '/address/:id',
        component:AddressUpdatePage,
        menuActivePath:'/customer',
        permissions: [
            apiConfig.addressCustomer.getById.path,
            apiConfig.addressCustomer.create.path,
            apiConfig.addressCustomer.update.path,
        ],
    },
    ranks: {
        path:'/ranks',
        component:RanksListPage,
        childrenKeys: ['/ranks/create','/ranks/:id'],
        permissions:[
            apiConfig.ranks.getList.path,
            apiConfig.ranks.getById.path,
            apiConfig.ranks.create.path,
            apiConfig.ranks.update.path,
            apiConfig.ranks.delete.path,
            apiConfig.ranks.ranksAutoComplete.path,
        ]
    },
    ranksUpdate: {
        path:'/ranks/:id',
        component:RanksUpdate,
        permissions:[
            apiConfig.ranks.getById.path,
            apiConfig.ranks.create.path,
            apiConfig.ranks.update.path,
            apiConfig.ranks.ranksAutoComplete.path,
        ]
    },
    employee: {
        path: "/employee",
        childrenKeys:["/employee/:id","/employee/create"],
        component: EmployeeListPage,
        permissions: [
            apiConfig.employee.getList.path,
            apiConfig.employee.getById.path,
            apiConfig.employee.create.path,
            apiConfig.employee.update.path,
            apiConfig.employee.delete.path,
            apiConfig.employee.employeeAutoComplete.path,
        ],
      },
      employeeUpdate: {
        path: "/employee/:id",
        component: EmployeeUpdate,
        permissions: [
            apiConfig.employee.getList.path,
            apiConfig.employee.getById.path,
            apiConfig.employee.create.path,
            apiConfig.employee.update.path,
            apiConfig.employee.delete.path,
            apiConfig.employee.employeeAutoComplete.path,
        ],
      },
      categoryProduct: {
        path: "/category-product",
        childrenKeys: ['/category-product/create','/category-product/:id','/category-product-sub','/category-product-sub/:id'],
        component: CategoryProductListPage,
        permissions: [
            apiConfig.productCategory.getList.path,
            apiConfig.productCategory.getById.path,
            apiConfig.productCategory.create.path,
            apiConfig.productCategory.update.path,
            apiConfig.productCategory.delete.path,
            apiConfig.productCategory.productCategoryAutoComplete.path,
        ],
      },
      categoryProductUpdate: {
        path: "/category-product/:id",
        component: CategoryProductUpdate,
        permissions: [
            apiConfig.productCategory.getList.path,
            apiConfig.productCategory.getById.path,
            apiConfig.productCategory.create.path,
            apiConfig.productCategory.update.path,
            apiConfig.productCategory.delete.path,
            apiConfig.productCategory.productCategoryAutoComplete.path,
        ],
      },
      categoryProductSub: {
        path: "/category-product-sub",
        childrenKeys: ['/category-product-sub/create','/category-product-sub/:id'],
        component: CategoryProductSubListPage,
        permissions: [
            apiConfig.productCategory.getList.path,
            apiConfig.productCategory.getById.path,
            apiConfig.productCategory.create.path,
            apiConfig.productCategory.update.path,
            apiConfig.productCategory.delete.path,
            apiConfig.productCategory.productCategoryAutoComplete.path,
        ],
      },
      categoryProductSubUpdate: {
        path: "/category-product-sub/:id",
        component: CategoryProductSubUpdate,
        permissions: [
            apiConfig.productCategory.getList.path,
            apiConfig.productCategory.getById.path,
            apiConfig.productCategory.create.path,
            apiConfig.productCategory.update.path,
            apiConfig.productCategory.delete.path,
            apiConfig.productCategory.productCategoryAutoComplete.path,
        ],
      },
    store: {
        path: "/store",
        childrenKeys:["/store/:id","/store/create"],
        permissions: [
            apiConfig.store.getList.path,
            apiConfig.store.getById.path,
            apiConfig.store.create.path,
            apiConfig.store.update.path,
            apiConfig.store.delete.path,
            apiConfig.store.getStoreAutoCompleted.path,
        ],
      },
    storeUpdate: {
        path: "/store/:id",
        permissions: [
            apiConfig.store.getById.path,
            apiConfig.store.create.path,
            apiConfig.store.update.path,
        ],
      },
    variant: {
        path: "/variant",
        childrenKeys:["/variant/:id","/variant/create"],
        permissions: [
            apiConfig.variant.getList.path,
            apiConfig.variant.getById.path,
            apiConfig.variant.create.path,
            apiConfig.variant.update.path,
            apiConfig.variant.delete.path,
            apiConfig.variant.getVariantAutoCompleted.path,
        ],
      },
    variantUpdate: {
        path: "/variant/:id",
        permissions: [
            apiConfig.variant.getById.path,
            apiConfig.variant.create.path,
            apiConfig.variant.update.path,
        ],
    },
    variantTemplate: {
        path: "/variant-template",
        childrenKeys:["/variant-template/:id","/variant-template/create"],
        permissions: [
            apiConfig.variantTemplate.getList.path,
            apiConfig.variantTemplate.getById.path,
            apiConfig.variantTemplate.create.path,
            apiConfig.variantTemplate.update.path,
            apiConfig.variantTemplate.delete.path,
            apiConfig.variantTemplate.getVariantTemplateAutoCompleted.path,
        ],
      },
    variantTemplateUpdate: {
        path: "/variant-template/:id",
        permissions: [
            apiConfig.variantTemplate.getById.path,
            apiConfig.variantTemplate.create.path,
            apiConfig.variantTemplate.update.path,
        ],
    },
    product: {
        path: "/product",
        childrenKeys:["/product/:id","/product/create"],
        permissions: [
            apiConfig.product.getList.path,
            apiConfig.product.getById.path,
            apiConfig.product.create.path,
            apiConfig.product.update.path,
            apiConfig.product.delete.path,
            apiConfig.product.getProductAutoCompleted.path,
        ],
      },
    productUpdate: {
        path: "/product/:id",
        permissions: [
            apiConfig.product.getById.path,
            apiConfig.product.create.path,
            apiConfig.product.update.path,
        ],
    },
    productChild: {
        path: "/product-child",
        childrenKeys:["/product-child/:id","/product-child/create"],
        permissions: [
            apiConfig.product.getList.path,
            apiConfig.product.getById.path,
            apiConfig.product.create.path,
            apiConfig.product.update.path,
            apiConfig.product.delete.path,
            apiConfig.product.getProductAutoCompleted.path,
        ],
      },
    tags: {
        path:'/tags',
        component:TagsListPage,
        childrenKeys: ['/tags/create','/tags/:id'],
        permissions:[
            apiConfig.tags.getList.path,
            apiConfig.tags.getById.path,
            apiConfig.tags.create.path,
            apiConfig.tags.update.path,
            apiConfig.tags.delete.path,
        ]
    },
    tagsUpdate: {
        path:'/tags/:id',
        component:TagsListPage,
        permissions:[
            apiConfig.tags.getById.path,
            apiConfig.tags.create.path,
            apiConfig.tags.update.path,
        ]
    },
    order: {
        path:'/order',
        component: OrderListPage,
        childrenKeys: ['/order/create','/order/:id'],
        permissions:[
            apiConfig.order.getList.path,
            apiConfig.order.getById.path,
            apiConfig.order.create.path,
            apiConfig.order.update.path,
            apiConfig.order.delete.path,
        ]
    },
    orderUpdate: {
        path:'/order/:id',
        component: OrderUpdate,
        permissions:[
            apiConfig.order.getById.path,
            apiConfig.order.create.path,
            apiConfig.order.update.path,
        ]
    },
}
