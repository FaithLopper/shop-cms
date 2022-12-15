import React from 'react';
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from '../../compoments/common/elements/LoadingWrapper';
import { connect } from 'react-redux';
import { actions } from "../../actions";
import { sitePathConfig } from '../../constants/sitePathConfig';
import ObjectNotFound from '../../compoments/common/ObjectNotFound';
import { withTranslation } from "react-i18next";
import { UserTypes } from '../../constants';
import CustomerForm from '../../compoments/customer/CustomerForm';
class CustomerUpdatePage extends SaveBasePage {

    constructor(props) {
        super(props);
        const { t } = this.props;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.customer.path;
        this.actionFooter= false
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.customer.path}`
            },
            {
                name:  this.isEditing? `${t(`listBasePage:${"update"}`)} ${this.objectName}` :`${t(`listBasePage:${"create"}`)} ${this.objectName}`,
            },
        ];
        this.GroupPermisisonList = [];
        this.getCategoryList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id && nextProps.match.params.id !== this.props.match.params.id) {
            this.getDetail(nextProps.match.params.id);
        }
    }

    getDataDetailMapping = (data) => {
        const customerData = data

        if (!customerData) {
            this.setState({ objectNotFound: true });
            return 
        }

        return {
            ...customerData,
        }
    }

    onGetDetailCompleted = ({ data }) => {
        this.dataDetail = this.getDataDetailMapping(data);
        this.setState({ isGetDetailLoading: false });
    }

    onInsertCompleted = (res) => {
        const { history } = this.props
        this.setIsChangedFormValues(false);
        if (res?.result) {
            this.showSuccessConfirmModal({
                onContinueEdit: () => {
                    history.push(sitePathConfig.adminUpdate.path.replace(':id', res.id))
                }
            })
        } else if (res?.result===false) {
            this.showFailedConfirmModal({
                title: res?.message
            })

        } else {
            this.showFailedConfirmModal()
        }
    }

    onUpdateCompleted = (res) => {
        this.setIsChangedFormValues(false);
        if (res.result) {
            this.getDetail(this.dataId)
            this.showSuccessConfirmModal()
        } else if (res?.result === false) {
            this.showFailedConfirmModal({
                title: res?.message
            })
        } else {
            this.showFailedConfirmModal()
        }
    }

    onBack = () => {
        if (this.state.isChanged) {
            const {t}= this.props
            this.showWarningConfirmModal({
                title: t("basicSavePage:onBack"),
                onOk: () => {
                    this.props.history.push(this.getListUrl)
                }
            });
        } else {
            this.props.history.push(this.getListUrl)
        }
    }

    prepareCreateData = (data) => {
        return {
            status: 1,
            groupId: data.group.id, //role customer
            ...data,
        };
    }

    prepareUpdateData = (data) => {
        return {
            ...data,
            id: this.dataDetail.id
        };
    }

    onSaveCompleted = (responseData) => {
        this.setState({ isSubmitting: false });
        if (responseData?.data?.errors?.length) {
            this.onSaveError();
        }
        else {
            if (this.isEditing) {
                this.onUpdateCompleted(responseData);
            }
            else {
                this.onInsertCompleted(responseData);
            }
        }
    }

    getCategoryList() {
        this.props.getGroupPermisionAutoComplete({
          params: { kind: UserTypes.CUSTOMER },
        });
      }

    render() {
        const { isGetDetailLoading, objectNotFound,  } = this.state
        const {t,uploadFile,dataList}= this.props
        if (objectNotFound) {
            return <ObjectNotFound />
        }

        this.GroupPermisisonList = dataList.data
        ? dataList.data.map((g) => {
            return {
              value: g.id,
              label: g.name,
            };
          })
        : [];

        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <CustomerForm
                    setIsChangedFormValues={this.setIsChangedFormValues}
                    formId={this.getFormId()}
                    onSubmit={this.onSave}
                    dataDetail={this.dataDetail}
                    isEditing={this.isEditing}
                    isLoadingAttribute={this.props.loading}
                    actions={this.renderActions()}
                    handleRemoveImage={this.handleRemoveImageField}
                    handleUploadImage={this.handleUploadImageField}
                    groupPermission={this.GroupPermisisonList}
                    uploadFile={uploadFile}
                    t={t}
                    />
                    
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataById: (payload) => dispatch(actions.getCustomerById(payload)),
  createData: (payload) => dispatch(actions.createCustomer(payload)),
  updateData: (payload) => dispatch(actions.updateCustomer(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getGroupPermisionAutoComplete: (payload) =>
  dispatch(actions.groupPermissionAutoComplete(payload)),
})

const mapStateToProps = state => ({
    dataList: state.groupPermission.groupPermissionData || {},
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['customerUpdatePage','listBasePage'])(CustomerUpdatePage));