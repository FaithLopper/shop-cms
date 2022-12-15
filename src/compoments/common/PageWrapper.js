import React from 'react';
// import { Tabs, Badge } from 'antd';

import LoadingWrapper from './elements/LoadingWrapper';

// const { TabPane } = Tabs;

const PageWrapper = ({
  // title,
  // routes,
  // tabs,
  // activeTab,
  // onChangeTab,
  children,
  loading = false,
  // tabsBadge
}) => {

  // const renderTabs = () => {
  //   if (tabs?.length) {
  //     return (
  //       <Tabs activeKey={activeTab} onChange={onChangeTab}>
  //         {
  //           tabs.map(tabItem => {
  //             const badge = tabsBadge?.[tabItem.key];

  //             return (
  //               <TabPane
  //                 tab={badge ? (
  //                   <Badge color="#1890ff" offset={[10, 5]} count={badge}>
  //                     {tabItem.tab}
  //                   </Badge>
  //                 ) : tabItem.tab}
  //                 key={tabItem.key}
  //               >
  //                 {/* {tabItem.cpm ? tabItem.cpm() : null} */}
  //               </TabPane>
  //             );
  //           })
  //         }
  //       </Tabs>
  //     );
  //   }
  //   return null;
  // }
  return (
    <div className="page-wrapper">
      <LoadingWrapper loading={loading} className="full-screen-loading">
        {/* <PageHeader
          className="page-wrapper__header"
          title={title}
          breadcrumb={{
            routes,
            itemRender: (route) => {
              console.log(route)
              console.log(routes)
              const last = routes.indexOf(route) === routes.length - 1;
              return last || !route.path ? (
                <span>{route.breadcrumbName}</span>
              ) : (
                <Link to={route.path}>{route.breadcrumbName}</Link>
              );
            }
          }}
          footer={renderTabs()}
        >
        </PageHeader> */}
        <div className="page-wrapper__content">
          {children}
        </div>
        </LoadingWrapper>
    </div>
  );
}

export default PageWrapper;
