import React from "react";
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from "../../compoments/common/elements/LoadingWrapper";
import { connect } from "react-redux";
import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";
import ObjectNotFound from "../../compoments/common/ObjectNotFound";
import { withTranslation } from "react-i18next";
import ProductUpdateForm from "../../compoments/product/ProductUpdateForm";
import qs from "query-string";
class ProductUpdatePage extends SaveBasePage {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.objectName = t("objectName");
    this.actionFooter = false;
    const {
      location: { search },
    } = this.props;
    const { parentProduct } = qs.parse(search);
    this.parentProduct = parentProduct;
    this.getListUrl = this.parentProduct
      ? `${sitePathConfig.productChild.path}?parentProduct=${this.parentProduct}`
      : sitePathConfig.product.path;
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: `${sitePathConfig.product.path}`,
      },
      {
        name: this.isEditing
          ? `${t(`listBasePage:${"update"}`)} ${this.objectName}`
          : `${t(`listBasePage:${"create"}`)} ${this.objectName}`,
      },
    ];
    this.onProductCategoryParentChange= this.onProductCategoryParentChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.id &&
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.getDetail(nextProps.match.params.id);
    }
  }

  componentWillMount() {
    const {
      changeBreadcrumb,
      onReturn,
      getTagDropDown,
      onGetFormID,
      detectActionRenderType,
      getProductCategoryCombobox,
    } = this.props;
    if (this.isEditing) {
      this.getDetail(this.dataId);
    }
    if (this.breadcrumbs.length > 0) {
      changeBreadcrumb(this.breadcrumbs);
    }
    onReturn(this.onBack);
    onGetFormID(this.getFormId);
    detectActionRenderType(this.actionFooter);
    getProductCategoryCombobox({
      params: {},
      onCompleted: (responseData) => {
        const { result, data } = responseData;
        if (result) {
          this.setState({
            categoryId: data?.map((item) => {
              return { value: item.id, label: item.name };
            }),
          });
        }
      },
      onError: this.onSaveError,
    });
    getTagDropDown({
      params: {},
      onCompleted: (responseData) => {
        const { result, data } = responseData;
        if (result) {
          this.setState({
            tags: data?.data?.map((item) => {
              return { value: item.tag, label: item.tag };
            }),
          });
        }
      },
      onError: this.onSaveError,
    });
  }

  onProductCategoryParentChange(id) {
    const {getProductCategoryCombobox}= this.props
    getProductCategoryCombobox({
      params: { parentId: id },
      onCompleted: (responseData) => {
        const { result, data } = responseData;
        if (result) {
          this.setState({
            categoryChildId: data?.map((item) => {
              return { value: item.id, label: item.name };
            }),
          });
        }
      },
      onError: this.onSaveError,
    });
  }

  getDataDetailMapping = (data) => {
    const productData = data;
    if (!productData) {
      this.setState({ objectNotFound: true });
      return;
    }
    let tags = [];
    if (productData.tags) {
      let currentIndex = 0;
      let objectArray = productData.tags.match(new RegExp(" ", "g")) || [];
      if (objectArray.length === 0) tags.push(productData.tags);
      Object.keys(objectArray).map((item, index) => {
        if (index !== objectArray.length - 1) {
          tags.push(
            productData.tags.slice(
              currentIndex,
              productData.tags.indexOf(" ", currentIndex) - 1
            )
          );
          currentIndex = productData.tags.indexOf(" ", currentIndex) + 1;
        } else {
          tags.push(
            productData.tags.slice(
              currentIndex,
              productData.tags.indexOf(" ", currentIndex)
            )
          );
          currentIndex = productData.tags.indexOf(" ", currentIndex) + 1;
          tags.push(productData.tags.slice(currentIndex));
        }
        return 0;
      });
    }
    this.parentProductId = productData.parentProductId;
    console.log(this.state.categoryId,this.state.categoryChildId)
    const dataConfig = {
      ...productData,
      categoryId: productData.productCategoryId,
      tags,
      // tags:productData.tags ?
      variantConfigs: productData.productConfigs
        ? productData.productConfigs.map((item) => {
            return {
              ...item,
              variantIds: item.variants,
              index: item.id,
            };
          })
        : [],
    };
    return {
      ...dataConfig,
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
            sitePathConfig.productUpdate.path.replace(":id", res.id)
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
    let temp = data.productConfigs.map((item) => {
      return {
        ...item,
        variants: item.variantIds.map((variant, index) => {
          return {
            ...variant,
            orderSort: index,
          };
        }),
      };
    });
    let tempData = data;
    if (data.tags === "") {
      delete tempData.tags;
    }
    if (tempData.kind === undefined) {
      tempData.kind = 2;
    }
    return {
      ...tempData,
      categoryId: tempData.categoryChildId ? tempData.categoryChildId:tempData.categoryId,
      kind: this.parentProduct ? 1 : tempData.kind,
      price: tempData.kind === 1 || this.parentProduct ? tempData.price : 0,
      parentProductId: this.parentProduct ? parseInt(this.parentProduct) : null,
      productConfigs:
        tempData.kind === 1 || (tempData.kind === 1 && this.parentProduct)
          ? temp
          : null,
    };
  };

  prepareUpdateData = (data) => {
    let temp = data.productConfigs.map((item) => {
      return {
        ...item,
        variants: item.variantIds.map((variant, index) => {
          return {
            ...variant,
            orderSort: index,
          };
        }),
      };
    });
    let tempData = data;
    if (data.tags === "") {
      delete tempData.tags;
    }
    return {
      ...tempData,
      categoryId: tempData.categoryChildId ? tempData.categoryChildId:tempData.categoryId,
      parentProductId: this.parentProductId,
      productConfigs: temp,
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
    const { isGetDetailLoading, objectNotFound, categoryId, tags,categoryChildId } = this.state;
    const { t, uploadFile } = this.props;
    if (objectNotFound) {
      return <ObjectNotFound />;
    }
    return (
      <LoadingWrapper loading={isGetDetailLoading}>
        <ProductUpdateForm
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
          categoryId={categoryId || []}
          categoryChildId={categoryChildId || []}
          getList={this.props.getDataList}
          getListTemplate={this.props.getDataListVariantTemplate}
          getTemplate={this.props.getTemplate}
          parentProduct={this.parentProduct}
          onProductCategoryParentChange={this.onProductCategoryParentChange}
          t={t}
          tagOption={tags || []}
        />
      </LoadingWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataById: (payload) => dispatch(actions.getProductById(payload)),
  getTemplate: (payload) => dispatch(actions.getVariantTemplateById(payload)),
  createData: (payload) => dispatch(actions.createProduct(payload)),
  updateData: (payload) => dispatch(actions.updateProduct(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getProductCategoryCombobox: (payload) =>
    dispatch(actions.getProductCategoryCombobox(payload)),
  getTagDropDown: (payload) => dispatch(actions.getTagsDropDown(payload)),
  getDataList: (payload) => dispatch(actions.getVariantListModal(payload)),
  getDataListVariantTemplate: (payload) =>
    dispatch(actions.getVariantTemplateListModal(payload)),
});

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["productUpdatePage", "listBasePage"])(ProductUpdatePage));
