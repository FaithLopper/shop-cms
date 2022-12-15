import React from "react";
import CategoryUpdateForm from "../../compoments/category/CategoryUpdateForm";
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from "../../compoments/common/elements/LoadingWrapper";
import { connect } from "react-redux";
import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";
import ObjectNotFound from "../../compoments/common/ObjectNotFound";
import { withTranslation } from "react-i18next";
import { categoryKinds } from "../../constants/masterData";
class CategoryNewsUpdate extends SaveBasePage {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.objectName = `${t("objectName")} ${t("kind.news")}`;
    this.getListUrl = sitePathConfig.categoryNews.path;
    this.actionFooter = false;
    this.breadcrumbs = [
      {
        name: `${t("breadcrumbs.parentPage")} ${t("kind.news")}`,
        path: `${sitePathConfig.categoryNews.path}`,
      },
      {
        name: this.isEditing
          ? `${t(`listBasePage:${"update"}`)} ${this.objectName} ${this.dataId}`
          : `${t(`listBasePage:${"create"}`)} ${this.objectName}`,
      },
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.id &&
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.getDetail(nextProps.match.params.id);
    }
  }

  getDataDetailMapping = (data) => {
    const categoryNewsData = data;

    if (!categoryNewsData) {
      this.setState({ objectNotFound: true });
      return;
    }

    return {
      ...categoryNewsData,
    };
  };

  onGetDetailCompleted = ({ data }) => {
    this.dataDetail = this.getDataDetailMapping(data);
    this.setState({ isGetDetailLoading: false });
  };

  onInsertCompleted = (res) => {
    const { history } = this.props;
    this.setIsChangedFormValues(false);
    if (res?.result) {
      this.showSuccessConfirmModal({
        onContinueEdit: () => {
          history.push(
            sitePathConfig.categoryNewsUpdate.path.replace(":id", res.id)
          );
        },
      });
    } else if (res?.result === false) {
      this.showFailedConfirmModal({
        title: res?.message,
      });
    } else {
      this.showFailedConfirmModal();
    }
  };

  onUpdateCompleted = (res) => {
    this.setIsChangedFormValues(false);
    if (res.result) {
      this.getDetail(this.dataId);
      this.showSuccessConfirmModal();
    } else if (res?.result === false) {
      this.showFailedConfirmModal({
        title: res?.message,
      });
    } else {
      this.showFailedConfirmModal();
    }
  };

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
      categoryKind: categoryKinds.CATEGORY_KIND_NEWS,
      status: 1,
      ...data,
    };
  };

  prepareUpdateData = (data) => {
    return {
      ...data,
      categoryImage: data.categoryImage,
      id: this.dataDetail.id,
    };
  };

  onSaveCompleted = (responseData) => {
    this.setState({ isSubmitting: false });
    if (responseData?.data?.errors?.length) {
      this.onSaveError();
    } else {
      if (this.isEditing) {
        this.onUpdateCompleted(responseData);
      } else {
        this.onInsertCompleted(responseData);
      }
    }
  };

  render() {
    const { isGetDetailLoading, objectNotFound } = this.state;
    const { t, uploadFile } = this.props;
    if (objectNotFound) {
      return <ObjectNotFound />;
    }

    return (
      <LoadingWrapper loading={isGetDetailLoading}>
        <CategoryUpdateForm
          setIsChangedFormValues={this.setIsChangedFormValues}
          formId={this.getFormId()}
          onSubmit={this.onSave}
          dataDetail={this.isEditing ? this.dataDetail : {}}
          isEditing={this.isEditing}
          isLoadingAttribute={this.props.loading}
          actions={this.renderActions()}
          handleRemoveImage={this.handleRemoveImageField}
          handleUploadImage={this.handleUploadImageField}
          uploadFile={uploadFile}
          t={t}
        />
      </LoadingWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataById: (payload) => dispatch(actions.getCategoryById(payload)),
  createData: (payload) => dispatch(actions.createCategory(payload)),
  updateData: (payload) => dispatch(actions.updateCategory(payload)),
  deleteData: (payload) => dispatch(actions.deleteCategory(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["categoryListPage", "listBasePage"])(CategoryNewsUpdate));
