import yup from './yupGlobal'

// yup schema
export const uploadFileYup = {
    schema: yup.object().shape({
        file: yup
            .mixed()
            .required('Vui lòng chọn cv')
    })
}
export const addOneFieldYup = {
    schema: yup.object().shape({
        inputField: yup
            .string()
            .required('Vui lòng nhập thông tin.')
    })
}
export const resetPassYup = {
    schema: yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập email.')
            .email('Email sai cú pháp.'),
    }),
    default: {
        email: '',
    }
}
export const verifyPassYup = {
    schema: yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập email.')
            .email('Email sai cú pháp.'),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu.')
            .password('Mật khẩu phải có tối thiểu 8 ký tự, gồm viết hoa, viết thường, chữ số, và 1 ký tự đặc biệt.'),
        cPassword: yup
            .string()
            .required("Vui lòng nhập lại mật khẩu.")
            .password('Mật khẩu phải có tối thiểu 8 ký tự, gồm viết hoa, viết thường, chữ số, và 1 ký tự đặc biệt.')
            .oneOf([yup.ref("password")], "Mật khẩu không khớp.")
    }),
    default: {
        email: '',
        password: '',
        cPassword: ''
    }
}
export const loginYup = {
    schema: yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập email.')
            .email('Email sai cú pháp.'),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu.')
            .password('Sai mật khẩu.')
    }),
    default: {
        email: '',
        password: ''
    }
}
export const registerYup = {
    schema: yup.object().shape({
        username: yup
            .string()
            .required('Vui lòng nhập tên tài khoản.')
            .min(8, 'Tên đăng nhập phải có tối thiểu 8 ký tự.')
            .max(100, 'Tên đăng nhập chỉ được tối đa 100 ký tự.'),
        email: yup
            .string()
            .required('Vui lòng nhập email.')
            .email('Email sai cú pháp.'),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu.')
            .password('Mật khẩu phải có tối thiểu 8 ký tự, gồm viết hoa, viết thường, chữ số, và 1 ký tự đặc biệt.'),
        cPassword: yup
            .string()
            .required("Vui lòng nhập lại mật khẩu.")
            .password('Mật khẩu phải có tối thiểu 8 ký tự, gồm viết hoa, viết thường, chữ số, và 1 ký tự đặc biệt.')
            .oneOf([yup.ref("password")], "Mật khẩu không khớp.")
    }),
    default: {
        username: '',
        email: '',
        password: '',
        cPassword: ''
    }
}
export function postJobYup(job) {
    const tags = job ? job.tags.map(t => {
        return {
            value: t.id,
            label: t.name,
        }
    }) : null;

    const res = {
        schema: yup.object().shape({
            frmJobTitle: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobLevel: yup.mixed().required('Vui lòng chọn cấp bậc.'),
            frmJobType: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobMajor: yup.mixed().required("Vui lòng chọn ngành nghề"),
            frmJobCompField: yup.mixed().required('Vui lòng chọn lĩnh vực.'),
            frmJobLocation: yup.mixed().required('Vui lòng chọn địa điểm.'),
            frmJobDes: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobReq: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobSalaryMin: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobSalaryMax: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobCVLanguage: yup.array().required("Vui lòng chọn ngôn ngữ")
                .max(3, "Chỉ được chọn tối đa 3 ngôn ngữ")
                .min(1, 'Vui lòng chọn ngôn ngữ.'),
            frmJobContact: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobEmailCV: yup.string().required('Vui lòng nhập thông tin.'),
            frmJobSalaryCurrency: yup.mixed()
                .required("Vui lòng chọn loại tiền tệ"),
            frmJobTags: yup.array().min(1, "Vui lòng nhập từ khóa"),
            frmJobCompany: yup.mixed().required('Vui lòng chọn công ty đăng tuyển.'),
        }).required("Vui lòng nhập thông tin."),
        default: {
            frmJobTitle: job ? job.title : "",
            frmJobLevel: job ? {
                value: job.level.id,
                label: job.level.name,
            } : undefined,
            frmJobType: job ? job.type : "",
            frmJobMajor: job ? {
                value: job.major.id,
                label: job.major.name
            } : undefined,
            frmJobCompField: job ? {
                value: job.industry.id,
                label: job.industry.name,
            } : undefined,
            frmJobLocation: job ? (job.location ? {
                value: job.location.id,
                label: job.location.name,
            } : undefined) : undefined,
            frmJobDes: job ? job.descriptions : "",
            frmJobReq: job ? job.requirements : "",
            frmJobSalaryMin:  job ? job.salary.min : 100,
            frmJobSalaryMax:  job ? job.salary.max : 200,
            frmJobSalaryCurrency: job ? {value: job.salary.currency, label: job.salary.currency == "1" ? "VND" : "USD"} : { value: "2", label: "USD" },
            frmJobSalaryHide: job ? job.salary.hide : false,
            frmJobTags: job ? tags : [],
            frmJobCVLanguage: job ? job.cvLangs : [],
            frmJobContact: job ? job.contact.person : "",
            frmJobContactHide: job ? job.contact.hide : false,
            frmJobEmailCV: job ? job.contact.email : "",
            frmJobHideCompany: job ? job.company.hide : false,
            frmJobCompany: job ? {
                value: job.company.id,
                label: job.company.name
            } : undefined,
        }
    }
    return res;
}

// input attr
export const email_inputAttr = {
    label: 'Email',
    type: 'email',
    name: 'email',
    id: 'email',
    placeholder: 'name@example.com'
}

export const pass_inputAttr = {
    label: 'Mật khẩu',
    type: 'password',
    name: 'password',
    id: 'password',
    placeholder: 'Hãy nhập mật khẩu'
}

export const username_inputAttr = {
    label: "Tên tài khoản",
    type: "text",
    name: "username",
    id: "username",
    placeholder: "Tên tài khoản"
}

export const cPass_inputAttr = {
    label: "Xác nhận mật khẩu",
    type: "password",
    name: "cPassword",
    id: "cPassword",
    placeholder: "Hãy nhập lại mật khẩu",
}