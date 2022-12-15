import React from "react";
import SaveBasePage from "../SaveBasePage";
import LoadingWrapper from "../../compoments/common/elements/LoadingWrapper";
import { connect } from "react-redux";
import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";
import ObjectNotFound from "../../compoments/common/ObjectNotFound";
import { withTranslation } from "react-i18next";
import EmployeeUpdateForm from "../../compoments/employee/EmployeeUpdateForm";
import { UserTypes } from "../../constants";
import { categoryKinds } from "../../constants/masterData";

class EmployeeUpdate extends SaveBasePage {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.objectName = t("objectName");
    this.getListUrl = sitePathConfig.employee.path;
    this.actionFooter = false;
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: sitePathConfig.employee.path,
      },
      {
        name: this.isEditing
          ? `${t(`listBasePage:${"update"}`)} ${this.objectName} ${this.dataId}`
          : `${t(`listBasePage:${"create"}`)} ${this.objectName}`,
      },
    ];

    this.categoryOptionsJob = [];
    this.categoryOptionsDepartment = [];
    this.GroupPermisisonList = [];
    this.getCategoryList();
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
    const employeeData = data;

    if (!employeeData) {
      this.setState({ objectNotFound: true });
      return;
    }

    return {
      ...employeeData,
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
            sitePathConfig.employeeUpdate.path.replace(":id", res.id)
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
      groupId: data.group.id, //role employee
    };
  };

  prepareUpdateData = (data) => {
    return {
      ...data,
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

  getCategoryList() {
    this.props.getCategoryAutoComplete({
      kind: categoryKinds.CATEGORY_KIND_JOBS,
    });
    this.props.getCategoryAutoComplete({
      kind: categoryKinds.CATEGORY_KIND_DEPARTMENTS,
    });
    this.props.getGroupPermisionAutoComplete({
      params: { kind: UserTypes.EMPLOYEE },
    });
  }

  render() {
    const { isGetDetailLoading, objectNotFound } = this.state;
    const {
      t,
      uploadFile,
      categoryAutoCompleteJob,
      categoryAutoCompleteDepartment,
      dataList,
    } = this.props;

    this.categoryOptionsJob = categoryAutoCompleteJob.data
      ? categoryAutoCompleteJob.data.map((c) => {
          return {
            value: c.id,
            label: c.categoryName,
          };
        })
      : [];

    this.categoryOptionsDepartment = categoryAutoCompleteDepartment.data
      ? categoryAutoCompleteDepartment.data.map((c) => {
          return {
            value: c.id,
            label: c.categoryName,
          };
        })
      : [];

    this.GroupPermisisonList = dataList.data
      ? dataList.data.map((g) => {
          return {
            value: g.id,
            label: g.name,
          };
        })
      : [];

    if (objectNotFound) {
      return <ObjectNotFound />;
    }

    return (
      <LoadingWrapper loading={isGetDetailLoading}>
        <EmployeeUpdateForm
          setIsChangedFormValues={this.setIsChangedFormValues}
          formId={this.getFormId()}
          onSubmit={this.onSave}
          dataDetail={this.isEditing ? this.dataDetail : {}}
          isEditing={this.isEditing}
          isLoadingAttribute={this.props.loading}
          actions={this.renderActions()}
          handleRemoveImage={this.handleRemoveImageField}
          handleUploadImage={this.handleUploadImageField}
          categoryOptionsJob={this.categoryOptionsJob}
          categoryOptionsDepartment={this.categoryOptionsDepartment}
          groupPermission={this.GroupPermisisonList}
          uploadFile={uploadFile}
          t={t}
        />
      </LoadingWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataById: (payload) => dispatch(actions.getUserEmployById(payload)),
  createData: (payload) => dispatch(actions.createUserEmploy(payload)),
  updateData: (payload) => dispatch(actions.updateUserEmploy(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getGroupPermisionAutoComplete: (payload) =>
    dispatch(actions.groupPermissionAutoComplete(payload)),
  getCategoryAutoComplete: (payload) =>
    dispatch(actions.getCategoryAutoComplete(payload)),
});

const mapStateToProps = (state) => ({
  dataList: state.groupPermission.groupPermissionData || {},
  categoryAutoCompleteJob: state.category.categoryAutoCompleteJob || {},
  categoryAutoCompleteDepartment:
    state.category.categoryAutoCompleteDepartment || {},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["userEmployListPage", "listBasePage", "constants"])(
    EmployeeUpdate
  )
);
