import React from "react";
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from "../../compoments/common/elements/LoadingWrapper";
import { connect } from "react-redux";
import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";
import ObjectNotFound from "../../compoments/common/ObjectNotFound";
import { withTranslation } from "react-i18next";
import NewsUpdateForm from "../../compoments/news/NewsUpdateForm";

class NewsUpdate extends SaveBasePage {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.objectName = t("objectName");
    this.getListUrl = sitePathConfig.adminNews.path;
    this.actionFooter = false;
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: sitePathConfig.adminNews.path,
      },
      {
        name: this.isEditing
          ? `${t(`listBasePage:${"update"}`)} ${this.objectName} ${this.dataId}`
          : `${t(`listBasePage:${"create"}`)} ${this.objectName}`,
      },
    ];

    this.props.getCategoryAutoComplete({ kind: 1 });
    this.categoryOptionsNews = [];
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
    const newsData = data;

    if (!newsData) {
      this.setState({ objectNotFound: true });
      return;
    }

    return {
      ...newsData,
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
            sitePathConfig.adminNewsUpdate.path.replace(":id", res.id)
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
      ...data,
    };
  };

  prepareUpdateData = (data) => {
    return {
      ...data,
      avatar: data.avatar,
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
    const { t, uploadFile, categoryAutoCompleteNews } = this.props;

    this.categoryOptionsNews = categoryAutoCompleteNews.data
      ? categoryAutoCompleteNews.data.map((c) => {
          return {
            value: c.id,
            label: c.categoryName,
          };
        })
      : [];
    if (objectNotFound) {
      return <ObjectNotFound />;
    }

    return (
      <LoadingWrapper loading={isGetDetailLoading}>
        <NewsUpdateForm
          setIsChangedFormValues={this.setIsChangedFormValues}
          formId={this.getFormId()}
          onSubmit={this.onSave}
          dataDetail={this.isEditing ? this.dataDetail : {}}
          isEditing={this.isEditing}
          isLoadingAttribute={this.props.loading}
          actions={this.renderActions()}
          handleRemoveImage={this.handleRemoveImageField}
          handleUploadImage={this.handleUploadImageField}
          categoryOptions={this.categoryOptionsNews}
          uploadFile={uploadFile}
          t={t}
        />
      </LoadingWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataById: (payload) => dispatch(actions.getNewsById(payload)),
  createData: (payload) => dispatch(actions.createNews(payload)),
  updateData: (payload) => dispatch(actions.updateNews(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getCategoryAutoComplete: (payload) =>
    dispatch(actions.getCategoryAutoComplete(payload)),
});

const mapStateToProps = (state) => ({
  categoryAutoCompleteNews: state.category.categoryAutoCompleteNews || {},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["adminNewsListPage", "listBasePage", "constants"])(
    NewsUpdate
  )
);
