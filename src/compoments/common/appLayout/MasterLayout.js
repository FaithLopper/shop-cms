import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Spin, Row, Col, Button, Space } from 'antd';
import {ArrowLeftOutlined,SaveOutlined} from '@ant-design/icons'
import NavSider from './NavSider';
import AppHeader from './AppHeader';
import { LayoutConfigs, StorageKeys } from '../../../constants';
import { actions } from '../../../actions';
import { sitePathConfig } from '../../../constants/sitePathConfig';
import Utils from '../../../utils';
import { withTranslation } from 'react-i18next';

const { getUserData } = actions;

const { Content, Footer } = Layout;

class MasterLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: getUserData(),
            breadcrumbs: [],
            navSidercollapsed: false,
            objectName:'',
            formId:'',
            actionFooter:false,
        }
        this.onLogout = this.onLogout.bind(this);
        this.onChangeBreadcrumb = this.onChangeBreadcrumb.bind(this);
        this.toggleNavSide = this.onToggleNavSide.bind(this);
        this.userData = getUserData();
        this.onReturn= this.onReturn.bind(this)
        this.onGetFormID= this.onGetFormID.bind(this)
    }

    onToggleNavSide() {
        this.setState({
            navSidercollapsed: !this.state.navSidercollapsed,
        });
      };

    componentWillMount() {
        const { location: { pathname }, history } = this.props;
        if(!this.state.userData) {
            history.push(sitePathConfig.login.path);
        }
        else {
            this.checkPermission(pathname);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { location: { pathname } } = nextProps;
        const { userData } = this.state;
        if(this.props.location.pathname !== pathname) {
            if(!Utils.isEmptyObject(userData))
                this.checkPermission(pathname);
        }
        
    }

    checkPermission(pathname){
        if(pathname === '/booking' && this.props.location.state && this.props.location.state.isRedirectToHomePage){
            this.redirectToAuthPage();
        }
        else{
            Object.keys(sitePathConfig).forEach(key => {
                if(sitePathConfig[key].path === pathname || pathname.startsWith(sitePathConfig[key].path + '/')) {
                    if(sitePathConfig[key].permissions && this.userData.permissions.indexOf(sitePathConfig[key].permissions[0]) < 0) {
                        this.props.history.push(sitePathConfig.forbidden.path);
                    }
                }
            });
        }
    }

    redirectToAuthPage(){
        if(!Object.keys(sitePathConfig).find(key => {
          if(sitePathConfig[key].permissions && this.userData.permissions.indexOf(sitePathConfig[key].permissions[0]) > -1) {
            this.props.history.push(sitePathConfig[key].path);
            return true;
          }
          return false;
        }))
          this.props.history.push(sitePathConfig.profile.path);
      }

    onChangeBreadcrumb(breadcrumbs) {
        this.setState({ breadcrumbs });
    }

    onChangeUserData = (newUserData) => {
        const userData = {
            ...this.userData,
            fullName: newUserData.fullName,
            avatar: newUserData.avatar,
            logo: newUserData.logo

        }
        this.props.setUserData(userData);
        this.setState({userData});
    }

    onLogout() {
        const { logout } = this.props; 
        logout();
        if(window.localStorage && window.localStorage.getItem(StorageKeys.userData))
            window.localStorage.removeItem(StorageKeys.userData);
        window.location.href = sitePathConfig.login.path;
    }
    isSaveBasePage(){
        const { 
            location: { pathname },
            children,
        }= this.props
        const protoTypeName=children.type.WrappedComponent.prototype.constructor.name.toLowerCase();
        return pathname.includes('create') || pathname.includes('update') || pathname.includes('profile') || protoTypeName.includes('update') ? true: false
    }
    onReturn(onBack){
        this.returnHandle= onBack
    }
    onGetFormID(FormId){
       this.setState({formId:FormId()})
    }
    renderActionFooter(){
        const {      
            t,
            // location: { pathname },
        } = this.props;
        return ( <Footer className="app-footer" style={{ position: "sticky", bottom: "0",display:this.isSaveBasePage()? 'block':'none'}}>
        <Row justify='space-between'>
            <Col span={3}>
                <div className='action-save-page' onClick={e =>{this.returnHandle()}}>
                <ArrowLeftOutlined/>     {t(`basicSavePage:${"okText"}`)} 
                </div>
            </Col>
            <Col span={3}>
                <Space>
                {/* <Button key="cancel" > {t(`basicSavePage:${"cancelButton"}`) }</Button> */}
            <Button
                key="submit"
                htmlType="submit"
                type="primary"
                form={this.state.formId}
                icon={<SaveOutlined />}
                >
                 {t(`basicSavePage:${"saveButton"}`)}
            </Button>
                </Space>
        </Col>
        </Row>
    </Footer>)
    }

    render() {
        const {
            children,
            location: { pathname },
            fullScreenLoading,
            showFullScreenLoading,
            hideFullScreenLoading,
            siteConfig,
            t,
        } = this.props;
        const { breadcrumbs, navSidercollapsed, userData } = this.state;
        const contentClass = siteConfig?.contentClass || '';
        if(!userData)
            return null;
            
        return (
            <Spin size="large" wrapperClassName="full-screen-loading" spinning={fullScreenLoading}>
                <Layout className="master-layout">
                    <NavSider
                        currentPathname={pathname}
                        navSidercollapsed={navSidercollapsed}
                        onToggleNavSide={this.toggleNavSide}
                        userData={userData}
                    />
                    <Layout style={{ marginLeft: navSidercollapsed ? LayoutConfigs.NAV_WIDTH_COLLAPSED : LayoutConfigs.NAV_WIDTH_EXPANDED }}>
                        <AppHeader
                            navSidercollapsed={navSidercollapsed}
                            onLogout={this.onLogout}
                            onToggleNavSide={this.toggleNavSide}
                            userData={userData || {fullName: 'admin'}}
                        />
                        <Content className="app-content">
                        <Breadcrumb className="app-breadcrumb" separator=">">
                        <h2>{breadcrumbs ? breadcrumbs[breadcrumbs.length-1]?.name:""}</h2>
                                <Breadcrumb.Item>
                                    <Link to="/">{t('breadcrumbs.home')}</Link>
                                </Breadcrumb.Item>
                                {
                                    breadcrumbs
                                    ?
                                    breadcrumbs.map(breadcrumb => 
                                        <Breadcrumb.Item key={breadcrumb.name}>
                                            {
                                                breadcrumb.path
                                                ?
                                                    <Link className="routing" to={breadcrumb.path}>{breadcrumb.name}</Link>
                                                :
                                                    breadcrumb.name
                                            }
                                      </Breadcrumb.Item>
                                    )
                                    :
                                    null
                                }
                            </Breadcrumb>
                            <div className={`content-wrapper ${contentClass} ${this.isSaveBasePage() ? 'save-base-page':'' }`} id='body-content-wrapper'>
                                {React.cloneElement(children, {
                                    changeUserData: this.onChangeUserData,
                                    currentUser: userData,
                                    changeBreadcrumb: this.onChangeBreadcrumb,
                                    onGetFormID:this.onGetFormID,
                                    onReturn:this.onReturn,
                                    detectActionRenderType:(type)=>{if(type)this.setState({actionFooter:true})},
                                    showFullScreenLoading,
                                    hideFullScreenLoading,
                                })}
                            </div>
                            {this.state.actionFooter && this.renderActionFooter}
                           
                        </Content>
                    </Layout>
                </Layout>
            </Spin>
        );
    }
}

const mapStateToProps = state => ({
    fullScreenLoading: state.appCommon.fullScreenLoading || false,
    userProfile: state.account.data || {},
})

const mapDispatchToProps = dispatch => ({
    showFullScreenLoading: () => dispatch(actions.showFullScreenLoading()),
    hideFullScreenLoading: () => dispatch(actions.hideFullScreenLoading()),
    getProfile: () => dispatch(actions.getProfile()),
    logout: () => dispatch(actions.logout()),
    setUserData: (data) => actions.setUserData(data)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('masterLayout')(MasterLayout));

