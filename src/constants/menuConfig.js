import React from "react";

import {
  UsergroupAddOutlined,
  ControlOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  CrownOutlined,
  HomeOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { sitePathConfig } from "../constants/sitePathConfig";
// import qs from "query-string";
// const strParams = (params) => {
//   return qs.stringify(params);
// };

const navMenuConfig = [
  {
    label: "Account Management",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        label: "Admin",
        ...sitePathConfig.admin,
      },
      {
        label: "Customer",
        ...sitePathConfig.customer,
      },
      {
        label: "Employee",
        ...sitePathConfig.employee,
      },
    ],
  },
  {
    label: "System",
    icon: <ControlOutlined />,
    children: [
      {
        label: "Role",
        ...sitePathConfig.groupPermission,
      },
      {
        label: "Province",
        ...sitePathConfig.province,
      },
    ],
  },
  {
    label: "Category",
    icon: <UnorderedListOutlined />,
    children: [
      {
        label: "CategoryNews",
        ...sitePathConfig.categoryNews,
      },
      {
        label: "CategoryJobs",
        ...sitePathConfig.categoryJobs,
      },
      {
        label: "CategoryDepartments",
        ...sitePathConfig.categoryDepartments,
      },
    ],
  },
  {
    label: "News",
    icon: <FileTextOutlined />,
    children: [
      {
        label: "News",
        ...sitePathConfig.adminNews,
      },
    ],
  },
  {
    label: "Ranks",
    icon: <CrownOutlined />,
    children: [
      {
        label: "Ranks",
        ...sitePathConfig.ranks,
      },
    ],
  },
  {
    label: "Store",
    icon: <HomeOutlined />,
    children: [
      {
        label: "Store",
        ...sitePathConfig.store,
      },
    ],
  },
  {
    label: "Product",
    icon: <SkinOutlined />,
    children: [
      {
        label: "categoryProductManagement",
        ...sitePathConfig.categoryProduct,
      },
      {
        label: "Product",
        ...sitePathConfig.product,
      },
      {
        label: "Variant",
        ...sitePathConfig.variant,
      },
      {
        label: "Variant Template",
        ...sitePathConfig.variantTemplate,
      },
      {
        label: "Tags",
        ...sitePathConfig.tags,
      },
    ],
  },
  {
    label: "Order",
    icon: <SkinOutlined />,
    children: [
      {
        label: "orderManagement",
        ...sitePathConfig.order,
      },
    ],
  },
];

const employeeNavMenuConfig = [
  {
    label: "customerManagement",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        label: "Admin",
        ...sitePathConfig.admin,
      },
      {
        label: "Customer",
        ...sitePathConfig.customer,
      },
    ],
  },
  {
    label: "News",
    icon: <FileTextOutlined />,
    children: [
      {
        label: "News",
        ...sitePathConfig.adminNews,
      },
    ],
  },
];

export { navMenuConfig, employeeNavMenuConfig };
