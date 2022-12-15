import React from 'react';
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from '../../compoments/common/elements/LoadingWrapper';
import { connect } from 'react-redux';
import { actions } from "../../actions";
import { sitePathConfig } from '../../constants/sitePathConfig';
import ObjectNotFound from '../../compoments/common/ObjectNotFound';
import { withTranslation } from "react-i18next";
import StoreUpdateForm from '../../compoments/store/StoreUpdateForm';
class StoreUpdatePage extends SaveBasePage {

    constructor(props) {
        super(props);
        const { t } = this.props;
        this.objectName =  t("objectName");
        this.getListUrl = sitePathConfig.store.path;
        this.actionFooter= false
        this.breadcrumbs = [
            {
                name:  t("breadcrumbs.parentPage"),
                path:`${sitePathConfig.store.path}`
            },
            // {
            //     name:  t("breadcrumbs.parentPage1"),
            //     path:`${sitePathConfig.address.path}`
            // },
            {
                name:  this.isEditing? `${t(`listBasePage:${"update"}`)} ${this.objectName}` :`${t(`listBasePage:${"create"}`)} ${this.objectName}`,
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id && nextProps.match.params.id !== this.props.match.params.id) {
            this.getDetail(nextProps.match.params.id);
        }
    }

    getDataDetailMapping = (data) => {
        const storeUserData = data

        if (!storeUserData) {
            this.setState({ objectNotFound: true });
            return
        }

        return {
            ...storeUserData,
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
                    history.push(sitePathConfig.storeUpdate.path.replace(':id', res.id))
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


    render() {
        const { isGetDetailLoading, objectNotFound,  } = this.state
        const {t,uploadFile,getLocation,getLocationDetail}= this.props
        if (objectNotFound) {
            return <ObjectNotFound />
        }

        return (
            <LoadingWrapper loading={isGetDetailLoading}>
                <StoreUpdateForm
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
                    getLocation={getLocation}
                    getLocationDetail={getLocationDetail}
                    t={t}
                    />
            </LoadingWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  getDataById: (payload) => dispatch(actions.getStoreById(payload)),
  createData: (payload) => dispatch(actions.createStore(payload)),
  updateData: (payload) => dispatch(actions.updateStore(payload)),
  getLocation: (payload) => dispatch(actions.getLocation(payload)),
  getLocationDetail: (payload) => dispatch(actions.getLocationDetail(payload)),
})

const mapStateToProps = state => ({
    provinceList:state.province.provinceData|| []
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['storeUpdatePage','listBasePage'])(StoreUpdatePage));