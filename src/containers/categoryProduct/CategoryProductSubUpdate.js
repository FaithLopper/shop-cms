import React from "react";
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from "../../compoments/common/elements/LoadingWrapper";
import { connect } from "react-redux";
import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";
import ObjectNotFound from "../../compoments/common/ObjectNotFound";
import { withTranslation } from "react-i18next";
import CategoryProductUpdateForm from "../../compoments/categoryProduct/CategoryProductUpdateForm";
import qs from "query-string";

class CategoryProductSubUpdate extends SaveBasePage {
  constructor(props) {
    super(props);
    const { t } = this.props;

    const {
      location: { search },
    } = this.props;

    const { parentId, parentName } = qs.parse(search);
    this.parentId = parentId;
    this.parentName = parentName;

    this.objectName = t("objectNameSub");
    this.getListUrl = `${sitePathConfig.categoryProductSub.path}?${qs.stringify(
      {
        parentId: this.parentId,
        parentName: this.parentName,
      }
    )}`;
    this.actionFooter = false;
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: `${sitePathConfig.categoryProduct.path}`,
      },
      {
        name: `${t("breadcrumbs.parentPage")} ${this.parentName}`,
        path: `${sitePathConfig.categoryProductSub.path}?${qs.stringify({
          parentId: this.parentId,
          parentName: this.parentName,
        })}`,
      },
      {
        name: this.isEditing
          ? `${t(`listBasePage:${"update"}`)} ${this.objectName}`
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
    const categoryProductData = data;

    if (!categoryProductData) {
      this.setState({ objectNotFound: true });
      return;
    }

    return {
      ...categoryProductData,
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
            sitePathConfig.categoryProduct.childrenKeys[3].replace(
              ":id",
              res.id
            )
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
      const { t } = this.props;
      this.showWarningConfirmModal({
        title: t("basicSavePage:onBack"),
        onOk: () => {
          this.props.history.push(this.getListUrl);
        },
      });
    } else {
      this.props.history.push(this.getListUrl);
    }
  };

  prepareCreateData = (data) => {
    return {
      ...data,
      parentId: this.parentId,
      orderSort: 1,
      isChild: true,
    };
  };

  prepareUpdateData = (data) => {
    return {
      ...data,
      id: this.dataDetail.id,
      orderSort: 1,
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
        <CategoryProductUpdateForm
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
  getDataById: (payload) => dispatch(actions.getProductCategoryById(payload)),
  createData: (payload) => dispatch(actions.createProductCategory(payload)),
  updateData: (payload) => dispatch(actions.updateProductCategory(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["categoryProductListPage", "listBasePage"])(
    CategoryProductSubUpdate
  )
);
