import React from 'react';
import AdminLevel1Form from '../../compoments/user/AdminLevel1Form';
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from '../../compoments/common/elements/LoadingWrapper';
import { connect } from 'react-redux';
import { actions } from "../../actions";
import { sitePathConfig } from '../../constants/sitePathConfig';
import ObjectNotFound from '../../compoments/common/ObjectNotFound';
import { withTranslation } from "react-i18next";
import { UserTypes } from '../../constants';
class UserAminUpdate extends SaveBasePage {

    constructor(props) {
        super(props);
        const { t } = this.props;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.admin.path;
        this.actionFooter= false
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.admin.path}`
            },
            {
                name:  this.isEditing? `${t(`listBasePage:${"update"}`)} ${this.objectName}` :`${t(`listBasePage:${"create"}`)} ${this.objectName}`,
            },
        ];
        this.getGroupPermissionList()
        this.GroupPermisisonList = [];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id && nextProps.match.params.id !== this.props.match.params.id) {
            this.getDetail(nextProps.match.params.id);
        }
    }

    getDataDetailMapping = (data) => {
        const adminUserData = data

        if (!adminUserData) {
            this.setState({ objectNotFound: true });
            return
        }

        return {
            ...adminUserData,
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
            kind:UserTypes.ADMIN,
            avatarPath: data.avatar,
            status: 1,
            ...data,
            groupId: data.group.id,
        };
    }

    prepareUpdateData = (data) => {
        return {
            ...data,
            kind:UserTypes.ADMIN,
            avatarPath: data.avatar,
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

    getGroupPermissionList() {
        this.props.getAutoComplete({params:{ kind: UserTypes.ADMIN }});
      }

    render() {
        const { isGetDetailLoading, objectNotFound  } = this.state
        const {t, uploadFile, dataList}= this.props

        this.GroupPermisisonList = dataList.data ? dataList.data.map((g) => {
          return {
            value: g.id,
            label: g.name,
          };
        })
      : [];

        if (objectNotFound) {
            return <ObjectNotFound />
        }

        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <AdminLevel1Form
                    setIsChangedFormValues={this.setIsChangedFormValues}
                    formId={this.getFormId()}
                    onSubmit={this.onSave}
                    dataDetail={this.dataDetail}
                    isEditing={this.isEditing}
                    isLoadingAttribute={this.props.loading}
                    actions={this.renderActions()}
                    handleRemoveImage={this.handleRemoveImageField}
                    handleUploadImage={this.handleUploadImageField}
                    uploadFile={uploadFile}
                    t={t}
                    groupPermission={this.GroupPermisisonList}
                    />
                    
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataById: (payload) => dispatch(actions.getUserById(payload)),
  getAutoComplete: (payload) => dispatch(actions.groupPermissionAutoComplete(payload)),
  createData: (payload) => dispatch(actions.createUser(payload)),
  updateData: (payload) => dispatch(actions.updateUser(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
})

const mapStateToProps = state => ({
    dataList: state.groupPermission.groupPermissionData || {},
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['userAdminUpdatePage','listBasePage'])(UserAminUpdate));