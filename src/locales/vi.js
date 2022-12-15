export default {
    translation: {
        toast: {
            titleSuccess: 'Thành công',
            titleError: 'Lỗi',
            titleWarning: 'Thông tin lỗi'
        }
    },
    masterLayout: {
        breadcrumbs: {
            home: 'Trang chủ',
        },
    },
    navSider: {
        'Account Management': 'Quản lý tài khoản',
        'Admin': 'Quản trị viên',
        'System': 'Hệ thống',
        'Role': 'Quyền',
        'Category': 'Danh mục',
        'CategoryNews': 'Danh mục tin tức',
        'CategoryJobs': 'Danh mục công việc',
        'CategoryDepartments': 'Danh mục phòng ban',
        'News': 'Tin tức',
        'Province':'Tỉnh thành',
        'Customer':'Khách hàng',
        'Ranks': 'Cấp bậc khách hàng',
        'Employee': 'Nhân viên',
        'customerManagement': 'Quản lý khách hàng',
        'categoryProductManagement': 'Quản lý danh mục sản phẩm',
        'CategoryProduct': 'Quản lý sản phẩm',
        'Store':'Quản lí chi nhánh',
        'Product':'Sản phẩm',
        'Variant':'Thuộc tính',
        'Variant Template':'Nhóm thuộc tính',
        'Tags': 'Quản lý Tags',
        'Order': 'Đơn đặt hàng',
        'orderManagement': 'Quản lý đơn hàng'
    },
    appHeader: {
        profile: 'Hồ sơ',
        logout: 'Đăng xuất',
    },
    constants: {
        Administrator: "Quản trị viên",
        Active: "Kích hoạt",
        Unactive: "Khóa",
        Lock: "Khóa",
        Delete: "Xóa",
        Service: 'Dịch vụ',
        Female: 'Nữ',
        Male: 'Nam',
        UndefinedSex: 'Đang cập nhật',
        OtherSex: 'Khác',
        Forbidden: 'Bị cấm',
        Pending: 'Đang chờ',
        Pause: 'Tạm dừng',
        Done: 'Hoàn thành',
        Cancel: 'Đã hủy',
        Calculated: 'Đã tính',
        yes: 'Có',
        no: 'Không',
        platinum: 'Bạch kim',
        silver: 'Bạc',
        gold: 'Vàng',
        diamond: 'Kim cương',
        NotDone: 'Chưa hoàn thành',
        Successfully:'Thành công',
        Failed:'Thất bại',
        successMessage: {
            copied: 'Đã sao chép',
        },
    },
    listBasePage: {
        update: 'Cập nhật',
        create: 'Tạo mới',
        success: 'Thành công',
        error: 'Lỗi',
        showSuccessMessage: ' {{ actionName, capitalize }} {{ objectName, lowercase }} thành công!',
        showErrorMessage: ' {{ actionName, capitalize }} {{ objectName, lowercase }} thất bại. Vui lòng thử lại!',
        showDeleteSuccessMessage: 'Xóa {{ objectName, lowercase }} thành công!',
        showDeleteErrorMessage: 'Xóa {{ objectName, lowercase }} thất bại. Vui lòng thử lại!',
        active: 'Hoạt động',
        lock: 'khóa',
        titleConfirm: 'Bạn có chắc muốn {{ actionName, lowercase }} {{ objectName, lowercase }} này?',
        okText: 'Có',
        cancleText: 'Không',
        titleActionCol: 'Hành động',
        titleStatusCol: 'Trạng thái',
    },
    // basicModal: {
    //     updateTitle: 'CẬP NHẬT {{ objectName, uppercase }}',
    //     createTitle: 'THÊM MỚI {{ objectName, uppercase }}',
    //     closeButton: 'Đóng',
    //     saveButton: 'Lưu',
    // },
    basicModal: {
        updateTitle: "CẬP NHẬT {{ objectName, uppercase }}",
        createTitle: "THÊM MỚI {{ objectName, uppercase }}",
        closeButton: "Đóng",
        saveButton: "Lưu",
      },
    basicSavePage:{
        saveButton:'Lưu',
        updateButton:'Lưu & cập nhật',
        cancelButton:'Huỷ',
        createMessage:'tạo mới',
        updateMessage:'cập nhật',
        okText:'Trở về danh sách',
        onBack:'Bạn có chắc trở về trang trước? Dữ liệu sẽ không được lưu lại',
        Continue:'Tiếp tục'
    },
    baseField: {
        select: 'chọn',
        enter: 'nhập',
        requiredMsg: 'Vui lòng {{ action, lowercase }} {{ fieldTitle, lowercase }}',
        imageTooLarge: 'Hình tải lên cần nhỏ hơn 500KB!',
        basicInfo:'THÔNG TIN CƠ BẢN',
        accountInfo:'THÔNG TIN TÀI KHOẢN',
        address:'THÔNG TIN ĐỊA CHỈ',
    },
    fileUploadField: {
        clickToUpload: 'Nhấp vào để tải lên',
    },
    cropImageFiled: {
        uploading: 'Đang tải lên',
        upload: 'Tải lên',
    },
    richTextField: {
        limitFileSize: 'Dung lượng hình cần phải nhỏ hơn 512KB. Vui lòng tải lên dung lượng nhỏ hơn!',
    },
    textField: {
        maxLengthMsg: 'Số ký tự không thể nhiều hơn {{ var }}',
        minLengthMsg: 'Số ký tự không thể ít hơn {{ var }}',
        invalidEmailMsg: 'Định dạng email không hợp lệ',
    },
    searchForm: {
        searchButton: 'Tìm kiếm',
        clearButton: 'Làm mới',
    },
    notFound: {
        notFoundMsg: 'Trang bạn đang tìm kiếm không tồn tại',
        goBack: 'Quay lại',
    },
    ForbiddenListPage:{
        breadcrumbs: {
            currentPage: 'Bị cấm'
        },
        message: {
            forbiddenMessage: 'Bạn không có quyền truy cập'
        }
    },
    profilePage: {
        breadcrumbs: {
            currentPage: 'Hồ sơ'
        },
        form: {
            label: {
                avatar: 'Hình đại diện',
                username: 'Tài khoản',
                fullName: 'Họ và tên',
                phone: 'Số điện thoại',
                taxNumber: 'Mã số thuế',
                zipCode: 'Mã Zip',
                city: 'Thành phố',
                address: 'Địa chỉ',
                logo: 'Logo',
                oldPassword: 'Mật khẩu hiện tại',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                organizeName: 'Tên đơn vị',
                organizeHotline: 'Đường dây nóng',
                province: 'Tỉnh',
                district: 'Quận/huyện',
                commune: 'Xã/phường',
                contactName: 'Tên liên lạc',
                contactTitle: 'Thông tin người liên lạc',
                Male: 'Nam',
                kind: 'Thể loại',
                identityNumber: 'Mã CMND',
                sex: 'Giới tính',
                birthday: 'Sinh nhật',
                placeOfIssue: 'Nơi cấp',
                dateOfIssue: 'Ngày cấp',
                departmentName: 'Phòng ban',
            },
            fieldSet: {
                profileInfo: 'Thông tin hồ sơ',
                accountInfo: 'Thông tin tài khoản',
                legalInfo: 'Thông tin pháp lý',
            },
            validationMessage: {
                fullNameRequire: 'Vui lòng nhập họ và tên',
                passwordRequire: 'Vui lòng nhập mật khẩu',
                passwordNotMatch: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            updateProfileFail: 'Cập nhật hồ sơ thất bại. Vui lòng thử lại!',
            updateProfileSuccess: 'Hồ sơ của bạn đã được cập nhật!',
        },
        button: {
            update: 'Cập nhật',
        }
    },
    userAdminListPage: {
        breadcrumbs: {
            currentPage: 'Quản trị viên',
        },
        objectName: 'quản trị viên',
        searchPlaceHolder: {
            username: 'Tài khoản',
            fullName: 'Họ và tên',
            status: 'Chọn trạng thái',
            organize: 'Chọn đơn vị',
        },
        table: {
            avatar: '#',
            username: 'Tài khoản',
            fullName: 'Họ và tên',
            phone: 'Số điện thoại',
            createdDate: 'Ngày tạo',
            organize: 'Đơn vị',
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    userAdminUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Quản trị viên',
        },
        objectName: 'quản trị viên',
        form: {
            label: {
                password:'Mật khẩu',
                avatar: 'Ảnh đại diện',
                username: 'Tài khoản',
                fullName: 'Họ và tên',
                confirmPassword: 'Xác nhận mật khẩu',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                groupPermission: 'Nhóm quyền',
                phone: 'Số điện thoại',
                language: 'Ngôn ngữ',
                status: 'Trạng thái',
                organization: 'Đơn vị',
                organizationPlaceHolder: 'Hãy chọn đơn vị',
                groupId: 'Nhóm quyền'
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    categoryListPage: {
        breadcrumbs: {
            currentPage: 'Danh mục',
            parentPage: 'Danh mục',
        },
        objectName: 'danh mục',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            name: 'Tên',

        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                categoryName: 'Tên danh mục',
                categoryDescription: 'Mô tả',
                status: 'Trạng thái',
                access:'Quyền',
            },
        },
        kind: {
            news: 'tin tức',
            jobs: 'công việc',
            departments: 'phòng ban'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    categoryPage: {
        breadcrumbs: {
            parentPage:'Danh mục',
        },
        objectName: 'danh mục',
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                status: 'Trạng thái',
                categoryName: 'Tên danh mục',
                categoryDescription: 'Mô tả danh mục',
                categoryKind: 'Loại danh mục',
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    groupPermissionListPage: {
        breadcrumbs: {
            currentPage: 'Nhóm quyền',
        },
        objectName: 'Nhóm',
        table: {
            name: 'Tên',
            description: 'Mô tả',
        },
        searchPlaceholder: {
            name: 'Tên',
        },
        form: {
            label: {
                name: 'Tên',
                value: 'Giá trị',
                description: 'Mô tả',
                status: 'Trạng thái',
                kind: 'Loại',
                groupPermission: 'Nhóm quyền',
            },
            validationMessage: {
               permission: 'Vui lòng chọn nhóm quyền',
            }
        },
    },
    groupPermissionUpdatePage: {
        breadcrumbs: {
            parentPage: 'Nhóm quyền',
            currentPage: 'Cập nhật Nhóm',
        },
        objectName: 'Cập nhật nhóm',
        form: {
            label: {
                name: 'Tên',
                value: 'Giá trị',
                description: 'Mô tả',
                status: 'Trạng thái',
                kind: 'Loại',
                groupPermission: 'Nhóm quyền',
            },
            validationMessage: {
               permission: 'Vui lòng chọn nhóm quyền',
            }
        },
    },
    SettingDetailsListPage: {
        breadcrumbs: {
            currentPage: 'Cài đặt'
        },
    },
    adminNewsListPage: {
        breadcrumbs: {
            currentPage: 'Tin tức',
            parentPage: 'Tin tức'
        },
        objectName: 'tin tức',
        newsPreviewTitle: 'BẢN XEM THỬ',
        searchPlaceHolder: {
            title: 'Tiêu đề',
            status: 'Chọn trạng thái',
            category: 'Chọn thể loại',
        },
        table: {
            avatar: '#',
            title: 'Tiêu đề',
            createdDate: 'Ngày tạo',
            ordering: 'Thứ tự',
            category: 'Thể loại',
            pinTop: 'Ghim',
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                title: 'Tiêu đề',
                category: 'Thể loại',
                status: 'Trạng thái',
                ordering: 'Thứ tự',
                description: 'Mô tả',
                content: 'Nội dung',
                pinTop: 'Ghim lên đầu',
                banner: 'Ảnh bìa',
            },
            validationMessage: {
                avatarRequire: 'Hãy chọn ảnh đại diện',
                bannerRequire: 'Hãy chọn banner',
            }
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    provinceListPage: {
        breadcrumbs: {
          currentPage: "Tỉnh thành",
        },
        objectName: "Tỉnh thành",
        searchPlaceHolder: {
          province: "Tên tỉnh thành",
          status: "Chọn trạng thái",
          organize: "Chọn đơn vị",
        },
        table: {
          provinceName: "Tên tỉnh",
          
        },
    
        form: {
          label: {
            parentId: "ID tỉnh",
            status: "Trạng thái",
            provinceName: "Tên tỉnh",
            currentName:"Tên tỉnh"
          },
          validationMessage: {
            phoneLengthRequire: "Hãy nhập số",
            comparePassword: "Mật khẩu bạn nhập không khớp!",
          },
        },
        message: {
          // updateProfileFail: 'Your profile failed. Please try again!',
          // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: "Tạo {{ var, lowercase }} mới",
      },
      districtListPage: {
        breadcrumbs: {
          currentPage: "Quận/ Huyện",
          parentPage: "Tỉnh thành",
        },
        objectName: "Quận/ huyện",
        searchPlaceHolder: {
          province: "Tên quận huyện",
          status: "Chọn trạng thái",
          organize: "Chọn đơn vị",
        },
        table: {
          provinceName: "Tên quận huyện",
        },
    
        form: {
          label: {
            parentName: "Tên tỉnh",
            provinceName: "Tên Quận/ Huyện",
            currentName:"Tên Quận/ Huyện"
          },
          validationMessage: {
            phoneLengthRequire: "Hãy nhập số",
            comparePassword: "Mật khẩu bạn nhập không khớp!",
          },
        },
        message: {
          // updateProfileFail: 'Your profile failed. Please try again!',
          // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: "Tạo {{ var, lowercase }} mới",
      },
      communeListPage: {
        breadcrumbs: {
          currentPage: "Xã",
          parentPage: "Tỉnh thành",
        },
        objectName: "Xã Phường",
        searchPlaceHolder: {
          province: "Tên Xã/ Phường",
          status: "Chọn trạng thái",
          organize: "Chọn đơn vị",
        },
        table: {
          provinceName: "Tên Xã/ Phường",
        },
    
        form: {
          label: {
            currentName: "Tên Xã Phường",
            parentName: "Tên Quận/ Huyện",
            provinceName: "Tên tỉnh",
          },
          validationMessage: {
            phoneLengthRequire: "Hãy nhập số",
            comparePassword: "Mật khẩu bạn nhập không khớp!",
          },
        },
        message: {
          // updateProfileFail: 'Your profile failed. Please try again!',
          // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: "Tạo {{ var, lowercase }} mới",
      },
      customerListPage: {
        breadcrumbs: {
            currentPage: 'Danh sách khách hàng',
        },
        objectName: 'khách hàng',
        searchPlaceHolder: {
            username: 'Tài khoản',
            fullName: 'Họ và tên',
            status: 'Chọn trạng thái',
            organize: 'Chọn đơn vị',
        },
        table: {
            avatar: '#',
            username: 'Tài khoản',
            fullName: 'Họ và tên',
            phone: 'Số điện thoại',
            createdDate: 'Ngày tạo',
            organize: 'Đơn vị',
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    customerUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Danh sách khách hàng',
        },
        objectName: 'khách hàng',
        form: {
            label: {
                password:'Mật khẩu',
                avatar: 'Ảnh đại diện',
                username: 'Tài khoản',
                fullName: 'Họ và tên',
                confirmPassword: 'Xác nhận mật khẩu',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                groupPermission: 'Nhóm quyền',
                phone: 'Số điện thoại',
                language: 'Ngôn ngữ',
                status: 'Trạng thái',
                birthday:'Ngày sinh',
                gender:'Giới tính'
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    addressListPage: {
        breadcrumbs: {
            currentPage: 'Danh sách địa chỉ',
            parentPage: 'Danh sách khách hàng',
        },
        objectName: 'địa chỉ',
        searchPlaceHolder: {
            addressDetails:'Địa chỉ cụ thể',
            receiverFullName:'Tên người nhận',
            provinceId:'Tên Tỉnh/ Thành Phố',
            districtId:'Tên Quận/ Huyện',
            wardId:'Tên Phường/ Xã'
        },
        table: {
            address:'Địa chỉ',
            receiverFullName:'Tên người nhận',
            isDefault:'Loại địa chỉ'
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    addressUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage1:'Danh sách địa chỉ',
            parentPage:'Danh sách khách hàng',
        },
        objectName: 'địa chỉ',
        form: {
            label: {
                provinceId: 'Tỉnh/ Thành phố',
                districtId: 'Quận/ Huyện',
                phone: 'Số điện thoại',
                wardId:'Phường/ Xã',
                addressDetails:'Địa chỉ cụ thể',
                receiverFullName:'Tên người nhận',
                isDefault:'Mặc định',
                status:'Tình trạng',
                note:'Ghi chú',
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    ranksListPage: {
        breadcrumbs: {
            currentPage: 'Cấp bậc khách hàng',
            parentPage: 'Cấp bậc khách hàng',
        },
        objectName: 'cấp bậc khách hàng',
        searchPlaceHolder: {
            name: 'Tên cấp bậc',
        },
        table: {
            name: 'Cấp bậc',
            target:'Mức điểm',
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                name: 'Tên cấp bậc',
                target: 'Hạn mức tối thiểu để đạt được cấp bậc',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    userEmployListPage: {
        breadcrumbs: {
            currentPage: 'Nhân viên',
            parentPage: 'Nhân viên'
        },
        objectName: 'nhân viên',
        searchPlaceHolder: {
            username: 'Tài khoản',
            fullName:'Họ và Tên',
            categoryJobId: 'Chọn công việc',
            categoryDepartmentId: 'Chọn phòng ban',
            status: 'Chọn trạng thái',
        },
        table: {
            avatar: '#',
            username: 'Tài khoản',
            fullName: 'Họ và tên',
            email: 'Email',
            phone: 'Số điện thoại',
            departmentTitle: 'Phòng ban',
            jobTitle: 'Chức vụ',
            createdDate: 'Ngày tạo',
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                username: 'Tài khoản',
                fullName: 'Họ và tên',
                email: 'Email',
                phone: 'Số điện thoại',
                departmentId: 'Thuộc phòng ban',
                jobId: 'Chức vụ',
                password: 'Mật khẩu',
                newPassword: 'Mật khẩu mới',
                status: 'Trạng thái',
                groupId: 'Nhóm quyền',
            },
            validationMessage: {
                avatarRequire: 'Hãy chọn ảnh đại diện',
            }
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    categoryProductListPage: {
        breadcrumbs: {
            currentPage: 'Danh mục sản phẩm',
            parentPage: 'Danh mục sản phẩm',
        },
        objectName: 'Danh mục sản phẩm',
        objectNameSub: 'Danh mục phụ',
        searchPlaceHolder: {
            name: 'Tên danh mục',
            status: 'Chọn trạng thái',
        },
        table: {
            name: 'Tên danh mục',
        },
        form: {
            label: {
                icon: 'Icon danh mục',
                name: 'Tên danh mục',
                status: 'Trạng thái',
                note: 'Ghi chú',
                orderSort:'Thứ tự danh mục',
                parentName:'Thuộc danh mục'
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    storeListPage: {
        breadcrumbs: {
            currentPage: 'Quản lí chi nhánh',
        },
        objectName: 'chi nhánh',
        searchPlaceHolder: {
            name: 'Tên chi nhánh',
            addressDetails: 'Địa chỉ cụ thể',
        },
        table: {
            name: 'Tên chi nhánh',
            address: 'Địa chỉ',
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    storeUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Quản lí chi nhánh',
        },
        objectName: 'chi nhánh',
        form: {
            label: {
                "addressDetails": "Địa chỉ cụ thể",
                "latitude": "Vĩ độ",
                "longitude": "Kinh độ",
                "name": "Tên chi nhánh",
                "provinceId":'Tên Tỉnh/ Thành Phố',
                "districtId":'Tên Quận/ Huyện',
                "wardId":'Tên Phường/ Xã',
                "MapCordinateTitle": 'Tọa độ',
                "cordinate": "Kinh độ, vĩ độ",
            },
            placeholder: {
                lat: "Vĩ độ",
                lng: "Kinh độ",
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    variantListPage: {
        breadcrumbs: {
            currentPage: 'Thuộc tính',
        },
        objectName: 'thuộc tính',
        searchPlaceHolder: {
            name: 'Tên thuộc tính',
        },
        table: {
            name: 'Tên thuộc tính',
            price:'Giá',
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    variantUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Thuộc tính',
        },
        objectName: 'thuộc tính',
        form: {
            label: {
                'name':'Tên thuộc tính',
                'price':'Giá cả',
                'description':'Mô tả'
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    variantTemplateListPage: {
        breadcrumbs: {
            currentPage: 'Bộ thuộc tính',
        },
        objectName: 'bộ thuộc tính',
        searchPlaceHolder: {
            name: 'Tên thuộc tính',
        },
        table: {
            name: 'Tên bộ thuộc tính',
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    variantTemplateUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Bộ Thuộc tính',
        },
        objectName: 'bộ thuộc tính',
        form: {
            label: {
                'name':'Tên bộ thuộc tính',
                'price':'Giá cả',
                'Fuired': 'required',
                'required': 'Bắt buộc',
                
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    productListPage: {
        breadcrumbs: {
            currentPage: 'Sản phẩm',
        },
        objectName: 'sản phẩm',
        searchPlaceHolder: {
            name: 'Tên sản phẩm',
        },
        table: {
            name: 'Tên sản phẩm',
            price:'Giá',
            productCategoryId:'Danh mục',
            kind:'Loại sản phẩm',
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    productUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Sản phẩm',
        },
        objectName: 'sản phẩm',
        form: {
            label: {
                'name':'Tên sản phẩm',
                'price':'Giá cả',
                'description':'Mô tả',
                'image':'Hình ảnh',
                'status':'Trạng thái',
                'kind':'Loại sản phẩm',
                'categoryId':'Danh mục sản phẩm',
                'itemStatus':'Tình trạng',
                'isSoldOut':'Đã bán hết',
                'tags':'Thẻ',
                'required':'Bắt buộc',
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    tagsListPage: {
        breadcrumbs: {
            currentPage: 'Quản lý Tag',
            parentPage: 'Quản lý Tag',
        },
        objectName: 'Tag',
        searchPlaceHolder: {
            name: 'Tên Tag',
        },
        table: {
            name: 'Tên Tag',
            color:'Màu sắc',
        },
        form: {
            label: {
            tag: 'Tên Tag',
            color:'Màu sắc',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    orderListPage: {
        breadcrumbs: {
            currentPage: 'Quản lý đơn hàng',
            parentPage: 'Quản lý đơn hàng',
        },
        objectName: 'Đơn hàng',
        searchPlaceHolder: {
            status: 'Trạng thái đơn hàng',
            id: 'Mã đơn hàng',
        },
        table: {
            id: 'Mã đơn',
            createdBy:'Tên người đặt',
            subTotal:'Tổng đơn',
            province:'Địa chỉ tỉnh',
            createdDate:'Ngày đặt',
            productName:'Tên sản phẩm',
            quantity:'Số lượng',
            price:'Tổng giá',
            discount:'Giảm giá',
            variants:'Thuộc tính',
        },
        form: {
            label: {
            status: "Trạng thái đơn",
            createdBy: 'Tên người đặt',
            createdDate:'Ngày đặt',
            modifiedBy:'Người chỉnh sửa',
            modifiedDate:'Ngày chỉnh sửa',
            receiverFullName:'Tên người nhận',
            phone:'Số ĐT',
            paymentMethod:'Phương thức thanh toán',
            subTotal:'Tổng Đơn',
            shippingCharge:'Phí Ship',
            province:'Tỉnh',
            district:'Quận',
            ward:'Huyện',
            addressDetails:'Địa chỉ cụ thể',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
}
